import { InputLabel } from "~/components/InputLabel/InputLabel";
import { HelperText } from "@ff6wc/ui";

export type FlagLabelProps = {
  helperText: React.ReactNode;
  flag: string;
  label: React.ReactNode;
};

export const FlagLabel = ({ helperText, flag, label }: FlagLabelProps) => {
  return (
    <div className="flex-grow wrap">
      <InputLabel htmlFor={flag}>{label}</InputLabel>
      <HelperText>{helperText}</HelperText>
    </div>
  );
};
