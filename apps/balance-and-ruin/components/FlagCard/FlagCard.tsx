import { Card, CardProps } from "@ff6wc/ui";
import { useDispatch, useSelector } from "react-redux";
import { selectRawFlags } from "~/state/flagSlice";

export type FlagsCardProps = {};

export const FlagsCard = (props: FlagsCardProps) => {
  const flags = useSelector(selectRawFlags);
  return (
    <Card {...props} title="Flags">
      {flags}
    </Card>
  );
};
