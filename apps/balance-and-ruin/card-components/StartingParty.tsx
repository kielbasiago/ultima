import {
  characterNames,
  CHARACTER_POSES,
  FF6Character,
} from "@ff6wc/ff6-types";
import { Card } from "@ff6wc/ui";
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
import {
  defaultCharacterNameString,
  defaultPaletteString,
  defaultSpritePaletteString,
  defaultSpriteString,
} from "~/constants/graphicConstants";
import { Divider } from "~/design-components/Divider/Divider";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";

type SelectOption = BaseOption & {
  poseId?: number;
};

const RANDOM = "random";
const RANDOM_NGU = "randomngu";
const NONE = "none";

const [randomOption, randomnguOption, noneOption]: SelectOption[] = [
  { value: RANDOM, label: "Random" },
  { value: RANDOM_NGU, label: "Random (No Gogo/Umaro)" },
  { value: NONE, label: "None" },
];

const randomValues = [RANDOM, RANDOM_NGU];

const useCharacterNames = () => {
  const rawNames = (
    useFlagValueSelector<string>("-name") ?? defaultCharacterNameString
  ).split(".");
  const actualNames = defaultCharacterNameString.split(".");

  return characterNames.map((name, characterId) => {
    const regularName = startCase(actualNames[characterId].toLowerCase());
    if (actualNames[characterId] === rawNames[characterId]) {
      return regularName;
    }

    return `${rawNames[characterId]} (${regularName})`;
  });
};

const useOptions = () => {
  const customCharacterNames = useCharacterNames();

  return useMemo(() => {
    const options = [
      randomOption,
      randomnguOption,
      noneOption,
      ...characterNames.map(
        (characterName, idx) =>
          ({
            value: characterName,
            poseId: 1,
            label: customCharacterNames[idx],
          } as SelectOption)
      ),
    ];
    const optionsById = options.reduce((acc, val) => {
      return { ...acc, [val.value]: val };
    }, {} as Record<string, SelectOption>);

    return { options, optionsById };
  }, [customCharacterNames]);
};

const useAllStartingPartyValues = (): Record<string, string> => {
  const sc1 = useFlagValueSelector<string>("-sc1") ?? NONE;
  const sc2 = useFlagValueSelector<string>("-sc2") ?? NONE;
  const sc3 = useFlagValueSelector<string>("-sc3") ?? NONE;
  const sc4 = useFlagValueSelector<string>("-sc4") ?? NONE;

  return {
    "-sc1": sc1,
    "-sc2": sc2,
    "-sc3": sc3,
    "-sc4": sc4,
  };
};

const usePartyOption = (flag: string) => {
  const { optionsById } = useOptions();
  const value = useFlagValueSelector<string>(flag) ?? "-unknown";
  const option = optionsById[value];
  return option;
};

const useSpriteId = (characterId: number) => {
  const rawSprites =
    useFlagValueSelector<string>("-cspr") ?? defaultSpriteString;

  if (characterId === -1) {
    return -1;
  }
  return (
    rawSprites.split(".").map((val) => Number.parseInt(val))[characterId] ?? -1
  );
};

const useSpritePaletteId = (characterId: number) => {
  const rawPalettes =
    useFlagValueSelector<string>("-cpal") ?? defaultPaletteString;

  const rawSpritePalettes =
    useFlagValueSelector<string>("-cspp") ?? defaultSpritePaletteString;

  const spritePalette = rawSpritePalettes
    .split(".")
    .map((val) => Number.parseInt(val))[characterId];
  const paletteId = rawPalettes.split(".").map((val) => Number.parseInt(val))[
    spritePalette
  ];
  return paletteId;
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
  const isNgu = characterValue === RANDOM_NGU;

  const characterIdx = characterNames.indexOf(value?.value as FF6Character);
  const poseId = value?.poseId ?? 1;
  const rawSpriteId = useSpriteId(characterIdx);
  const spriteId = useMemo(
    () => (isNgu ? random(0, 11) : isRandom ? random(0, 13) : rawSpriteId),
    [isNgu, isRandom, rawSpriteId]
  );

  const showSprite = spriteId !== -1;
  const colorSprite = characterIdx !== -1;
  const paletteId = useSpritePaletteId(colorSprite ? characterIdx : 0);

  return (
    <components.Control
      {...props}
      selectProps={selectProps}
      className={"WC-SelectPartyControl pl-4"}
    >
      {showSprite ? (
        <span className="relative">
          <SpriteDrawLoad
            className={colorSprite ? undefined : "brightness-0"}
            spriteId={spriteId}
            paletteId={paletteId}
            poseId={poseId}
            scale={3}
          />

          {!colorSprite ? (
            <span className="absolute flex top-0 bottom-0 left-0 right-0 items-center justify-center text-3xl">
              ?
            </span>
          ) : null}
        </span>
      ) : null}
      {children}
    </components.Control>
  );
};

const partyComponents = {
  Control: SelectPartyControl,
};

const partySelectProps = {
  className: "ff6wc-party-select",
  components: partyComponents,
  defaultValue: noneOption,
};

export const StartingParty = () => {
  const dispatch = useDispatch();

  const { options } = useOptions();

  const values = useAllStartingPartyValues();

  const sc1Option = usePartyOption("-sc1");
  const sc2Option = usePartyOption("-sc2");
  const sc3Option = usePartyOption("-sc3");
  const sc4Option = usePartyOption("-sc4");

  const filterData: Record<string, string[]> = {
    "-sc1": ["-sc2", "-sc3", "-sc4"],
    "-sc2": ["-sc1", "-sc3", "-sc4"],
    "-sc3": ["-sc1", "-sc2", "-sc4"],
    "-sc4": ["-sc1", "-sc2", "-sc3"],
  };

  const filterOptions = (flag: string, options: SelectOption[]) => {
    const exclude = filterData[flag]
      .map((flag) => values[flag])
      .filter((val) => characterNames.includes(val as FF6Character));
    return options.filter(({ value }) => !exclude.includes(value));
  };

  const onChange = (flag: string) => (selected: SelectOption | null) => {
    if (selected?.value === NONE) {
      dispatch(
        setFlag({
          flag,
          value: null,
        })
      );
      return;
    }
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
          {...partySelectProps}
          onChange={onChange("-sc1")}
          options={filterOptions("-sc1", options)}
          value={sc1Option}
        />

        <Select
          {...partySelectProps}
          onChange={onChange("-sc2")}
          options={filterOptions("-sc2", options)}
          value={sc2Option}
        />

        <Select
          {...partySelectProps}
          onChange={onChange("-sc3")}
          options={filterOptions("-sc3", options)}
          value={sc3Option}
        />

        <Select
          {...partySelectProps}
          onChange={onChange("-sc4")}
          options={filterOptions("-sc4", options)}
          value={sc4Option}
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
