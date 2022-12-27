import { LayoutNumberCell as CellType } from "../layout";
import { useTrackerContext } from "../TrackerProvider";

type Props = {
  cell: CellType;
};

export function MulticheckCell(props: Props): JSX.Element {
  const { cell } = props;
  const data = useTrackerContext();

  if (!data) {
    return <></>;
  }

  const [key] = cell.args;
  return <>{key}</>;
}

export default MulticheckCell;
