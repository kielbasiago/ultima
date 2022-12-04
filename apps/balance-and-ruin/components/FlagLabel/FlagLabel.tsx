import { InputLabel } from "~/components/InputLabel/InputLabel";
import { HelperText } from "~/design-components";

export type FlagLabelProps = {
  helperText: string | null;
  flag: string;
  label: React.ReactNode;
};

export const FlagLabel = ({ helperText, flag, label }: FlagLabelProps) => {
  return (
    <div className={"flex-grow"}>
      <InputLabel htmlFor={flag}>{label}</InputLabel>
      <HelperText>{helperText}</HelperText>
    </div>
  );
};
