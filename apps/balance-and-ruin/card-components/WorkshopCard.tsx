import { Card, HelperText } from "@ff6wc/ui";
import { BetaLabel } from "~/components/BetaLabel/BetaLabel";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { randomEncounterDescription } from "~/constants/randomEncounterConstants";

const randomEncounterOptions: SubflagOption[] = [
  {
    defaultValue: true,
    flag: "-res",
    helperText: `Random encounters are shuffled. ${randomEncounterDescription}`,
    label: "Shuffle",
    isStatic: true,
  },
  {
    defaultValue: 0,
    flag: "-rer",
    helperText: `Random encounters have a {{.}}% chance to be a random boss. ${randomEncounterDescription}`,
    label: "Random with boss chance",
    Renderable: ({ children }) => (
      <div>
        <div>
          <FlagSlider flag="-rer" helperText="" label={children} />
        </div>
      </div>
    ),
  },
  {
    defaultValue: true,
    flag: "-rechu",
    isStatic: true,
    helperText: () => (
      <BetaLabel>
        All Random Encounters are replaced with Chupon (Coliseum)
      </BetaLabel>
    ),
    label: "Chupon",
    Renderable: ({ children }) => <div>{children}</div>,
  },
];

export const WorkshopCard = () => {
  return (
    <Card title={"Workshop"}>
      <CardColumn>
        <HelperText variant="success">
          <div>
            <strong>Workshop</strong> flags are those that are leftover from
            testing but still have some use for flagset creation
          </div>
          <div>
            These are stable and left for the community to play with but are
            either too niche for the normal UI or still being actively worked on
            for a later release
          </div>
        </HelperText>
        <FlagSubflagSelect
          options={randomEncounterOptions}
          label={<BetaLabel>Random Encounters</BetaLabel>}
        />
        <FlagSwitch
          flag="-scia"
          label={<BetaLabel>Sketch/Control Improved Abilities</BetaLabel>}
          helperText={
            <div>
              Improves Sketch & Control abilities. Removes Battle from Sketch.
              Adds Rage as a Sketch/Control possibility for most monsters. Gives
              Sketch abilities to most bosses.
            </div>
          }
        />
        <FlagSlider
          flag="-sj"
          label={<BetaLabel>Starting Junk</BetaLabel>}
          helperText="Start the game with {{.}} unique low tier items. Includes weapons, armors, helmets, shields, and relics"
        />

      </CardColumn>
    </Card>
  );
};
