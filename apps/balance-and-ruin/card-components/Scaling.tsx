import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const subflagScalingProps = {
  // we dont need a secondary label. The descriptions will be short and accurate.
  defaultValue: 2,
  label: "",
};

const averagePartyScaling = {
  defaultValue: 1,
  label: "Party Average Level",
};

const highestPartyScaling = {
  defaultValue: 1,
  label: "Party Highest Level",
};

const levelScalingOptions: SubflagOption[] = [
  {
    defaultValue: 1,
    flag: "-lsa",
    helperText: "Enemy and boss levels equal to {{ . }}x party average level",
    label: "Party Average Level",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-lsa"
        label={children}
      />
    ),
  },
  {
    defaultValue: 1,
    flag: "-lsh",
    helperText:
      "Enemy and boss levels equal to {{ . }}x highest level in party",
    label: "Party Highest Level",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-lsh"
        label={children}
      />
    ),
  },
  {
    defaultValue: 2,
    flag: "-lsce",
    helperText:
      "Enemies and bosses gain {{ . }} levels for each character recruited and esper acquired",
    label: "Characters + Espers",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-lsce"
        label={children}
      />
    ),
  },
  {
    defaultValue: 2,
    flag: "-lsced",
    helperText:
      "Enemies and bosses gain {{ . }} levels for each character recruited, esper acquired, and dragon defeated",
    label: "Characters + Espers + Dragons",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-lsced"
        label={children}
      />
    ),
  },
  {
    defaultValue: 2,
    flag: "-lsc",
    helperText:
      "Enemies and bosses gain {{ . }} levels for each check completed",
    label: "Checks",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-lsc"
        label={children}
      />
    ),
  },
  {
    defaultValue: 2,
    flag: "-lst",
    helperText: "Enemies and bosses gain 1 level every {{ . }} minutes",
    label: "Time",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-lst"
        label={children}
      />
    ),
  },
];

const hpMpScalingOptions: SubflagOption[] = [
  {
    defaultValue: 1,
    label: "Party Average Level",
    flag: "-hma",
    helperText: "Enemy and boss hp/mp scales {{ . }}x party average level",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-hma"
        label={children}
      />
    ),
  },
  {
    defaultValue: 1,
    flag: "-hmh",
    helperText: "Enemy and boss hp/mp scales {{ . }}x highest level in party",
    label: "Party Highest Level",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-hmh"
        label={children}
      />
    ),
  },
  {
    defaultValue: 2,
    flag: "-hmce",
    helperText:
      "Enemy and boss hp/mp scales {{ . }}x each character recruited and esper acquired",
    label: "Characters + Espers",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-hmce"
        label={children}
      />
    ),
  },
  {
    defaultValue: 2,
    flag: "-hmced",
    helperText:
      "Enemy and boss hp/mp scales {{ . }}x each character recruited, esper acquired, and dragon defeated",
    label: "Characters + Espers + Dragons",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-hmced"
        label={children}
      />
    ),
  },
  {
    defaultValue: 2,
    flag: "-hmc",
    helperText: "Enemy and boss hp/mp scales {{ . }}x each check completed",
    label: "Checks",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-hmc"
        label={children}
      />
    ),
  },
  {
    defaultValue: 2,
    flag: "-hmt",
    helperText: "Enemy and boss hp/mp scales every {{ . }}x minutes",
    label: "Time",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-hmt"
        label={children}
      />
    ),
  },
];

const expGpScalingOptions: SubflagOption[] = [
  {
    defaultValue: 1,
    label: "Party Average Level",
    flag: "-xga",
    helperText: "Enemy and boss exp/gp scales {{ . }}x party average level",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-xga"
        label={children}
      />
    ),
  },
  {
    defaultValue: 1,
    flag: "-xgh",
    helperText: "Enemy and boss exp/gp scales {{ . }}x highest level in party",
    label: "Party Highest Level",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-xgh"
        label={children}
      />
    ),
  },
  {
    defaultValue: 2,
    flag: "-xgce",
    helperText:
      "Enemy and boss exp/gp scales {{ . }}x each character recruited and esper acquired",
    label: "Characters + Espers",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-xgce"
        label={children}
      />
    ),
  },
  {
    defaultValue: 2,
    flag: "-xgced",
    helperText:
      "Enemy and boss exp/gp scales {{ . }}x each character recruited, esper acquired, and dragon defeated",
    label: "Characters + Espers + Dragons",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-xgced"
        label={children}
      />
    ),
  },
  {
    defaultValue: 2,
    flag: "-xgc",
    helperText: "Enemy and boss exp/gp scales {{ . }}x each check completed",
    label: "Checks",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-xgc"
        label={children}
      />
    ),
  },
  {
    defaultValue: 2,
    flag: "-xgt",
    helperText: "Enemy and boss exp/gp scales every {{ . }}x minutes",
    label: "Time",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-xgt"
        label={children}
      />
    ),
  },
];

const abilityScalingOptions: SubflagOption[] = [
  {
    flag: "ase",
    defaultValue: 2,
    helperText: "",
    label: "",
  },
];

export const Scaling = () => {
  return (
    <Card title={"Scaling"}>
      <CardColumn>
        <FlagSubflagSelect
          label="Level Scaling"
          nullable={{
            description: "Enemy and boss levels are not scaled",
            label: "None",
          }}
          options={levelScalingOptions}
        />

        <FlagSubflagSelect
          label="HP/MP Scaling"
          nullable={{
            description: "Enemy and boss hp/mp are not scaled",
            label: "None",
          }}
          options={hpMpScalingOptions}
        />

        <FlagSubflagSelect
          label="Exp/GP Scaling"
          nullable={{
            description: "Enemy and boss exp/gp are not scaled",
            label: "None",
          }}
          options={expGpScalingOptions}
        />

        <FlagSlider flag={"-msl"} label={"Max Scale Level"} />
      </CardColumn>
    </Card>
  );
};
