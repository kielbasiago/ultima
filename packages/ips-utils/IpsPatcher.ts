/* Based in part on https://github.com/marcrobledo/RomPatcher.js/blob/master/js/formats/ips.js */
import { readBytes, readU16, readU24, readU32, readU8 } from "./ipsUtils";

const MAX_SIZE = 0x454f46;
const IPS_MAGIC = "PATCH";
const IPS_MAX_SIZE = 0x1000000; //16 megabytes
const IPS_RECORD_RLE = 0x0000;
const IPS_RECORD_SIMPLE = 0x01;

type RecordItem = {
  offset: number;
  type: number;
  length: number;
  byte?: number;
  data?: number[];
};

export class IpsPatcher {
  public readonly records: RecordItem[];
  public truncate: boolean;
  constructor() {
    this.records = [];
    this.truncate = false;
  }

  addSimpleRecord(offset: number, data: number[]) {
    this.records.push({
      offset: offset,
      type: IPS_RECORD_SIMPLE,
      length: data.length,
      data: data,
    });
  }

  addRleRecord(offset: number, length: number, b: number) {
    this.records.push({
      offset: offset,
      type: IPS_RECORD_RLE,
      length: length,
      byte: b,
    });
  }

  async apply(original: Uint8Array) {
    const rom = new Uint8Array(original);
    // calculate target ROM size, expanding it if any record offset is beyond target ROM size
    var newFileSize = rom.length;
    for (var i = 0; i < this.records.length; i++) {
      var rec = this.records[i];
      if (rec.type === IPS_RECORD_RLE) {
        if (rec.offset + rec.length > newFileSize) {
          newFileSize = rec.offset + rec.length;
        }
      } else {
        if (rec.offset + (rec.data?.length ?? 0) > newFileSize) {
          newFileSize = rec.offset + (rec.data?.length ?? 0);
        }
      }
    }

    const newRom = new Uint8Array(newFileSize);
    //create a new array of the specified size and copy over the existing data
    for (var i = 0; i < rom.length; i++) {
      newRom[i] = rom[i];
    }

    for (var i = 0; i < this.records.length; i++) {
      if (this.records[i].type === IPS_RECORD_RLE) {
        for (var j = 0; j < this.records[i].length; j++) {
          newRom[i] = this.records[i].byte as number;
        }
      } else {
        newRom[i] = this.records[i].data as unknown as any;
      }
    }

    return newRom;
  }

  isValidPatch(rawPatch: string) {
    return rawPatch.startsWith(IPS_MAGIC);
  }

  async parseFile(u8Array: Uint8Array) {
    let loc = 0; // location in file
    let numRleRecord = 0;
    let numSimpleRecord = 0;
    loc += 5;
    while (loc < u8Array.length) {
      var offset = readU24(u8Array, loc);
      loc += 3;

      if (offset === MAX_SIZE) {
        /* EOF */
        if ((loc = u8Array.length)) {
          break;
        } else if (loc + 3 === u8Array.length) {
          this.truncate = Boolean(readU24(u8Array, loc));
          loc += 3;
          break;
        }
      }

      let length = readU16(u8Array, loc);
      loc += 2;
      if (length === IPS_RECORD_RLE) {
        length = readU16(u8Array, loc);
        loc += 2;
        let b = readU8(u8Array, loc);
        loc += 1;
        this.addRleRecord(offset, length, b);
        numRleRecord++;
      } else {
        let data = readBytes(u8Array, loc, length);
        loc += length;
        this.addSimpleRecord(offset, data);
        numSimpleRecord++;
      }
    }
  }
}
