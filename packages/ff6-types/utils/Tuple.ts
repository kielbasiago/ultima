
export class Tuple<Args extends Array<any>> {
    public readonly args: Args;
    constructor(...args: Args) {
        this.args = args;

        this.init();
    }

    public value<TIn, TOut>(data: TIn): TOut {
        throw new Error("must be overridden");
    }

    protected init(): void {}
}
