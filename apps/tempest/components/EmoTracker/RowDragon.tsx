import { LayoutCell, LayoutGroup } from "~/components/EmoTracker/layout";
import TrackerCell from "~/components/EmoTracker/TrackerCell";
import TrackerGroup from "~/components/EmoTracker/TrackerGroup";

const group = new LayoutGroup("dragons", "flex-wrap", [
  new LayoutCell(
    "ancientCastleDragon",
    "blueDragon",
    ({ dragons }) => dragons.ancientCastleDragon
  ),
  new LayoutCell(
    "narsheDragon",
    "iceDragon",
    ({ dragons }) => dragons.narsheDragon
  ),
  new LayoutCell(
    "mtZozoDragon",
    "stormDragon",
    ({ dragons }) => dragons.mtZozoDragon
  ),
  new LayoutCell(
    "operaHouseDragon",
    "dirtDragon",
    ({ dragons }) => dragons.operaHouseDragon
  ),
  new LayoutCell(
    "kefkaTowerMidDragon",
    "goldDragon",
    ({ dragons }) => dragons.kefkaTowerMidDragon
  ),
  new LayoutCell(
    "kefkaTowerRightDragon",
    "skullDragon",
    ({ dragons }) => dragons.kefkaTowerRightDragon
  ),
  new LayoutCell(
    "phoenixCaveDragon",
    "redDragon",
    ({ dragons }) => dragons.phoenixCaveDragon
  ),
  new LayoutCell(
    "fanaticsTowerDragon",
    "whiteDragon",
    ({ dragons }) => dragons.fanaticsTowerDragon
  ),
]);

export const RowDragon = () => {
  const [groupName, _, cells] = group.args;
  const $cells = cells.map((cell) => {
    const [cellId] = cell.args;
    return <TrackerCell key={`${groupName}-${cellId}`} cell={cell} />;
  });

  return <TrackerGroup group={group}>{$cells}</TrackerGroup>;
};
