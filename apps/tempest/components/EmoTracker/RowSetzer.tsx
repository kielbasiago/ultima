import TrackerCell from "./TrackerCell";
import TrackerGroup from "./TrackerGroup";
import { useTrackerContext } from "./TrackerProvider";
import { CharacterCell, LayoutCell, LayoutGroup } from "./layout";

const group = new LayoutGroup("setzer", "flex-end", [
  new LayoutCell(
    "darill",
    "darill",
    ({ events }) => events.darill,
    ({ characters }) => characters.setzer
  ),
  new LayoutCell(
    "kohligen",
    "kohligen",
    ({ events }) => events.kohligen,
    ({ characters }) => characters.setzer
  ),
  new CharacterCell(
    "setzer",
    "setzer",
    ({ characters }) => characters.setzer,
    ({ characters }) => characters.setzer
  ),
]);

export const RowSetzer = () => {
  const [groupName, _, cells] = group.args;
  const $cells = cells.map((cell) => {
    const [cellId] = cell.args;
    return <TrackerCell key={`${groupName}-${cellId}`} cell={cell} />;
  });

  return <TrackerGroup group={group}>{$cells}</TrackerGroup>;
};
