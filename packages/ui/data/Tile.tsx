import { Palette } from "./Palette";

const MASK = [0x1, 0x2, 0x4, 0x8, 0x10, 0x20, 0x40, 0x80];
function getByteIndex(data: Array<number>, bit: number) {
  // Utility
  return data.length - 1 - Math.floor(bit / 8);
}
function getBit(data: Array<number>, bit: number): boolean {
  return !!(data[getByteIndex(data, bit)] & MASK[bit % 8]);
}

// Ported from https://github.com/drewlith/dirk/blob/main/Assets/Scripts/ROM%20Scripts/Tile.cs
export class Tile {
  protected bytes: Array<number>;
  public readonly map: Array<{
    x: number;
    y: number;
    value: number;
  }>;

  public readonly palette: Palette;

  constructor(bytes: Array<number>, palette: Palette) {
    if (bytes.length !== 32) {
      throw new Error("Tile bytes array must be 32 length");
    }
    this.bytes = bytes;
    this.map = [];
    this.palette = palette;
    this.decode(bytes);
  }

  protected decode(bytes: Array<number>) {
    const pairs: Array<Array<number>> = new Array(8);

    for (let i = 0; i < 8; i++) {
      const idx = i * 2;
      const pair = new Array<number>(4);
      pair[0] = bytes[idx];
      pair[1] = bytes[idx + 1];
      pair[2] = bytes[idx + 16];
      pair[3] = bytes[idx + 17];
      pairs[i] = pair;
    }

    // Get Palette IDs by overlaying bytes
    for (let y = 0; y < 8; y++) {
      // Iterate bits
      for (let x = 7; x >= 0; x--) {
        let value = 0;
        if (getBit(pairs[y], x + 24)) {
          value += 1;
        }
        if (getBit(pairs[y], x + 16)) {
          value += 2;
        }
        if (getBit(pairs[y], x + 8)) {
          value += 4;
        }
        if (getBit(pairs[y], x)) {
          value += 8;
        }

        this.map.push({
          x: 7 - x,
          y,
          value,
        });
      }
    }
  }
}
