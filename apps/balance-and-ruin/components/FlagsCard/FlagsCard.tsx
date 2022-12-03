import { Card } from "@ff6wc/ui";
import { cx } from "cva";
import { useDispatch, useSelector } from "react-redux";
import { selectFlagValues, selectRawFlags, setFlags } from "~/state/flagSlice";
import { flagsToData } from "~/utils/flagsToData";

export type FlagsCardProps = {
  className?: string;
};

export const FlagsCard = ({ className, ...rest }: FlagsCardProps) => {
  const flags = useSelector(selectRawFlags);
  const value = useSelector(selectFlagValues);
  const dispatch = useDispatch();
  const onChange = (value: string) => {
    dispatch(setFlags(flagsToData(value)));
  };
  return (
    <Card {...rest} className={cx("p-0", className)} title="Flags">
      {flags}&nbsp;
    </Card>
  );
};
