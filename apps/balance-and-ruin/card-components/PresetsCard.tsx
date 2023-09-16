import { Card, HelperText } from "@ff6wc/ui";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { components, GroupProps } from "react-select";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { Select, SelectOption } from "~/components/Select/Select";
import { setRawFlags } from "~/state/flagSlice";
import { setRawObjectives } from "~/state/objectiveSlice";

export type PresetsCardProps = {
  presets: SelectOption[];
};

export const PresetsCard = ({ presets }: PresetsCardProps) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<SelectOption | null>(null);

  return (
    <Card title={"Presets"}>
      <div className="flex flex-col gap-1">
        <InputLabel htmlFor="tournament-preset-select">
          Tournament Presets
        </InputLabel>
        <Select
          options={presets}
          onChange={(option) => {
            if (option) {
              setSelected(option);
              dispatch(setRawFlags(option.value));
              dispatch(setRawObjectives(option.value));
            }
          }}
          value={selected}
        />
        <HelperText>Presets used for recent tournaments</HelperText>
      </div>

      {/* <div className="flex flex-col gap-1">
        <InputLabel htmlFor="tournament-preset-select">
          Seed of the week
        </InputLabel>
        <Select
          options={presets}
          onChange={(option) => {
            if (option) {
              setSelected(option);
              dispatch(setRawFlags(option.value));
            }
          }}
          value={selected}
        />
        <HelperText>Presets used for ongoing tournaments</HelperText>
      </div> */}
    </Card>
  );
};
