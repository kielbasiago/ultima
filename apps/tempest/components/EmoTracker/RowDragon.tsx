import { LayoutCell, LayoutGroup } from "~/components/EmoTracker/layout";
import TrackerCell from "~/components/EmoTracker/TrackerCell";
import TrackerGroup from "~/components/EmoTracker/TrackerGroup";

const groupByLocation = new LayoutGroup("dragons", "flex-wrap", [
  new LayoutCell(
    "ancientCastleDragon",
    "ancientCastleDragon",
    ({ dragons }) => dragons.ancientCastleDragon
  ),
  new LayoutCell(
    "narsheDragon",
    "narsheDragon",
    ({ dragons }) => dragons.narsheDragon
  ),
  new LayoutCell(
    "mtZozoDragon",
    "mtZozoDragon",
    ({ dragons }) => dragons.mtZozoDragon
  ),
  new LayoutCell(
    "operaHouseDragon",
    "operaHouseDragon",
    ({ dragons }) => dragons.operaHouseDragon
  ),
  new LayoutCell(
    "kefkaTowerMidDragon",
    "kefkaTowerMidDragon",
    ({ dragons }) => dragons.kefkaTowerMidDragon
  ),
  new LayoutCell(
    "kefkaTowerRightDragon",
    "kefkaTowerRightDragon",
    ({ dragons }) => dragons.kefkaTowerRightDragon
  ),
  new LayoutCell(
    "phoenixCaveDragon",
    "phoenixCaveDragon",
    ({ dragons }) => dragons.phoenixCaveDragon
  ),
  new LayoutCell(
    "fanaticsTowerDragon",
    "fanaticsTowerDragon",
    ({ dragons }) => dragons.fanaticsTowerDragon
  ),
]);

const groupByMonster = new LayoutGroup("dragons", "flex-wrap", [
  new LayoutCell(
    "blueDragon",
    "blueDragon",
    ({ dragons }) => dragons.blueDragon
  ),
  new LayoutCell("iceDragon", "iceDragon", ({ dragons }) => dragons.iceDragon),
  new LayoutCell(
    "stormDragon",
    "stormDragon",
    ({ dragons }) => dragons.stormDragon
  ),
  new LayoutCell(
    "dirtDragon",
    "dirtDragon",
    ({ dragons }) => dragons.dirtDragon
  ),
  new LayoutCell(
    "goldDragon",
    "goldDragon",
    ({ dragons }) => dragons.goldDragon
  ),
  new LayoutCell(
    "skullDragon",
    "skullDragon",
    ({ dragons }) => dragons.skullDragon
  ),
  new LayoutCell("redDragon", "redDragon", ({ dragons }) => dragons.redDragon),
  new LayoutCell(
    "whiteDragon",
    "whiteDragon",
    ({ dragons }) => dragons.whiteDragon
  ),
]);

const foo = (val: any[], groupName: string) =>
  val.map((cell) => {
    const [cellId] = cell.args;
    return <TrackerCell key={`${groupName}-${cellId}`} cell={cell} />;
  });

export const RowDragon = () => {
  const [monsterGroupName, _2, monsterCells] = groupByMonster.args;
  const [groupName, _, cells] = groupByLocation.args;
  const $cells = foo(cells, groupName);
  const $cells2 = foo(monsterCells, monsterGroupName);

  return (
    <>
      <h2>By Location</h2>
      <TrackerGroup group={groupByLocation}>{$cells}</TrackerGroup>
      <h2>By Dragon</h2>
      <TrackerGroup group={groupByMonster}>{$cells2}</TrackerGroup>
    </>
  );
};
