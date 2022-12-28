import { Card, HelperText } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const BossAI = () => {
  return (
    <Card title={"Boss Restoration"}>
      <CardColumn>
        <HelperText>
          Revert balance changes that have been made over time for Worlds
          Collide
        </HelperText>
        <FlagSwitch
          flag="-cmd"
          invert
          helperText="Chadarnook will spend less time in demon form"
          label="Chadarnook Less Demon"
        />
        <FlagSwitch
          flag="-dgne"
          invert
          helperText="Doom gaze will escape during the fight"
          label=" Doom Gaze Escapes"
        />

        {/* <FlagSwitch
          flag="-bmkl"
          helperText="Marshal will always accompanied by 2x Lobo"
          label="Marshal Minions are Lobos"
        /> */}

        <FlagSwitch
          flag="-mmnu"
          invert
          helperText="MagiMaster will cast Ultima on death"
          label="MagiMaster Casts Ultima on Death"
        />

        <FlagSwitch
          flag="-wnz"
          invert
          helperText="Wrexsoul will cast Zinger throughout the battle"
          label="Wrexsoul Casts Zinger"
        />
      </CardColumn>
    </Card>
  );
};
