import { Card } from "@ff6wc/ui";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Select, SelectOption } from "~/components/Select/Select";
import { setRawFlags } from "~/state/flagSlice";

type PresetsCardProps = {
  presets: SelectOption[];
};

export const PresetsCard = ({ presets }: PresetsCardProps) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<SelectOption | null>(null);

  return (
    <Card title={"Presets"}>
      <Select
        options={presets}
        onChange={(option) => {
          if (option) {
            setSelected(option);
            dispatch(setRawFlags(option.value));
          }
        }}
        value={selected}
      ></Select>
    </Card>
  );
};
