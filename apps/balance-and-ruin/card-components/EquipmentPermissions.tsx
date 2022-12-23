import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const equipableOptions: SubflagOption[] = [
  {
    defaultValue: [1, 14],
    flag: "-ier",
    helperText: "Each item is equipable by {{.}} random characters",
    label: "Random",
    Renderable: ({ children }) => (
      <FlagRange label={children} flag="-ier" helperText="" />
    ),
  },
  {
    defaultValue: 33,
    flag: "-ieor",
    helperText:
      "Characters have a {{.}}% chance of being able to equip each item they could not previously equip",
    label: "Original + Random",
    Renderable: ({ children }) => (
      <FlagSlider label={children} flag="-ieor" helperText="" />
    ),
  },
  {
    defaultValue: 33,
    flag: "-iesr",
    helperText:
      "Shuffle character equipment permissions. After randomization, characters have a {{.}}% chance of being able to equip each item they could not previously equip",
    label: "Shuffle + Random",
    Renderable: ({ children }) => (
      <FlagSlider label={children} flag="-iesr" helperText="" />
    ),
  },
  {
    defaultValue: 7,
    flag: "-iebr",
    helperText:
      "Each item is equipable by {{.}} random characters. Total number of items equipable for each character is balanced",
    label: "Balanced Random",
    Renderable: ({ children }) => (
      <FlagSlider label={children} flag="-iebr" helperText="" />
    ),
  },
];

const equipableRelicOptions: SubflagOption[] = [
  {
    defaultValue: [14, 14],
    flag: "-ierr",
    helperText: "Each relic is equipable by {{.}} random characters",
    label: "Random",
    Renderable: ({ children }) => (
      <FlagRange label={children} flag="-ierr" helperText="" />
    ),
  },
  {
    defaultValue: 33,
    flag: "-ieror",
    helperText:
      "Characters have a {{.}}% chance of being able to equip each relic they could not previously equip",
    label: "Original + Random",
    Renderable: ({ children }) => (
      <FlagSlider label={children} flag="-ieror" helperText="" />
    ),
  },
  {
    defaultValue: 33,
    flag: "-iersr",
    helperText:
      "Shuffle character relic permissions. After randomization, characters have a {{.}}% chance of being able to equip each relic they could not previously equip",
    label: "Shuffle + Random",
    Renderable: ({ children }) => (
      <FlagSlider label={children} flag="-iersr" helperText="" />
    ),
  },
  {
    defaultValue: 7,
    flag: "-ierbr",
    helperText:
      "Each relic is equipable by {{.}} random characters. Total number of relics equipable for each character is balanced",
    label: "Balanced Random",
    Renderable: ({ children }) => (
      <FlagSlider label={children} flag="-ierbr" helperText="" />
    ),
  },
];

export const EquipmentPermissions = () => {
  return (
    <Card title={"Equipable Items"}>
      <CardColumn>
        <FlagSubflagSelect
          label="Equipment"
          options={equipableOptions}
          nullable={{
            description: "Equipment permissions are unchanged",
            label: "Original",
          }}
        />

        <FlagSubflagSelect
          label="Relics"
          options={equipableRelicOptions}
          nullable={{
            description: "Relic permissions are unchanged",
            label: "Original",
          }}
        />

        <FlagSwitch flag="-mca" label="Moogle Charms All" />
      </CardColumn>
    </Card>
  );
};
