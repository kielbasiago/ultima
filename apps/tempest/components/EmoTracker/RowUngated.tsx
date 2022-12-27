import {
  LayoutCell,
  LayoutGroup,
  LayoutNumberCell,
} from "~/components/EmoTracker/layout";
import TrackerCell from "~/components/EmoTracker/TrackerCell";
import TrackerGroup from "~/components/EmoTracker/TrackerGroup";

const group = new LayoutGroup("none", "", [
  new LayoutCell(
    "tzenThief",
    "tzenThief",
    ({ events }) => events.tzenThief,
    undefined
  ),

  new LayoutNumberCell(
    "auctionHouse",
    "auctionHouse",
    ({ events }) =>
      // return number of checks done at this point
      [events.auctionHouse1, events.auctionHouse2].filter((z) => !!z).length,
    undefined,
    {
      max: 2,
    }
  ),

  new LayoutCell(
    "kefkaAtNarshe",
    "kefkaAtNarshe",
    ({ events }) => events.kefkaAtNarshe,
    undefined
  ),

  new LayoutCell("doomGaze", "doomGaze", ({ events }) => events.doomGaze),
  new LayoutCell("tritoch", "tritoch", ({ events }) => events.tritoch),
]);

export const RowUngated = () => {
  const [groupName, _, cells] = group.args;
  const $cells = cells.map((cell) => {
    const [cellId] = cell.args;
    return <TrackerCell key={`${groupName}-${cellId}`} cell={cell} />;
  });

  return <TrackerGroup group={group}>{$cells}</TrackerGroup>;
};
