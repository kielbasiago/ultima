import { cx } from "cva";
import React from "react";
import { CharacterCell as CellType } from "../layout";
import { useTrackerContext } from "../TrackerProvider";
import { characterChecks, GetSaveDataResponse } from "~/types/tracker";
import { checkToAsset, FF6Character } from "@ff6wc/ff6-types";
import { RenderCell } from "../renderCell";
import { getAssetUrl } from "~/utils/getAssetUrl";
import Image from "next/image";

type Props = {
  cell: CellType;
};

const charOrder = [
  "terra",
  "setzer",
  "sabin",
  "gau",
  "celes",
  "edgar",
  "shadow",
  "locke",
  "cyan",
  "strago",
  "relm",
  "umaro",
  "mog",
  "gogo",
];

export function CharacterCell(props: Props): JSX.Element {
  const { cell } = props;
  const { data } = useTrackerContext();

  if (!data) {
    return <></>;
  }

  const [
    k,
    displayName,
    callback,
    gated,
    options = { min: undefined, max: undefined },
  ] = cell.args;
  const key = k as FF6Character;
  const { max = 1, min = 0 } = options;
  const value = callback(data) as number;
  const active = Math.max(min, Math.min(max ?? 3, value)) > 0;
  const isAvailable = gated ? gated(data) : true;

  const charData = characterChecks[key];
  const checkCount = charData.length ?? null;
  const completedCheckCount = charData.filter((z) => data.allFlags[z]).length;

  const className = cx(
    !isAvailable ? "gated-cell" : "",
    !active ? "inactive-cell" : "",
    active ? "active-cell" : ""
  );
  const showAdornment = false;
  const idx = charOrder.indexOf(key);

  let isRight = !!(idx % 2);

  const complete = completedCheckCount / checkCount === 1;
  // ✅
  const adornmentValue = complete ? (
    <></>
  ) : active ? (
    <>
      {completedCheckCount} / {checkCount}
    </>
  ) : null;

  const adornment =
    !isAvailable || value === 0 ? null : (
      <div className={"overlay"}>
        <div
          className={cx(
            "text-sm sm:text-lg",
            "overlay-content",
            "font-mono",
            isRight ? "multicheck-cell-flex-end" : "multicheck-cell-flex-start",
            !complete ? "multicheck-cell-incomplete" : ""
          )}
        >
          <span color="inherit" className={className}>
            {adornmentValue}
          </span>
        </div>
      </div>
    );

  const id = `cell-${key}`;
  const render = (
    <Image
      id={id}
      src={getAssetUrl(checkToAsset[key])}
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
    displayName,
    className,
    "",
    showAdornment ? adornment : null,
    { min, max, value }
  );
}

export default CharacterCell;
