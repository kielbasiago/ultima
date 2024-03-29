import { PresetsCard } from "~/card-components/PresetsCard";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import startCase from "lodash/startCase";
import { SelectOption } from "~/components/Select/Select";
import { useMemo } from "react";
import { SettingsCard } from "~/card-components/SettingsCard";
import { FlagPreset } from "~/types/preset";

type PresetsProps = {
  presets: Record<string, FlagPreset>;
};

export const Settings = ({ presets: rawPresets }: PresetsProps) => {
  const presets = useMemo(() => {
    const options = [];
    for (const rawPresetName in rawPresets) {
      if(rawPresets[rawPresetName].official) {
        options.push(rawPresets[rawPresetName]);
      }
    }

    return options.map<SelectOption>(
      ({ creator, description, name, flags }) => {
        return {
          label: startCase(name),
          value: flags,
          helperText: [description, `Created by ${creator}`]
            .filter((z) => !!z)
            .join(" "),
        };
      }
    );
  }, [rawPresets]);

  return (
    <PageContainer className={"flex flex-wrap"}>
      <PresetsCard presets={presets ?? []} />
      <SettingsCard />
    </PageContainer>
  );
};
