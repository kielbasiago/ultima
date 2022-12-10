const headerSize = 0x200;
const originalSize = 3145728;
const headeredSize = headerSize + originalSize;
const validHash =
  "0f51b4fca41b7fd509e4b8f9d543151f68efa5e97b08493e4b2a0c06f5d8d5e2";

type BufferType = Uint8Array | Buffer;

export function removeHeader(rom: BufferType) {
  if (rom.length === headeredSize) {
    return rom.slice(headerSize);
  }
  return rom;
}

export async function isValidROM(rom: BufferType) {
  if (rom.length !== originalSize) {
    return {
      success: false,
      message: `Invalid ROM size. Please upload an uncompressed US version 1.0 ROM file. Expected ${originalSize} and received ${rom.length}.`,
    };
  }

  let romHashData = Array.from(
    new Uint8Array(await crypto.subtle.digest("SHA-256", rom))
  );
  let romHashHex = romHashData
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
  if (romHashHex !== validHash) {
    return {
      success: false,
      message:
        "Invalid ROM hash. Please upload an uncompressed US version 1.0 ROM file",
    };
  }
  return {
    success: true,
    message: "",
  };
}
