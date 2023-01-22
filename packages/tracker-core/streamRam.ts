import { grpc } from "@improbable-eng/grpc-web";
import { Query } from "./Query";
import {
  AddressSpace,
  MemoryMapping,
  MultiReadMemoryRequest,
  MultiReadMemoryResponse,
  ReadMemoryRequest,
} from "./sni/sni_pb";
import { BidirectionalStream, DeviceMemoryClient } from "./sni/sni_pb_service";

export type StreamRamResult = {
  stream: BidirectionalStream<MultiReadMemoryRequest, MultiReadMemoryResponse>;
  request: MultiReadMemoryRequest;
};
export const streamRam = <TQuery extends Query<any>>(
  query: TQuery
): StreamRamResult => {
  const host = "http://localhost:8190";
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

  const multiRequest = new MultiReadMemoryRequest();
  multiRequest.setUri(query.deviceUri);
  multiRequest.setRequestsList(requests);

  const client = new DeviceMemoryClient(host, {
    transport: grpc.WebsocketTransport(),
  });

  const stream = client.streamRead();
  return { stream, request: multiRequest };
};
