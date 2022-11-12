export type EmitToClientFn = <T>(client: string, msg: T) => Promise<void>;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// QUSB2SNES TYPES ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type QUsb2SnesRequest<TOpcode extends string> = {
  Opcode: TOpcode;
  /** This will be attached automatically */
  Space?: string;
};

export type QUsb2SnesOperandRequest<TOpcode extends string> =
  QUsb2SnesRequest<TOpcode> & {
    Operands: Array<string>;
  };

export type DeviceListRequest = QUsb2SnesRequest<"DeviceList">;
export type AttachToDeviceRequest = QUsb2SnesOperandRequest<"Attach">;
export type DeviceInfoRequest = QUsb2SnesRequest<"Info">;
export type GetAddressRequest = QUsb2SnesOperandRequest<"GetAddress">;
export type PutAddressRequest = QUsb2SnesOperandRequest<"PutAddress">;
export type PutAddressFollowupRequest = QUsb2SnesOperandRequest<"PutAddress">;
export type RegisterNameRequest = QUsb2SnesOperandRequest<"Name">;

export type DeviceListResponse = {
  Results: Array<string>;
};

export type DeviceInfoResponse = {
  Results: Array<string>;
};

export type ConnectionStatus =
  | "NeedsConnection"
  | "Connecting"
  | "Connected"
  | "Disconnected"
  | "Attaching"
  | "Attached";

export type EnumType = Record<string, number>;

export type ExternalLogger = (...msgs: Array<string>) => unknown;
