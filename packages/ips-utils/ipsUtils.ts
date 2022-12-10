export const readU8 = function (_u8array: Uint8Array, offset: number) {
  return _u8array[offset];
};

export const readU16 = function (_u8array: Uint8Array, offset: number) {
  const _lastRead = (_u8array[offset] << 8) + _u8array[offset + 1];

  return _lastRead >>> 0;
};
export const readU24 = function (_u8array: Uint8Array, offset: number) {
  const _lastRead =
    (_u8array[offset] << 16) +
    (_u8array[offset + 1] << 8) +
    _u8array[offset + 2];

  return _lastRead >>> 0;
};

export const readU32 = function (_u8Array: Uint8Array, offset: number) {
  const _lastRead =
    (_u8Array[offset] << 24) +
    (_u8Array[offset + 1] << 16) +
    (_u8Array[offset + 2] << 8) +
    _u8Array[offset + 3];

  return _lastRead >>> 0;
};

export const readBytes = function (
  _u8array: Uint8Array,
  offset: number,
  len: number
) {
  const _lastRead: number[] = new Array(len);
  for (var i = 0; i < len; i++) {
    _lastRead[i] = _u8array[offset + i];
  }

  return _lastRead;
};

export const readString = function (
  _u8array: Uint8Array,
  offset: number,
  len: number
) {
  let _lastRead = "";
  for (
    var i = 0;
    i < len && offset + i < _u8array.length && _u8array[offset + i] > 0;
    i++
  ) {
    _lastRead = _lastRead + String.fromCharCode(_u8array[offset + i]);
  }

  return _lastRead;
};
