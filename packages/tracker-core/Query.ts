import padStart from "lodash/padStart";
import { getLogger, Logger } from "loglevel";
import { USB2SNES_ROM_LOCATION, USB2SNES_WRAM_LOCATION } from "./constants";
import { ExternalLogger } from "./types";

export type QueryResultType<T> = T extends Query<infer A> ? A : unknown;

export abstract class Query<TOutput> {
    protected logger: Logger;
    private _externalLogger: ExternalLogger;
    /** Address relative to wram to get the value */
    public abstract get queryAddress(): Array<number>;
    /** The number of subsequent bytes to get from queryAddress */
    public abstract get queryLength(): Array<number>;

    public abstract onResponse(response: Array<Uint8Array>): Promise<TOutput>;

    constructor() {
        this.logger = getLogger("Query");
        this._externalLogger = () => {};
    }

    /**
     * swaps every other byte in the array and conbimes them
     * ['1E', '2F', 'FF', '00'] will yield ['2F1E', '00FF']
     *
     * @param data array of bytes to read
     * @returns array of bytes,
     */
    public toHalfwords(data: Array<string>) {
        return data.reduce((acc, val, idx) => {
            // perform every even index
            if (!(idx % 2)) {
                const halfword = this.combineHalfword(data[idx + 1], data[idx]);
                return acc.concat(halfword);
            }
            return acc;
        }, [] as Array<string>);
    }

    /**
     *  swaps every other byte in the array and retains initial byte order.
     *  Needed for reading single byte as they are read backwards
     * ['1E', '2F', 'FF', '00'] will yield ['E1', 'F2',  'FF','00']

     * @param data Array of bytes to read
     */
    public toBytes(data: Array<string>) {
        return data.reduce((acc, val, idx) => {
            const byte = this.normalizeByte(val, 16);
            const c1 = byte[0];
            const c2 = byte[1];
            return acc.concat(`${c2}${c1}`);
        }, [] as Array<string>);
    }

    public toValue(byte: string): number {
        return Number.parseInt(byte, 16);
    }

    public setLogger(logger: ExternalLogger): this {
        this._externalLogger = logger;
        return this;
    }

    public get queryArgs(): Array<Array<number>> {
        return [];
    }

    private combineHalfword(byte1: string, byte2: string) {
        return [
            this.normalizeByte(byte1, 16),
            this.normalizeByte(byte2, 16),
        ].join("");
    }

    public bytesToArray(buffer: Buffer): Array<string> {
        return buffer
            .join(" ")
            .split(" ")
            .map((byte) => this.normalizeByte(byte, 10));
    }

    public readByte(data: Buffer, baseAddress: number, address: number) {
        return data[address - baseAddress];
    }

    protected log(...messages: Array<string>): unknown {
        messages.forEach((msg) => this._externalLogger(msg));
        return;
    }

    protected normalizeByte(val: string, radix: number): string {
        const toStr = Number.parseInt(val, radix).toString(16).toUpperCase();
        const final = padStart(toStr, 2, "0");

        return final;
    }

    protected IN_WRAM(addr: number) {
        return USB2SNES_WRAM_LOCATION + addr;
    }

    protected IN_ROM(addr: number) {
        return USB2SNES_ROM_LOCATION + addr;
    }
}
