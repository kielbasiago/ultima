import { Card } from "@ff6wc/ui";
import { Column } from "~/components/Column/Column";
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

const levelScalingOptions: SubflagOption[] = [
  {
    flag: "-lsa",
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
    flag: "-lsh",
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
    flag: "-lsce",
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
    flag: "-lsced",
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
    flag: "-lsc",
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
    flag: "-lst",
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
    flag: "-hma",
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
    flag: "-hmh",
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
    flag: "-hmh",
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
    flag: "-hmh",
    Renderable: ({ children }) => (
      <FlagSlider
        {...subflagScalingProps}
        helperText=""
        flag="-hmh"
        label={children}
      />
    ),
  },
];

export const Scaling = () => {
  return (
    <Card title={"Scaling"}>
      <Column>
        <FlagSubflagSelect
          label="Level Scaling"
          nullableDescription="Enemy and boss levels are not scaled"
          nullableLabel="None"
          options={levelScalingOptions}
        />

        <FlagSubflagSelect
          label="HP/MP Scaling"
          nullableDescription="Enemy and boss hp/mp are not scaled"
          nullableLabel="None"
          options={levelScalingOptions}
        />
      </Column>
    </Card>
  );
};
