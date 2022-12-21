import {
  characterNames,
  CHARACTER_POSES,
  FF6Character,
} from "@ff6wc/ff6-types";
import { Card } from "@ff6wc/ui";
import sampleSize from "lodash/sampleSize";
import random from "lodash/random";
import startCase from "lodash/startCase";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  components,
  ControlProps,
  OptionProps,
  SingleValue,
} from "react-select";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import { Select, SelectOption as BaseOption } from "~/components/Select/Select";
import SpriteDrawLoad from "~/components/SpriteDrawLoad/SpriteDrawLoad";
import { Divider } from "~/design-components/Divider/Divider";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";

type SelectOption = BaseOption & {
  poseId?: number;
};

const RANDOM = "random";
const RANDOM_NGU = "randomngu";

const [randomOption, randomnguOption]: SelectOption[] = [
  { value: RANDOM, label: "Random" },
  { value: RANDOM_NGU, label: "Random (No Gogo/Umaro)" },
];

const randomValues = [RANDOM, RANDOM_NGU];

const options = [
  randomOption,
  randomnguOption,
  ...characterNames.map(
    (id) =>
      ({
        value: id,
        poseId: 1,
        label: startCase(id),
      } as SelectOption)
  ),
];

const optionsById = options.reduce((acc, val) => {
  return { ...acc, [val.value]: val };
}, {} as Record<string, SelectOption>);

const usePartyOption = (flag: string) => {
  const value = useFlagValueSelector<string>(flag) ?? "-unknown";
  const option = optionsById[value];
  return [value, option] as const;
};

export const SelectPartyOption = <T extends SelectOption>({
  children,
  data,
  ...rest
}: OptionProps<T, false>) => {
  const { label, value } = data;
  const characterIdx = characterNames.indexOf(value as FF6Character);

  const isRandom = randomValues.includes(value);

  return (
    <components.Option data={data} {...rest}>
      <span className="flex items-center">
        <span className={"min-h-[24px]"}>
          <SpriteDrawLoad
            className={
              randomValues.includes(value) ? "brightness-0" : undefined
            }
            spriteId={randomValues.includes(value) ? 1 : characterIdx}
            paletteId={2}
            poseId={1}
            scale={1}
          />
        </span>
        <span>{label}</span>
      </span>
    </components.Option>
  );
};

const SelectPartyControl = ({
  children,
  selectProps,
  ...props
}: ControlProps<SelectOption, false>) => {
  const value: SingleValue<SelectOption> =
    selectProps.value as unknown as SingleValue<SelectOption>;
  const characterValue = value?.value ?? "";

  const isRandom = randomValues.includes(characterValue);

  const cn = [...characterNames];
  const characterIdx = cn.indexOf(value?.value as FF6Character);
  const poseId = value?.poseId ?? 1;
  return (
    <components.Control
      {...props}
      selectProps={selectProps}
      className={"WC-SelectPartyControl pl-4 min-h-[100px]"}
    >
      <span>
        <SpriteDrawLoad
          className={isRandom ? "brightness-0" : undefined}
          spriteId={isRandom ? random(0, 13) : characterIdx}
          paletteId={2}
          poseId={poseId}
          scale={3}
        />
      </span>
      {children}
    </components.Control>
  );
};

const partyComponents = {
  Control: SelectPartyControl,
  // Option: SelectPartyOption,
};

export const StartingParty = () => {
  const dispatch = useDispatch();

  const [sc1Val, sc1Option] = usePartyOption("-sc1");
  const [sc2Val, sc2Option] = usePartyOption("-sc2");
  const [sc3Val, sc3Option] = usePartyOption("-sc3");
  const [sc4Val, sc4Option] = usePartyOption("-sc4");

  const poses = useMemo(() => {
    return sampleSize(CHARACTER_POSES, 4) as [number, number, number, number];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sc1Val, sc2Val, sc3Val, sc4Val]);

  const onChange = (flag: string) => (selected: SelectOption | null) => {
    dispatch(
      setFlag({
        flag,
        value: selected?.value!,
      })
    );
  };

  return (
    <Card title={"Starting Party"}>
      <div className="grid grid-cols-2 gap-4 ">
        <Select
          className={"ff6wc-party-select"}
          options={options}
          onChange={onChange("-sc1")}
          value={sc1Option}
          components={partyComponents}
        />

        <Select
          className={"ff6wc-party-select"}
          options={options}
          onChange={onChange("-sc2")}
          value={sc2Option}
          components={partyComponents}
        />

        <Select
          className={"ff6wc-party-select"}
          options={options}
          onChange={onChange("-sc3")}
          value={sc3Option}
          components={partyComponents}
        />

        <Select
          className={"ff6wc-party-select"}
          options={options}
          onChange={onChange("-sc4")}
          value={sc4Option}
          components={partyComponents}
        />
      </div>
      <Divider />

      <FlagSlider
        flag="-stl"
        helperText="Starting party begins the game at level {{ . }}"
        label="Starting Party Level"
      />
    </Card>
  );
};
