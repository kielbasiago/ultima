import {
  AttachToDeviceRequest,
  DeviceInfoRequest,
  DeviceInfoResponse,
  DeviceListRequest,
  DeviceListResponse,
  ExternalLogger,
  GetAddressRequest,
  PutAddressRequest,
  RegisterNameRequest,
} from "./types";
import { SnesInfo, SnesInfoArray } from "./SnesInfo";
import { getLogger, Logger, LogLevelDesc } from "loglevel";
import { RequestSender } from "./RequestSender";
import Queue from "promise-queue";
import * as ws from "websocket";
import { Query, QueryResultType } from "./Query";

type WsClient = ws.w3cwebsocket;
type WsConnection = ws.connection;

const queue = new Queue(1);

const wsServer = "ws://localhost:23074";
const wsServerLegacyPort = "ws://localhost:8080";

export class SnesSession {
  public info: SnesInfo | null;

  public sender: RequestSender | null;
  protected _attachPromise: Promise<void> | null;
  protected _connectionPromise: Promise<null> | null;
  protected _devicePromise: Promise<Array<string>> | null;
  protected _deviceInfoPromise: Promise<DeviceInfoResponse> | null;
  protected _deviceList: Array<string>;
  protected _logger: Logger | null;
  protected _client!: WsClient | null;
  public logMessages: Array<string> = [];
  public readonly name: string;
  protected _externalLogger: ExternalLogger;
  public error: string | null;
  private _isConnected = false;
  constructor(appName: string) {
    this.name = appName;
    this.info = null;
    this.sender = new RequestSender((inc) => {
      return { ...inc, Space: "SNES" };
    });
    this._logger = null;
    this._deviceList = [];
    this._connectionPromise = null;
    this._devicePromise = null;
    this._deviceInfoPromise = null;
    this._attachPromise = null;
    this._externalLogger = () => { };
    this.error = null;
  }

  public get isConnected() {
    return this._isConnected;
  }

  public async send<TQuery extends Query<any>>(
    query: TQuery
  ): Promise<QueryResultType<TQuery>> {
    const addrs = query.queryAddress;
    const lengths = query.queryLength;

    const pairs = addrs.map((addr, idx) => {
      const hexAddr = addr.toString(16);
      const length = lengths[idx];
      return [hexAddr, length] as [string, number];
    });

    if (!this.isConnected) {
      return query.onResponse([]);
    }

    this.logger.info("sending", pairs);

    const responses: Array<Buffer> = [];
    for (let i = 0; i < pairs.length; i++) {
      const [addr, length] = pairs[i];
      const result = await this.readRam(addr, length);
      if (result) {
        responses.push(result as Buffer);
      }
    }
    return query.onResponse(responses);
  }

  public async connect() {
    this.resetState();

    // SNI changed the port it listens on. Check current and legacy ports
    if (!this._client) {
      this._client = new ws.w3cwebsocket(wsServer);
    }

    if (!this._client) {
      this._client = new ws.w3cwebsocket(wsServerLegacyPort);
    }

    this._isConnected = false;
    await this._connect(this._client);

    try {
      this.addLogMessage("Loading device list...");
      this._deviceList = await this.getDeviceList();
      this.addLogMessage(
        `Loaded device list: ${JSON.stringify(this._deviceList)}`
      );

      if (this._deviceList.length > 1) {
        this.addLogMessage(
          "WARNING: Multiple devices found. Will attempt to use the last registered.. If the attach hangs, restarts client and try again."
        );
      }
      this.addLogMessage("Attaching to device");
      const deviceAttached = await this.attach();
      this.addLogMessage(`Attached to device '${deviceAttached}'`);

      this.addLogMessage("Registering with SNI");
      await this.registerName();
      this.addLogMessage("Registered successfully");

      this.addLogMessage("Loading device info");
      await this.getDeviceInfo();
      this.addLogMessage(`Loaded device info ${JSON.stringify(this.info)}`);
      this._isConnected = true;
    } catch (err) {
      const e = err as Error;
      this.addLogMessage(`ERROR: ${e.message}`);
      this.error = e.message;
    }
    return;
  }

  public async disconnect() {
    if (this._client) {
      this._client.close(1000, "Tracker disconnecting from SNI");
    }
  }

  public setLogger(logger: ExternalLogger): this {
    this._externalLogger = logger;
    return this;
  }

  public clearLog() {
    this.logMessages = [];
  }

  protected async _connect(client: ws.w3cwebsocket): Promise<null> {
    this._connectionPromise = new Promise((resolve, reject) => {
      this.logger.debug("connecting to websocket");
      client.onopen = async () => {
        this.logger.debug("connected to websocket");
        resolve(null);
      };

      client.onclose = (event) => {
        this.logger.error("client closed", event.code, event);
        this.onClose(event.code, "Client disconnected");
        this.addLogMessage("Unable to connect to SNI");

        reject(null);
      };
    });

    return this._connectionPromise;
  }

  protected addLogMessage(message: string): void {
    this.logMessages.push(message);
    this._externalLogger(message);
    this.logger.debug(message);
  }

  protected async getDeviceList(): Promise<Array<string>> {
    if (!this.sender) {
      return [];
    }

    if (this._devicePromise) {
      return this._devicePromise;
    }

    this._devicePromise = this.sender
      .sendUtf8<DeviceListRequest, DeviceListResponse>(
        this._client as ws.w3cwebsocket,
        {
          Opcode: "DeviceList",
          Space: "SNES",
        }
      )
      .then((resp) => {
        this.logger.debug("Device list: ", resp.Results);
        return resp;
      })
      .then(({ Results }) => Results);

    return this._devicePromise;
  }

  protected async attach(): Promise<string> {
    if (!this.sender) {
      return "";
    }

    if (this._attachPromise) {
      return Promise.resolve("");
    }

    if (!this._deviceList.length) {
      const msg = "no devices to attach to";
      this.logger.error(msg);
      throw new Error(msg);
    }

    const deviceAttached = [this._deviceList[this._deviceList.length - 1]];
    this._attachPromise = this.sender.sendNoResponse<AttachToDeviceRequest>(
      this._client as ws.w3cwebsocket,
      {
        Opcode: "Attach",
        Space: "SNES",
        Operands: deviceAttached,
      }
    );

    await this._attachPromise;

    this.logger.info("Attach successful");

    return deviceAttached[0];
  }

  protected async registerName(): Promise<void> {
    if (!this.sender) {
      throw new Error("No request sender was initialized");
    }

    await this.sender.sendNoResponse<RegisterNameRequest>(
      this._client as ws.w3cwebsocket,
      {
        Opcode: "Name",
        Operands: [this.name],
      }
    );
  }

  protected async getDeviceInfo(): Promise<DeviceInfoResponse> {
    if (!this.sender) {
      throw new Error("No request sender was initialized");
    }

    if (this._deviceInfoPromise) {
      return this._deviceInfoPromise;
    }

    this._deviceInfoPromise = this.sender.sendUtf8<
      DeviceInfoRequest,
      DeviceInfoResponse
    >(this._client as ws.w3cwebsocket, {
      Opcode: "Info",
    });

    this.logger.debug("Sending device info request");
    const response = await this._deviceInfoPromise;

    this.info = new SnesInfo(response.Results as SnesInfoArray);

    this.logger.info("Received device info", this.info.toJson());

    return this._deviceInfoPromise;
  }

  /**
   *
   * @param addressStart absolute address
   * @param blockCount
   * @returns
   */
  public async readRam(
    addressStart: string,
    blockCount: number
  ): Promise<Uint8Array> {
    if (!this.sender) {
      throw new Error("No request sender was initialized");
    }

    const addressVal = Number.parseInt(addressStart, 16);

    this.logger.debug(`requesting ${blockCount} bytes of ram at`, addressStart);

    const cb = () =>
      this.sender?.sendBinary<GetAddressRequest>(
        this._client as ws.w3cwebsocket,
        {
          Opcode: "GetAddress",
          Operands: [addressVal.toString(16), blockCount.toString(16)],
        }
      ) || Promise.reject();

    const result = await queue.add(cb);

    return result;
  }

  public async writeRom(
    addressStart: string,
    blockCount: number,
    data: ArrayBuffer
  ): Promise<Uint8Array> {
    if (!this.sender) {
      throw new Error("No request sender was initialized");
    }

    const addressVal = Number.parseInt(addressStart, 16);

    this.logger.info(`Try writing ${blockCount} bytes of ram to`, addressStart);

    const cb1 = () => {
      this.logger.info("sending put request");
      return (
        this.sender?.sendNoResponse<PutAddressRequest>(
          this._client as ws.w3cwebsocket,
          {
            Opcode: "PutAddress",
            Operands: [addressVal.toString(16), blockCount.toString(16)],
          }
        ) || Promise.reject()
      );
    };

    const result = await queue.add(cb1).catch((err) => {
      console.error("ERR", err);
    });
    this.logger.info("result", result);
    await queue.add(async () => {
      return this.sender?.sendRawNoResponse(
        this._client as ws.w3cwebsocket,
        data
      );
    });

    return new Uint8Array();
  }

  public toJson() {
    return {
      name: this.name,
      info: this.info?.toJson(),
    };
  }

  protected onClose = (err: number, description: string) => {
    if (err === 1006) {
      this.error = "Unexpectedly disconnected from SNI";
    }
    this.logger.info("connection closed", err, description);
    this.resetState();
  };

  protected onPause = () => {
    this.logger.info("connection paused");
  };

  protected onPong = () => {
    this.logger.info("connection pong");
  };

  protected onPing = () => {
    this.logger.info("connection ping");
  };

  protected onResume = () => {
    this.logger.info("connection resumed");
  };

  protected get logger(): Logger {
    if (this._logger) {
      return this._logger;
    }

    this._logger = getLogger("SnesSession");
    this._logger.setLevel("debug");
    return this._logger;
  }

  private resetState() {
    this._isConnected = false;
    this._connectionPromise = null;
    this._deviceList = [];
    this._devicePromise = null;
    this.info = null;
    this._deviceInfoPromise = null;
    this._attachPromise = null;

    this.error = null;
  }
}
