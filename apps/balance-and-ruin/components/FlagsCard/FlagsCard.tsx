import { Card } from "@ff6wc/ui";
import { useDispatch, useSelector } from "react-redux";
import { selectFlagValues, selectRawFlags, setFlags } from "~/state/flagSlice";
import { flagsToData } from "~/utils/flagsToData";

export type FlagsCardProps = {};

export const FlagsCard = (props: FlagsCardProps) => {
  const flags = useSelector(selectRawFlags);
  const value = useSelector(selectFlagValues);
  const dispatch = useDispatch();
  const onChange = (value: string) => {
    dispatch(setFlags(flagsToData(value)));
  };
  return (
    <Card {...props} className={"p-0"} title="Flags">
      {flags}&nbsp;
    </Card>
  );
};
