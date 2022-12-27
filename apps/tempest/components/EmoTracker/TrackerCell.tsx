import React from "react";
import {
  CharacterCell as CharCellType,
  LayoutCell,
  LayoutNumberCell,
} from "./layout";
import { GetSaveDataResponse } from "~/types/tracker";
import CharacterCell from "./cells/CharacterCell";
import { RenderCell } from "./renderCell";
import { useTrackerContext } from "./TrackerProvider";
import { checkToAsset } from "@ff6wc/ff6-types";
import { getAssetUrl } from "~/utils/getAssetUrl";
import { cx } from "cva";
import Image from "next/image";

type Props = {
  cell: LayoutCell | LayoutNumberCell;
};

export function TrackerCell(props: Props): JSX.Element {
  const { cell } = props;
  const { data } = useTrackerContext();

  if (!data) {
    return <></>;
  }

  if (cell instanceof CharCellType) {
    return <CharacterCell cell={cell} />;
  } else if (cell instanceof LayoutCell) {
    const [key, assetName, callback, gated] = cell.args;

    if (callback == null) {
      return <></>;
    }

    const value = callback(data as GetSaveDataResponse);
    const completed = value as boolean;

    const id = `cell-${key}`;

    const isAvailable = gated ? gated(data as GetSaveDataResponse) : true;
    const isComplete = !!value;

    const className = cx(
      !isAvailable ? "gated-cell" : "",
      !isComplete ? "inactive-cell" : "",
      isComplete ? "complete-cell" : ""
    );

    const render = (
      <Image
        id={id}
        src={getAssetUrl(checkToAsset[assetName])}
        alt={key}
        className={`${className} user-select-none`}
        width={64}
        height={64}
        draggable={false}
      />
    );

    return RenderCell(
      key,
      render,
      assetName,
      cx(
        !isAvailable ? "gated-cell" : "",
        !completed ? "inactive-cell" : "",
        completed ? "complete-cell" : ""
      ),
      "",
      null,
      { min: 0, max: 1, value: value as number }
    );
  } else if (cell instanceof LayoutNumberCell) {
    const [
      key,
      assetName,
      callback,
      gated,
      options = { min: undefined, max: undefined },
    ] = cell.args;

    const { max, min = 0 } = options;
    const value = callback(data as GetSaveDataResponse) as number;
    const active = Math.max(min, Math.min(max ?? 3, value)) > 0;
    const isAvailable = gated ? gated(data as GetSaveDataResponse) : true;

    const className = cx(
      !isAvailable ? "gated-cell" : "",
      !active ? "inactive-cell" : "",
      active ? "complete-cell" : ""
    );

    const adornmentValue = value;
    const adornment =
      value === 0 ? null : (
        <div className={"overlay"}>
          <div className={cx("overlay-content flex", "text-2xl")}>
            <span className={cx(className)} style={{ lineHeight: "22px" }}>
              {adornmentValue}
            </span>
          </div>
        </div>
      );

    const id = `cell-${key}`;

    const render = (
      <Image
        id={id}
        src={getAssetUrl(checkToAsset[assetName])}
        alt={key}
        className={`${className} user-select-none`}
        width={64}
        height={64}
        draggable={false}
      />
    );
    return RenderCell(key, render, assetName, className, "", adornment, {
      min,
      max,
      value,
    });
  }

  return <></>;
}

export default TrackerCell;
