import { PaletteColor } from "./PaletteColor";
import padStart from "lodash/padStart";

export class Palette {
    protected bytes: number[];
    public colors: Array<PaletteColor>;

    constructor(bytes: Array<number>) {
        this.bytes = bytes;
        this.colors = [];
        this.decode(bytes);
    }

    protected decode(data: Array<number>) {
        for (let i = 0; i < 16; i++) {
            const idx = i * 2;

            const b1 = data[idx + 1];
            const b2 = data[idx];
            const b1b = padStart(b1.toString(2), 8, "0");
            const b2b = padStart(b2.toString(2), 8, "0");
            const byteString = b1b.concat(b2b); // get 16 bit byte string

            const rawr = byteString.slice(11, 16);
            const rawg = byteString.slice(6, 11);
            const rawb = byteString.slice(1, 6);

            const r = i === 0 ? 31 : Number.parseInt(rawr, 2); // * 8;
            const g = i === 0 ? 0 : Number.parseInt(rawg, 2); // * 8;
            const b = i === 0 ? 0 : Number.parseInt(rawb, 2); // * 8;

            this.colors[i] = new PaletteColor(r, g, b, i === 0 ? 0 : 1);
        }

        return this;
    }
}
