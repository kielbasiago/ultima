import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSubflagSelect } from "~/components/FlagSubflagSelect/FlagSubflagSelect";

const AUTO_SPRINT = {
  defaultValue: "as",
  flag: "-move",
  helperText: "Always sprint, and hold B to walk. Sprint Shoes have no effect",
  label: "Auto Sprint",
  isStatic: true,
};

const msOptions = [
  {
    defaultValue: "og",
    flag: "-move",
    helperText:
      "Walk by default. When the active party is wearing Sprint Shoes, the party will sprint.",
    label: "Original",
    isStatic: true,
  },
  AUTO_SPRINT,
  {
    defaultValue: "bd",
    flag: "-move",
    helperText:
      "Always sprint, and hold B to dash at 2x speed (Doesn't work in Owzer's Mansion)",
    label: "B-Dash",
    isStatic: true,
  },
  {
    defaultValue: "ssbd",
    flag: "-move",
    helperText:
      "Always sprint, and when the active party is wearing Sprint Shoes dash at 2x speed when holding down the B button",
    label: "Sprint Shoes B-Dash",
    isStatic: true,
  },
];
export const Movement = () => {
  return (
    <Card title={"Movement"}>
      <CardColumn>
        <FlagSubflagSelect
          defaultSelected={AUTO_SPRINT}
          label="Movement"
          options={msOptions}
        />
      </CardColumn>
    </Card>
  );
};
