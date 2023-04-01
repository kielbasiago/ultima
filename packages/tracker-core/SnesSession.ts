import { grpc } from "@improbable-eng/grpc-web";

import {
  DeviceControlClient,
  DeviceFilesystemClient,
  DeviceMemory,
  DeviceMemoryClient,
  Devices,
  DevicesClient,
} from "./sni/sni_pb_service";

import {
  DevicesRequest,
  DevicesResponse,
  SingleReadMemoryRequest,
  ReadMemoryRequest,
} from "./sni/sni_pb";

export class SnesSession {
  public readonly name: string;
  protected devices: DevicesResponse | null;
  public status: "IDLE" | "ERROR" | "CONNECTING" | "CONNECTED" = "IDLE";
  protected clients: {
    DeviceControl: DeviceControlClient;
    DeviceFilesystem: DeviceFilesystemClient;
    // DeviceInfo: DeviceInfoClient;
    DeviceMemory: DeviceMemoryClient;
    // DeviceNWA: DeviceNWAClient;
    Devices: DevicesClient;
  };

  protected initialized: {
    DeviceControl: boolean;
    DeviceFilesystem: boolean;
    DeviceMemory: boolean;
    Devices: boolean;
  };

  protected loading: {
    DeviceControl: boolean;
    DeviceFilesystem: boolean;
    DeviceMemory: boolean;
    Devices: boolean;
  };

  constructor() {
    this.name = "ff6wc-tracker";
    this.status = "IDLE";
    // this.info = null;
    // this._connection = null;
    // this._sender = null;
    this.devices = null;
    // this._logger = null;

    // this._connectionPromise = null;
    // this._devicePromise = null;
    // this._deviceInfoPromise = null;
    // this._attachPromise = null;
    // this._externalLogger = () => {};

    const getName = (suffix: string) => `${this.name}-${suffix}`;

    const hostname = "http://localhost:8190";
    this.clients = {
      DeviceControl: new DeviceControlClient(hostname, {}),
      DeviceFilesystem: new DeviceFilesystemClient(hostname, {}),
      DeviceMemory: new DeviceMemoryClient(hostname, {}),
      Devices: new DevicesClient(hostname, {}),
    };

    this.initialized = {
      DeviceControl: false,
      DeviceFilesystem: false,
      DeviceMemory: false,
      Devices: false,
    };

    this.loading = {
      DeviceControl: false,
      DeviceFilesystem: false,
      DeviceMemory: false,
      Devices: false,
    };
  }

  private loadDevices() {
    return new Promise((resolve, reject) => {
      const host = "http://localhost:8190";
      const req = new DevicesRequest();
      grpc.unary(Devices.ListDevices, {
        request: req,
        host: host,
        transport: grpc.WebsocketTransport(),
        debug: true,
        onEnd: (res: any) => {
          const { status, statusMessage, headers, message, trailers } = res;
          if (status === grpc.Code.OK && message) {
            resolve(message.toObject());
          } else {
            reject(message);
          }
        },
      });
    });
  }

  private send() {
    return new Promise((resolve, reject) => {
      const host = "http://localhost:8190";
      const req = new SingleReadMemoryRequest();
      req.setUri(devicesList);
      grpc.unary(DeviceMemory.SingleRead, {
        request: req,
        host: host,
        transport: grpc.WebsocketTransport(),
        debug: true,
        onEnd: (res: any) => {
          const { status, statusMessage, headers, message, trailers } = res;
          if (status === grpc.Code.OK && message) {
            resolve(message.toObject());
          } else {
            reject(message);
          }
        },
      });
    });
  }

  public async connect() {
    this.status = "CONNECTING";
    if (!this.devices && !this.initialized.Devices && !this.loading.Devices) {
      this.loading.Devices = true;
      const devices = this.loadDevices();
      this.loading.Devices = false;
      this.initialized.Devices = true;
    }

    return;
  }

  public async readRam(addr: string, length: number) {}
}
