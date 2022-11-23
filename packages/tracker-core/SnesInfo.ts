export type SnesInfoArray = [string, string, string, ...Array<string>];

type SnesFlags = 'FEAT_DSPX' | 'FEAT_ST0010' | 'FEAT_SRTC' | 'FEAT_MSU1' | 'FEAT_213F' | 'FEAT_CMD_UNLOCK' | 'FEAT_USB1' | 'FEAT_DMA1';

export type SnesInfoData = {
    /** version of firmware */
    version: string;
    /** name of device */
    name: string;
    /** Current active runtime */
    active: string;
    flags: Array<SnesFlags>;
};
export class SnesInfo {
    private readonly _data: SnesInfoData;

    constructor(rawData: SnesInfoArray) {
        const [version, name, active, ...flags] = rawData;
        this._data = {
            active,
            flags: flags as Array<SnesFlags>,
            name,
            version
        };
    }

    public toJson() {
        return this._data;
    }
}
