import { Card } from "@ff6wc/ui";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import PaletteSelect, {
  PaletteSelectOption,
} from "~/components/PaletteSelect/PaletteSelect";
import { PaletteSwatch } from "~/components/PaletteSwatch/PaletteSwatch";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";

export type LoadPalettesResponse = {
  id: string;
  key: string;
  palette: number[][];
}[];

export type CharacterSpritesProps = {
  palettes: LoadPalettesResponse;
};

const defaultPaletteString = "0.1.2.3.4.5.6";

export const SpritePalettes = ({
  palettes: paletteDefs = [],
}: CharacterSpritesProps) => {
  const dispatch = useDispatch();

  const rawPaletteString =
    useFlagValueSelector<string>("-cpal") ?? defaultPaletteString;

  const paletteValues = rawPaletteString
    .split(".")
    .map((val) => Number.parseInt(val));

  const paletteOptions: PaletteSelectOption[] = useMemo(
    () =>
      paletteDefs.map<PaletteSelectOption>(({ id, key, palette }) => ({
        label: key,
        value: id.toString(),
        color: palette,
      })),
    [paletteDefs]
  );

  const palettesById = paletteOptions.reduce((acc, spriteDef) => {
    acc[spriteDef.value] = spriteDef;
    return acc;
  }, {} as Record<string, PaletteSelectOption>);

  const paletteIter = Array.from(new Array(6));

  return (
    <Card title={"Character Sprites"}>
      <CardColumn>
        {paletteIter.map((_val, idx) => {
          const paletteColors = palettesById[paletteValues[idx]]?.color ?? [];
          return (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-12 flex-grow min-w-full">
                <FlagLabel
                  flag="-cpal"
                  helperText=""
                  label={`Palette ${idx}`}
                />
                <PaletteSelect
                  onChange={(val) => {
                    if (val) {
                      const paletteValuesBak = [...paletteValues];
                      paletteValuesBak.splice(
                        idx,
                        1,
                        Number.parseInt(val.value)
                      );
                      dispatch(
                        setFlag({
                          flag: "-cpal",
                          value: paletteValuesBak.join("."),
                        })
                      );
                    }
                  }}
                  options={paletteOptions}
                  value={palettesById[paletteValues[idx]]}
                />
              </div>
              <div>{<PaletteSwatch colors={paletteColors} />}</div>
            </React.Fragment>
          );
        })}
      </CardColumn>
    </Card>
  );
};
