import { getLogger, Logger } from "loglevel";
import type {
  connection as Connection,
  Message,
  w3cwebsocket,
} from "websocket";

type DataAttacher = (incoming: Record<string, string>) => any;

export class RequestSender {
  private readonly _connection: w3cwebsocket;
  private readonly _dataAttacher: DataAttacher;
  private readonly _logger: Logger;

  constructor(connection: w3cwebsocket, dataAttacher: DataAttacher) {
    this._connection = connection;
    this._logger = getLogger("RequestSender");
    this._dataAttacher = dataAttacher;
  }

  public async sendUtf8<TIn extends Record<string, any>, TOut = void>(
    json: TIn
  ): Promise<TOut> {
    return new Promise((resolve, reject) => {
      const normalized = this._dataAttacher(json);
      this._logger.debug("sending", JSON.stringify(normalized));

      const handler = (msg: Message) => {
        // this._connection.off('message', handler);
        this._logger.debug("Response for", json.Opcode, msg);
        resolve(this.processUtf8(msg));
      };

      // this._connection.once('message', handler);

      this._connection.send(JSON.stringify(normalized));
      this._connection.onmessage = (e) => {
        handler({
          type: "utf8",
          utf8Data: e.data as string,
        });
      };
      // , (err) => {
      //     if (err) {
      //         this._logger.error('error sending request, expecting utf8', err);
      //         reject(err);
      //     }
      // });
    });
  }

  public async sendBinary<TIn extends Record<string, any>>(
    json: TIn
  ): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const normalized = this._dataAttacher(json);
      this._logger.debug("sending", JSON.stringify(normalized));

      const handler = (msg: ArrayBuffer) => {
        const result = new Uint8Array(msg);
        this._logger.debug("Response for", json.Opcode, msg);
        resolve(result);
      };

      // this._connection.once('message', handler);

      this._connection.send(JSON.stringify(normalized));

      this._connection.onmessage = async (e) => {
        const blob = e.data as unknown as Blob;
        let arrayBuffer: ArrayBuffer;
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
          arrayBuffer = event?.target?.result as ArrayBuffer;
          handler(arrayBuffer);
        };
        fileReader.readAsArrayBuffer(blob);
      };
    });
  }

  public async sendRawBinary(data: ArrayBuffer): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const handler = (msg: ArrayBuffer) => {
        const result = new Uint8Array(msg);
        this._logger.debug("Response for", data, msg);
        resolve(result);
      };

      this._connection.send(data);

      this._connection.onmessage = async (e) => {
        const blob = e.data as unknown as Blob;
        let arrayBuffer: ArrayBuffer;
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
          arrayBuffer = event?.target?.result as ArrayBuffer;
          handler(arrayBuffer);
        };
        fileReader.readAsArrayBuffer(blob);
      };
    });
  }

  public async sendRawNoResponse(data: ArrayBuffer): Promise<void> {
    return new Promise((resolve, reject) => {
      this._connection.send(data);

      this._connection.onerror = (err) => {
        console.error("error sending request, expect no response", err);
        reject(err);
      };

      setTimeout(() => {
        console.log("no response resolving");
        resolve();
      }, 75);
    });
  }

  public async sendNoResponse<TIn extends Record<string, any>>(
    json: TIn
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const normalized = this._dataAttacher(json);
      this._logger.debug("sending", JSON.stringify(normalized));

      this._connection.send(JSON.stringify(normalized));

      this._connection.onerror = (err) => {
        console.error("error sending request, expect no response", err);
        reject(err);
      };

      setTimeout(() => {
        console.log("no response resolving");
        resolve();
      }, 100);
    });
  }

  private processUtf8(msg: Message) {
    const rawMsg = msg.type === "utf8" ? msg.utf8Data : "{}";
    try {
      if (msg.type === "utf8") {
        return JSON.parse(rawMsg);
      }

      return {};
    } catch (e) {
      return rawMsg;
    }
  }
}
