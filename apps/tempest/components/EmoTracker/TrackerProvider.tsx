import React from "react";
import {
  FF6CharacterFlags,
  ff6Characters,
  FF6DragonFlags,
  ff6Dragons,
  FF6EventFlags,
  ff6Events,
} from "@ff6wc/ff6-types";
import { GetSaveDataResponse } from "~/types/tracker";
import type { TrackerContextData } from "~/utils/useTrackerData";

export const getTrackerDefaults = () => {
  const characters = Object.keys(ff6Characters).reduce((acc, key) => {
    acc[key as keyof FF6CharacterFlags] = false;
    return acc;
  }, {} as FF6CharacterFlags);
  const events = Object.keys(ff6Events).reduce((acc, key) => {
    acc[key as keyof FF6EventFlags] = false;
    return acc;
  }, {} as FF6EventFlags);
  const dragons = Object.keys(ff6Dragons).reduce((acc, key) => {
    acc[key as keyof FF6DragonFlags] = false;
    return acc;
  }, {} as FF6DragonFlags);

  const defaultData = {
    characters,
    events,
    dragons,
    allFlags: {
      ...characters,
      ...events,
      ...dragons,
    },
    bossCount: 0,
    characterCount: 0,
    chestCount: 0,
    checkCount: 0,
    dragonCount: 0,
    esperCount: 0,
    gameTime: 0,
  } as GetSaveDataResponse;

  return defaultData;
};

export const TrackerContext = React.createContext<TrackerContextData | null>(
  null
);

export const useTrackerContext = () => {
  const value = React.useContext(TrackerContext);
  if (!value) {
    const defaults = getTrackerDefaults();
    return {
      data: { ...defaults },
      onClick: () => {},
      onRightClick: () => {},
      updateCell: () => defaults,
      updateNumberCell: () => defaults,
      updateValue: () => defaults,
      updateData: () => {},
    } as TrackerContextData;
  }

  return value;
};
