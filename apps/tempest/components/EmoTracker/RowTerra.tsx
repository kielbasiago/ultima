import TrackerCell from "./TrackerCell";
import TrackerGroup from "./TrackerGroup";
import { useTrackerContext } from "./TrackerProvider";
import { CharacterCell, LayoutCell, LayoutGroup } from "./layout";

const TERRA = new CharacterCell(
  "terra",
  "terra",
  ({ characters }) => characters.terra,
  ({ characters }) => characters.terra
);
const LETE_RIVER = new LayoutCell(
  "leteRiver",
  "leteRiver",
  ({ events }) => events.leteRiver,
  ({ characters }) => characters.terra
);
const SEALED_GATE = new LayoutCell(
  "sealedGate",
  "sealedGate",
  ({ events }) => events.sealedGate,
  ({ characters }) => characters.terra
);
const WHELK = new LayoutCell(
  "whelk",
  "whelk",
  ({ events }) => events.whelk,
  ({ characters }) => characters.terra
);
const RAMUH = new LayoutCell(
  "ramuh",
  "ramuh",
  ({ events }) => events.ramuh,
  ({ characters }) => characters.terra
);
const MOBLIZ = new LayoutCell(
  "mobliz",
  "mobliz",
  ({ events }) => events.mobliz,
  ({ characters }) => characters.terra
);

const group = new LayoutGroup("terra", "flex-start", [
  TERRA,
  LETE_RIVER,
  RAMUH,
  SEALED_GATE,
  MOBLIZ,
  WHELK,
]);

export const RowTerra = () => {
  const context = useTrackerContext();

  const [groupName, _, cells] = group.args;
  const $cells = cells.map((cell) => {
    const [cellId] = cell.args;
    return <TrackerCell key={`${groupName}-${cellId}`} cell={cell} />;
  });

  return <TrackerGroup group={group}>{$cells}</TrackerGroup>;
};
