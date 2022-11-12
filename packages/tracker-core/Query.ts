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

  public setLogger(logger: ExternalLogger): this {
    this._externalLogger = logger;
    return this;
  }

  public bytesToArray(buffer: Buffer): Array<string> {
    return buffer
      .join(" ")
      .split(" ")
      .map((byte) => this.normalizeByte(byte, 10));
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
