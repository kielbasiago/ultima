import TrackerCell from "./TrackerCell";
import TrackerGroup from "./TrackerGroup";
import {
  CharacterCell,
  LayoutCell,
  LayoutGroup,
  LayoutNumberCell,
} from "./layout";
import TrackerRow from "~/components/EmoTracker/TrackerRow";

const characters = new LayoutNumberCell(
  "characterCount",
  "characterCount",
  ({ characters, characterCount }) => {
    return characterCount > 0
      ? characterCount
      : Object.values(characters).filter((z) => !!z).length;
  },
  undefined,
  {
    min: 1,
    max: 14,
  }
);

const espers = new LayoutNumberCell(
  "esperCount",
  "esperCount",
  ({ esperCount }) => {
    return esperCount;
  },
  undefined,
  {
    max: 27,
  }
);

const dragons = new LayoutNumberCell(
  "dragonCount",
  "dragonCount",
  ({ dragonCount, dragons }) => {
    return dragonCount > 0
      ? dragonCount
      : Object.values(dragons).filter((z) => !!z).length;
  },
  undefined,
  { max: 8 }
);

const bosses = new LayoutNumberCell(
  "bossCount",
  "bossCount",
  ({ bossCount }) => bossCount,
  undefined,
  { max: 100 }
);
const checks = new LayoutNumberCell(
  "checkCount",
  "checkCount",
  ({ checkCount, events, dragons }) => {
    return checkCount > 0
      ? checkCount
      : Object.values({ ...events, ...dragons }).filter((z) => !!z).length;
  },
  undefined,
  { max: 100 }
);
const chests = new LayoutNumberCell(
  "chestCount",
  "chestCount",
  ({ chestCount }) => chestCount,
  undefined,
  {
    max: 255,
  }
);

const group = new LayoutGroup("group1", "", [characters, espers, dragons]);
const group2 = new LayoutGroup("group2", "", [bosses, checks, chests]);

export const RowSimple = () => {
  const [groupName, _, cells] = group.args;
  const $cells = cells.map((cell) => {
    const [cellId] = cell.args;
    return <TrackerCell key={`${groupName}-${cellId}`} cell={cell} />;
  });

  const [groupName2, _2, cells2] = group2.args;

  const $cells2 = cells2.map((cell) => {
    const [cellId] = cell.args;
    return <TrackerCell key={`${groupName2}-${cellId}`} cell={cell} />;
  });

  return (
    <>
      <TrackerRow>
        <TrackerGroup group={group}>{$cells}</TrackerGroup>
      </TrackerRow>
      <TrackerRow>
        <TrackerGroup group={group2}>{$cells2}</TrackerGroup>
      </TrackerRow>
    </>
  );
};
