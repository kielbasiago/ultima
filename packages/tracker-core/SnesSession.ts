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
import { getLogger, Logger } from "loglevel";
import { RequestSender } from "./RequestSender";
import Queue from "promise-queue";
import * as ws from "websocket";

type WsClient = ws.w3cwebsocket;
type WsConnection = ws.connection;

const queue = new Queue(1);

const wsServer = "ws://localhost:8080";

export class SnesSession {
  public info: SnesInfo | null;

  protected _attachPromise: Promise<void> | null;
  protected _connection: WsConnection | null;
  protected _connectionPromise: Promise<void> | null;
  protected _devicePromise: Promise<Array<string>> | null;
  protected _deviceInfoPromise: Promise<DeviceInfoResponse> | null;
  protected _sender: RequestSender | null;
  protected _deviceList: Array<string>;
  protected _logger: Logger | null;
  protected _client!: WsClient;
  public logMessages: Array<string> = [];
  public readonly name: string;
  protected _externalLogger: ExternalLogger;
  public status: "IDLE" | "ERROR" | "CONNECTING" | "CONNECTED" = "IDLE";

  constructor(appName: string) {
    this.name = appName;
    this._connection = null;
    this.info = null;
    this._sender = null;
    this._deviceList = [];
    this._logger = null;

    this._connectionPromise = null;
    this._devicePromise = null;
    this._deviceInfoPromise = null;
    this._attachPromise = null;
    this._externalLogger = () => {};
  }

  public async connect() {
    if (this.status === "CONNECTED") {
      return;
    }
    if (!this._client) {
      this._client = this.initializeClient();
    }
    this.status = "CONNECTING";
    await this._connect();

    if (!this._sender) {
      this.logger.error("No sender was initialized after calling connect()");
      return;
    }
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

      this.addLogMessage("Registering with Sni");
      await this.registerName();
      this.addLogMessage("Registered successfully");

      this.addLogMessage("Loading device info");
      await this.getDeviceInfo();
      this.addLogMessage(`Loaded device info ${JSON.stringify(this.info)}`);
      this.status = "CONNECTED";
    } catch (err) {
      const e = err as Error;
      this.addLogMessage(`ERROR: ${e.message}`);
      this.status = "ERROR";
    }
    return;
  }

  public setLogger(logger: ExternalLogger): this {
    this._externalLogger = logger;
    return this;
  }

  public clearLog() {
    this.logMessages = [];
  }

  protected async _connect(): Promise<void> {
    if (this._connectionPromise) {
      return this._connectionPromise;
    }

    this._connectionPromise = new Promise((resolve, reject) => {
      this.logger.info("begin connecting");
      this.initializeListeners(resolve, reject);
    });

    return this._connectionPromise;
  }

  protected initializeListeners(
    resolve: (arg: any) => void,
    reject: (arg: any) => void
  ): void {
    this._client.onopen = async () => {
      this._sender = new RequestSender(this._client, (inc) => {
        return { ...inc, Space: "SNES" };
      });
      this.addLogMessage("RequestSender initialized");
      resolve(null);
    };

    this._client.onclose = (event) => {
      // document.getElementById("autotracker_connect_button").disabled = false;
      this.addLogMessage("Disconnected from Sni");
      this.status = "ERROR";
      reject(null);
    };

    this._client.onmessage = async (event) => {
      console.log("message", event);
    };
  }

  protected initializeClient() {
    return new ws.w3cwebsocket(wsServer);
  }

  protected addLogMessage(message: string): void {
    this.logMessages.push(message);
    this._externalLogger(message);
    this.logger.debug(message);
  }

  protected async getDeviceList(): Promise<Array<string>> {
    if (!this._sender) {
      return [];
    }

    if (this._devicePromise) {
      return this._devicePromise;
    }

    this._devicePromise = this._sender
      .sendUtf8<DeviceListRequest, DeviceListResponse>({
        Opcode: "DeviceList",
        Space: "SNES",
      })
      .then((resp) => {
        this.logger.debug("Device list: ", resp.Results);
        return resp;
      })
      .then(({ Results }) => Results);

    return this._devicePromise;
  }

  protected async attach(): Promise<string> {
    if (!this._sender) {
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
    this._attachPromise = this._sender.sendNoResponse<AttachToDeviceRequest>({
      Opcode: "Attach",
      Space: "SNES",
      Operands: deviceAttached,
    });

    await this._attachPromise;

    this.logger.info("Attach successful");

    return deviceAttached[0];
  }

  protected async registerName(): Promise<void> {
    if (!this._sender) {
      throw new Error("No request sender was initialized");
    }

    await this._sender.sendNoResponse<RegisterNameRequest>({
      Opcode: "Name",
      Operands: [this.name],
    });
  }

  protected async getDeviceInfo(): Promise<DeviceInfoResponse> {
    if (!this._sender) {
      throw new Error("No request sender was initialized");
    }

    if (this._deviceInfoPromise) {
      return this._deviceInfoPromise;
    }

    this._deviceInfoPromise = this._sender.sendUtf8<
      DeviceInfoRequest,
      DeviceInfoResponse
    >({
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
    if (!this._sender) {
      throw new Error("No request sender was initialized");
    }

    const addressVal = Number.parseInt(addressStart, 16);

    this.logger.debug(`requesting ${blockCount} bytes of ram at`, addressStart);

    const cb = () =>
      this._sender?.sendBinary<GetAddressRequest>({
        Opcode: "GetAddress",
        Operands: [addressVal.toString(16), blockCount.toString(16)],
      }) || Promise.reject();

    const result = await queue.add(cb);

    return result;
  }

  public async writeRom(
    addressStart: string,
    blockCount: number,
    data: ArrayBuffer
  ): Promise<Uint8Array> {
    if (!this._sender) {
      throw new Error("No request sender was initialized");
    }

    const addressVal = Number.parseInt(addressStart, 16);

    this.logger.info(`Try writing ${blockCount} bytes of ram to`, addressStart);

    const cb1 = () => {
      this.logger.info("sending put request");
      return (
        this._sender?.sendNoResponse<PutAddressRequest>({
          Opcode: "PutAddress",
          Operands: [addressVal.toString(16), blockCount.toString(16)],
        }) || Promise.reject()
      );
    };

    const result = await queue.add(cb1).catch((err) => {
      console.error("ERR", err);
    });
    this.logger.info("result", result);
    await queue.add(async () => {
      return this._sender?.sendRawNoResponse(data);
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
    this.logger.info("connection closed", err, description);
    this.info = null;
    this._connection = null;
    this._deviceList = [];
  };

  protected onError(error: Error) {
    this._connection?.off("close", this.onClose);
    this._connection?.off("error", this.onError);
    this._connection?.off("pause", this.onPause);
    this._connection?.off("ping", this.onPing);
    this._connection?.off("pong", this.onPong);
    this._connection?.off("resume", this.onResume);
  }

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
    this._logger.setLevel("info");
    return this._logger;
  }
}
