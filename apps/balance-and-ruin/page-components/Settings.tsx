import { PresetsCard } from "~/card-components/PresetsCard";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import startCase from "lodash/startCase";
import { SelectOption } from "~/components/Select/Select";
import { useMemo } from "react";
import { SettingsCard } from "~/card-components/SettingsCard";

export type SeedOfTheWeek = {
  create_date: string;
  creator: string;
  header_msg_id: string;
  leaderboard_header_id: string;
  name: string;
  participants_msg_id: string;
  rankings_msg_id: string;
  runners: Record<
    string,
    {
      id: string;
      finish_time: string;
      timestamp: string;
    }
  >;
  seed: string;
  spoiler_splitter_id: string;
  submitter: string;
};

export type SeedbotPreset = {
  arguments: string;
  creator: string;
  creator_id: number;
  description: string;
  /** flags */
  flags: string;
  /** label */
  name: string;
};

// const usePresets = () => {
//   return useSWR(["presets"], async () => {
//     const rawData: Record<string, SeedOfTheWeek> = await response.json();

//     return sotw;
//   });
// };

type PresetsProps = {
  presets: Record<string, SeedbotPreset>;
};

export const Settings = ({ presets: rawPresets }: PresetsProps) => {
  const presets = useMemo(() => {
    const options = [
      rawPresets["ultrosleague"],
      rawPresets["chuponsdelightnext"],
      rawPresets["coliseum terra"],
      rawPresets["coliseum locke"],
      rawPresets["coliseum edgar"],
      rawPresets["coliseum sabin"],
      rawPresets["coliseum cyan"],
      rawPresets["coliseum gau"],
      rawPresets["coliseum celes"],
      rawPresets["coliseum setzer"],
      rawPresets["coliseum strago"],
      rawPresets["coliseum relm"],
      rawPresets["coliseum shadow"],
      rawPresets["coliseum mog"],
      rawPresets["coliseum gogo"],
      rawPresets["coliseum umaro"],
    ];

    return options.map<SelectOption>(
      ({ creator, description, name, flags }) => {
        return {
          label: startCase(name),
          value: flags,
          helperText: [description, `Created by ${creator}`]
            .filter((z) => !!z)
            .join(". "),
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
