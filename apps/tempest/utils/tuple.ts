import { GetSaveDataResponse } from "~/types/tracker";

export class Tuple<Args extends Array<any>, ValueType> {
  public readonly args: Args;
  constructor(...args: Args) {
    this.args = args;

    this.init();
  }

  public value(data: GetSaveDataResponse): ValueType {
    throw new Error("must be overridden");
  }

  protected init(): void {}
}
