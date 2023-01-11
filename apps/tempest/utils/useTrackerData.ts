import times from "lodash/times";
import { getLogger } from "loglevel";
import {
  CharacterCell,
  getCell,
  LayoutCell,
  LayoutNumberCell,
} from "~/components/EmoTracker/layout";
import { GetSaveDataResponse, TrackerMode } from "~/types/tracker";
import { FF6Character, FF6Dragon, FF6Event } from "@ff6wc/ff6-types";

export type TrackerContextData = {
  data: GetSaveDataResponse;
  onClick: (key: string) => unknown;
  onRightClick: (key: string) => unknown;
  updateCell: (cell: LayoutCell, value: boolean) => GetSaveDataResponse;
  updateNumberCell: (
    cell: LayoutNumberCell,
    value: number
  ) => GetSaveDataResponse;
  updateValue: (key: string, value: any) => GetSaveDataResponse;
  updateData: (data: GetSaveDataResponse) => void;
};

/** Returns  */
type UseTrackerDataProps = {
  mode: TrackerMode;
  trackerData: GetSaveDataResponse;
  setTrackerData: (data: GetSaveDataResponse) => void;
};

type DataKey = keyof GetSaveDataResponse;

const disabledWhenManual = ["characterCount", "dragonCount", "checkCount"];

export function useTrackerData(props: UseTrackerDataProps) {
  const { trackerData, mode, setTrackerData } = props;
  const providerData = {
    data: { ...trackerData },
    // increment
    onClick(key: string) {
      if (mode === TrackerMode.AUTO || disabledWhenManual.includes(key)) {
        return;
      }

      const cell = getCell(key);
      // magitek, floatingContintent, nightmare, auctionHouse, etc.
      if (cell == null) {
        getLogger("useTrackerData--Manual-onClick").info(
          `no cell for key ${key}`
        );
        return;
      }

      if (cell instanceof CharacterCell) {
        const [key, _display, valueCallback, _cb2] = cell.args;
        const currentValue = valueCallback(trackerData) as boolean;
        const newData = providerData.updateValue(key, !currentValue);
        providerData.updateData(newData);
      } else if (cell instanceof LayoutNumberCell) {
        const [
          _key,
          _display,
          valueCallback,
          _cb2,
          options = { min: 0, max: 3 },
        ] = cell.args;
        const currentValue = valueCallback(trackerData) as number;
        const { min, max } = options;
        let newValue = 0;
        if (currentValue < max) {
          newValue = Math.max(0, Math.min(currentValue + 1, max));
        }
        const newData = providerData.updateNumberCell(cell, newValue);
        providerData.updateData(newData);
      } else if (cell instanceof LayoutCell) {
        const [_key, _displayName, valueCallback] = cell.args;
        const currentValue = valueCallback(trackerData) as boolean;
        const newData = providerData.updateCell(cell, !currentValue);
        providerData.updateData(newData);
      }
    },

    // decrement
    onRightClick(key: string) {
      if (mode === TrackerMode.AUTO || disabledWhenManual.includes(key)) {
        return;
      }

      const cell = getCell(key);

      // magitek, floatingContintent, nightmare, auctionHouse, etc.
      if (cell == null) {
        getLogger("AnguirelTracekr--Manual-onRightClick").info(
          `no cell for key ${key}`
        );
        return;
      }

      if (cell instanceof LayoutCell || cell instanceof CharacterCell) {
        const newData = providerData.updateValue(cell.args[0], false);
        providerData.updateData(newData);
      } else if (cell instanceof LayoutNumberCell) {
        const [
          _key,
          _display,
          valueCallback,
          _cb2,
          options = { min: 0, max: 3 },
        ] = cell.args;
        const currentValue = valueCallback(trackerData) as number;
        const { min = 0, max } = options;
        let newValue = currentValue - 1;
        if (currentValue > min) {
          newValue = Math.min(max, Math.max(currentValue - 1, 0));
        } else {
          newValue = max;
        }
        const newData = providerData.updateNumberCell(cell, newValue);
        providerData.updateData(newData);
      }
    },
    updateData(newData: GetSaveDataResponse): void {
      setTrackerData({
        ...trackerData,
        ...newData,
      });
    },
    updateNumberCell(cell, value): GetSaveDataResponse {
      const rawkey = cell.args[0];
      const opts = cell.args[4] ?? {
        min: 0,
        max: 3,
      };

      if (trackerData[rawkey as DataKey] != null) {
        const latestData = providerData.updateValue(rawkey, value);
        return latestData;
      }

      const checkKeys = times(opts.max, (idx) => `${rawkey}${idx + 1}`);
      let latestData: GetSaveDataResponse | null = trackerData;
      checkKeys.forEach((val, idx) => {
        // working with index of 1
        idx++;
        latestData = providerData.updateValue(val, value >= idx);
      });

      return latestData as GetSaveDataResponse;
    },
    updateCell(cell, value): GetSaveDataResponse {
      const data = providerData.updateValue(cell.args[0], value);
      return data;
    },
    updateValue(flag, value): GetSaveDataResponse {
      const character = trackerData.characters[flag as FF6Character] != null;
      const event = trackerData.events[flag as FF6Event] != null;
      const dragon = trackerData.dragons[flag as FF6Dragon] != null;
      const global = trackerData[flag as DataKey] != null;

      if (global) {
        const f = flag as DataKey;
        trackerData[f] = value;
      } else if (character) {
        const f = flag as FF6Character;
        trackerData.allFlags[f] = value;
        trackerData.characters[f] = value;
      } else if (event) {
        const f = flag as FF6Event;
        trackerData.allFlags[f] = value;
        trackerData.events[f] = value;
      } else if (dragon) {
        const f = flag as FF6Dragon;
        trackerData.allFlags[f] = value;
        trackerData.dragons[f] = value;
      }

      return trackerData;
    },
  } as TrackerContextData;

  return providerData;
}
