import { Card, Input } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import SpriteDrawLoad from "~/components/SpriteDrawLoad/SpriteDrawLoad";
import { characterNames, characterPalettes } from "@ff6wc/ff6-types";
import SpriteSelect, {
  SpriteSelectOption,
} from "~/components/SpriteSelect/SpriteSelect";
import { useId, useMemo } from "react";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import { useDispatch } from "react-redux";

import BaseSelect from "react-select";
import { FlagSelectOption } from "~/components/FlagSelectOption/FlagSelectOption";

export type LoadPalettesResponse = {
  id: string;
  key: string;
  palette: number[][];
}[];

export type SpriteItem = { id: number; key: string };

export type LoadSpritesResponse = SpriteItem[];

export type CharacterSpritesProps = {
  sprites: LoadSpritesResponse;
  palettes: LoadPalettesResponse;
};

const defaultSpriteString = "0.1.2.3.4.5.6.7.8.9.10.11.12.13.14.15.18.19.20.21";
const defaultPaletteString = "2.1.4.4.0.0.0.3.3.4.5.3.3.5.1.0.6.1.0.3";
const defaultPaletteValuesString = "0.1.2.3.4.5.6";

export const CharacterSprites = ({
  palettes: paletteDefs = [],
  sprites: spriteDefs = [],
}: CharacterSpritesProps) => {
  const dispatch = useDispatch();
  const selectId = useId();
  const rawSpriteString =
    useFlagValueSelector<string>("-cspr") ?? defaultSpriteString;

  const rawPaletteString =
    useFlagValueSelector<string>("-cspp") ?? defaultPaletteString;

  const rawPaletteValuesString =
    useFlagValueSelector<string>("-cpal") ?? defaultPaletteValuesString;

  // -cspr values
  const spriteValues = rawSpriteString
    .split(".")
    .map((val) => Number.parseInt(val));

  // -cspp values
  const characterPaletteValues = rawPaletteString
    .split(".")
    .map((val) => Number.parseInt(val));

  // -cpal values
  const paletteValues = rawPaletteValuesString
    .split(".")
    .map((val) => Number.parseInt(val));

  const spriteOptions: SpriteSelectOption[] = useMemo(
    () =>
      spriteDefs.map<SpriteSelectOption>(({ id, key }) => ({
        label: key,
        value: id.toString(),
      })),
    [spriteDefs]
  );

  const characterPaletteOptions: SpriteSelectOption[] = useMemo(
    () =>
      paletteDefs.map<SpriteSelectOption>(({ id, key }) => ({
        label: key,
        value: id.toString(),
      })),
    [paletteDefs]
  );

  const spritesById = spriteOptions.reduce((acc, spriteDef) => {
    acc[spriteDef.value] = spriteDef;
    return acc;
  }, {} as Record<string, SpriteSelectOption>);

  // const characterPalettesById = characterPaletteOptions.reduce((acc, spriteDef) => {
  //   acc[spriteDef.value] = spriteDef;
  //   return acc;
  // }, {} as Record<string, SpriteSelectOption>);

  const paletteOptions: SpriteSelectOption[] = Array.from(new Array(6)).map(
    (_val, idx) => ({
      label: `Palette ${idx}`,
      value: idx.toString(),
    })
  );

  const palettesById = paletteOptions.reduce((acc, spriteDef) => {
    acc[spriteDef.value] = spriteDef;
    return acc;
  }, {} as Record<string, SpriteSelectOption>);

  return (
    <Card title={"Character Sprites"}>
      <CardColumn>
        {characterNames.map((character, idx) => {
          return (
            <div className="flex gap-8" key={idx}>
              {/* input + sprite */}
              <div className="flex flex-col gap-3 items-center">
                <Input defaultValue={characterNames[idx].toUpperCase()} />
                <div>
                  <SpriteDrawLoad
                    paletteId={paletteValues[characterPaletteValues[idx]]}
                    poseId={1}
                    spriteId={spriteValues[idx]}
                  />
                </div>
              </div>
              {/* Selects */}
              <div className="flex flex-col gap-3 flex-grow">
                <SpriteSelect
                  onChange={(val) => {
                    if (val) {
                      const spriteValuesBak = [...spriteValues];
                      spriteValuesBak.splice(
                        idx,
                        1,
                        Number.parseInt(val.value)
                      );
                      dispatch(
                        setFlag({
                          flag: "-cspr",
                          value: spriteValuesBak.join("."),
                        })
                      );
                    }
                  }}
                  options={spriteOptions}
                  value={spritesById[spriteValues[idx]]}
                />

                <BaseSelect
                  className="ff6wc-select-container"
                  classNamePrefix="ff6wc-select"
                  components={{ Option: FlagSelectOption }}
                  instanceId={selectId}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  options={paletteOptions}
                  onChange={(val) => {
                    if (val) {
                      const paletteValuesBak = [...characterPaletteValues];
                      paletteValuesBak.splice(
                        idx,
                        1,
                        Number.parseInt(val.value)
                      );
                      dispatch(
                        setFlag({
                          flag: "-cspp",
                          value: paletteValuesBak.join("."),
                        })
                      );
                    }
                  }}
                  value={palettesById[characterPaletteValues[idx]]}
                />
                {/* 
              <SpriteSelect
                onChange={(val) => {
                  if (val) {
                    const paletteValuesBak = [...characterPaletteValues];
                    paletteValuesBak.splice(idx, 1, Number.parseInt(val.value));
                    dispatch(
                      setFlag({
                        flag: "-cspp",
                        value: paletteValuesBak.join("."),
                      })
                    );
                  }
                }}
                options={characterPaletteOptions}
                value={palettesById[paletteValues[idx]]}
              /> */}
              </div>
            </div>
          );
        })}
      </CardColumn>
    </Card>
  );
};
