import { getLogger, Logger } from "loglevel";
import type { Message, w3cwebsocket } from "websocket";

type DataAttacher = (incoming: Record<string, string>) => any;

export class RequestSender {
  private readonly _dataAttacher: DataAttacher;
  private readonly _logger: Logger;

  constructor(dataAttacher: DataAttacher) {
    this._logger = getLogger("RequestSender");
    this._dataAttacher = dataAttacher;
  }

  public async sendUtf8<TIn extends Record<string, any>, TOut = void>(
    client: w3cwebsocket,
    json: TIn
  ): Promise<TOut> {
    return new Promise((resolve, reject) => {
      if (!client) {
        reject();
      }
      const normalized = this._dataAttacher(json);
      this._logger.debug("sending", JSON.stringify(normalized));

      const handler = (msg: Message) => {
        this._logger.debug("Response for", json.Opcode, msg);
        resolve(this.processUtf8(msg));
      };

      client.send(JSON.stringify(normalized));
      client.onmessage = (e) => {
        handler({
          type: "utf8",
          utf8Data: e.data as string,
        });
      };
    });
  }

  public async sendBinary<TIn extends Record<string, any>>(
    client: w3cwebsocket,
    json: TIn
  ): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      if (!client) {
        reject();
      }
      const normalized = this._dataAttacher(json);
      this._logger.debug("sending", JSON.stringify(normalized));

      const handler = (msg: ArrayBuffer) => {
        const result = new Uint8Array(msg);
        this._logger.debug("Response for", json.Opcode, msg);
        resolve(result);
      };

      client.send(JSON.stringify(normalized));

      client.onmessage = async (e) => {
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

  public async sendRawBinary(
    client: w3cwebsocket,
    data: ArrayBuffer
  ): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      if (!client) {
        reject();
      }
      const handler = (msg: ArrayBuffer) => {
        const result = new Uint8Array(msg);
        this._logger.debug("Response for", data, msg);
        resolve(result);
      };

      // connection.once('message', handler);

      client.send(data);

      client.onmessage = async (e) => {
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

  public async sendRawNoResponse(
    client: w3cwebsocket,
    data: ArrayBuffer
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!client) {
        reject();
      }
      client.send(data);

      client.onerror = (err) => {
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
    client: w3cwebsocket,
    json: TIn
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!client) {
        reject();
      }
      const normalized = this._dataAttacher(json);
      this._logger.debug("sending", JSON.stringify(normalized));

      client.send(JSON.stringify(normalized));

      client.onerror = (err) => {
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
