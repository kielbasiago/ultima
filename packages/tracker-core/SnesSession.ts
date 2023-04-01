import { grpc } from "@improbable-eng/grpc-web";
import { Query } from "./Query";
import {
  AddressSpace,
  DevicesResponse,
  MemoryMapping,
  MultiReadMemoryRequest,
  MultiReadMemoryResponse,
  ReadMemoryRequest,
  SingleReadMemoryRequest,
  SingleReadMemoryResponse,
} from "./sni/sni_pb";
import {
  DeviceControlClient,
  DeviceFilesystemClient,
  DeviceMemory,
  DeviceMemoryClient,
  DevicesClient,
} from "./sni/sni_pb_service";

export class SnesSession {
  public readonly name: string;
  protected devices: DevicesResponse.AsObject | null;
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
    return new Promise<DevicesResponse.AsObject>((resolve, reject) => {});
  }

  public watch<TQuery extends Query<any>>(query: TQuery) {
    const host = "http://localhost:8190";
    const client = new DeviceMemoryClient(host, {
      transport: grpc.WebsocketTransport(),
    });

    const addrs = query.queryAddress;
    const lengths = query.queryLength;

    const requests = addrs.map((addr, idx) => {
      const length = lengths[idx];
      const request = new ReadMemoryRequest();
      request.setRequestaddress(addr);
      request.setRequestmemorymapping(MemoryMapping.LOROM);
      request.setRequestaddressspace(AddressSpace.FXPAKPRO);
      request.setSize(length);
      return request;
    });
    const multi = new MultiReadMemoryRequest();
    multi.setUri(this.devices?.devicesList[0].uri!);
    multi.setRequestsList(requests);

    const stream = client.streamRead();
    stream.on("data", (val) => {
      console.log("received", val);
      debugger;
    });

    stream.on("status", (msg) => {
      debugger;
    });

    return {};
    stream.write(multi);
  }

  // public send<TQuery extends Query<any>>(query: TQuery) {
  //   return new Promise(async (resolve, reject) => {
  //     const client = new DeviceMemoryClient(host, {
  //       transport: grpc.WebsocketTransport(),
  //     });

  //     const addrs = query.queryAddress;
  //     const lengths = query.queryLength;

  //     const requests = addrs.map((addr, idx) => {
  //       const length = lengths[idx];
  //       const request = new ReadMemoryRequest();
  //       request.setRequestaddress(addr);
  //       request.setRequestmemorymapping(MemoryMapping.LOROM);
  //       request.setRequestaddressspace(AddressSpace.FXPAKPRO);
  //       request.setSize(length);
  //       return request;
  //     });
  //     const multi = new MultiReadMemoryRequest();
  //     multi.setUri(this.devices?.devicesList[0].uri!);
  //     multi.setRequestsList(requests);

  //     const stream = client.streamRead();
  //     stream.on("data", (val) => {
  //       console.log("received", val);
  //       debugger;
  //     });

  //     stream.on("status", (msg) => {
  //       debugger;
  //     });

  //     stream.write(multi);

  //     // const { responsesList } = await this.readRamMulti(multi);
  //     // const responses = responsesList.map(({ data }) => {
  //     //   if (typeof data === "string") {
  //     //     return base64ToByteArray(data);
  //     //   } else {
  //     //     return data;
  //     //   }
  //     // });
  //     // resolve(query.onResponse(responses));
  //   });
  // }

  public async connect() {
    this.status = "CONNECTING";
    if (!this.devices && !this.initialized.Devices && !this.loading.Devices) {
      this.loading.Devices = true;
      const devices = await this.loadDevices();
      this.devices = devices;
      this.loading.Devices = false;
      this.initialized.Devices = true;
    }

    return;
  }

  public async readRamMulti(request: MultiReadMemoryRequest) {
    const host = "http://localhost:8190";

    return new Promise<MultiReadMemoryResponse.AsObject>((resolve, reject) => {
      grpc.unary(DeviceMemory.MultiRead, {
        request,
        host,
        transport: grpc.WebsocketTransport(),
        debug: true,
        onEnd: (res: any) => {
          const { status, statusMessage, headers, message, trailers } = res;
          if (status === grpc.Code.OK && message) {
            resolve(message.toObject());
          } else {
            console.error("error sending multi ram request", res);
            reject(message);
          }
        },
      });
    });
  }
  public async readRam(request: SingleReadMemoryRequest) {
    const host = "http://localhost:8190";

    return new Promise<SingleReadMemoryResponse.AsObject>((resolve, reject) => {
      grpc.unary(DeviceMemory.SingleRead, {
        request,
        host,
        transport: grpc.WebsocketTransport(),
        debug: true,
        onEnd: (res: any) => {
          const { status, statusMessage, headers, message, trailers } = res;
          if (status === grpc.Code.OK && message) {
            resolve(message.toObject());
          } else {
            console.error("error sending single ram request", res);
            reject(message);
          }
        },
      });
    });
  }
}
