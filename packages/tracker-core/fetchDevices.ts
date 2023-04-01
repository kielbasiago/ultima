import { grpc } from "@improbable-eng/grpc-web";
import { UnaryOutput } from "@improbable-eng/grpc-web/dist/typings/unary";
import { DevicesRequest, DevicesResponse } from "./sni/sni_pb";
import { Devices } from "./sni/sni_pb_service";

export const fetchDevices = (host: string) => {
  return new Promise<DevicesResponse.AsObject>((resolve, reject) => {
    const debug = process.env.NODE_ENV === "production";
    const request = new DevicesRequest();
    const transport = grpc.WebsocketTransport();

    grpc.unary(Devices.ListDevices, {
      debug,
      host,
      request,
      transport,
      onEnd: (res: UnaryOutput<DevicesResponse>) => {
        const { status, statusMessage, headers, message, trailers } = res;
        if (status === grpc.Code.OK && message) {
          resolve(message.toObject());
        } else {
          reject(
            `Error connecting to SNI: ${statusMessage} (${grpc.Code[status]})`
          );
        }
      },
    });
  });
};
