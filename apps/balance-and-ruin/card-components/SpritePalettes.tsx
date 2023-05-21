import { Button, Card } from "@ff6wc/ui";
import orderBy from "lodash/orderBy";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import PaletteSelect, {
  PaletteSelectOption,
} from "~/components/PaletteSelect/PaletteSelect";
import { PaletteSwatch } from "~/components/PaletteSwatch/PaletteSwatch";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import sampleSize from "lodash/sampleSize";
import { Divider } from "@ff6wc/ui/Divider/Divider";

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

  const basePaletteOptions: PaletteSelectOption[] = useMemo(
    () =>
      paletteDefs.map<PaletteSelectOption>(({ id, key, palette }) => ({
        label: key,
        value: id.toString(),
        color: palette,
      })),
    [paletteDefs]
  );

  const original = useMemo(
    () => basePaletteOptions.slice(0, 7),
    [basePaletteOptions]
  );
  const others = useMemo(
    () =>
      orderBy(
        basePaletteOptions.slice(7, basePaletteOptions.length),
        (o) => o.label
      ),
    [basePaletteOptions]
  );

  const paletteOptions = useMemo(
    () => [...original, ...others],
    [original, others]
  );

  const palettesById = paletteOptions.reduce((acc, spriteDef) => {
    acc[spriteDef.value] = spriteDef;
    return acc;
  }, {} as Record<string, PaletteSelectOption>);

  const paletteIter = Array.from(new Array(7));

  const randomize = () => {
    const pal = sampleSize(
      paletteDefs.map(({ id }) => id),
      paletteIter.length
    );

    dispatch(
      setFlag({
        flag: "-cpal",
        value: pal.join("."),
      })
    );
  };

  const restoreDefault = () => {
    dispatch(
      setFlag({
        flag: "-cpal",
        value: defaultPaletteString,
      })
    );
  }
  return (
    <Card title={"Sprite Palettes"}>
      <CardColumn>
        <span className="inline-flex gap-2 flex-wrap">
          <Button
            disabled={!paletteDefs.length}
            onClick={randomize}
            variant="primary"
          >
            Randomize Palettes
          </Button>
          <Button
            onClick={restoreDefault}
            variant="primary"
          >
            Default
          </Button>
        </span>
        {paletteIter.map((_val, idx) => {
          const paletteColors = palettesById[paletteValues[idx]]?.color ?? [];
          return (
            <React.Fragment key={idx}>
              {idx ? <Divider /> : null}
              <div className="flex items-center gap-12 flex-grow min-w-full">
                <FlagLabel
                  flag="-cpal"
                  helperText=""
                  label={`Palette ${idx}`}
                />
                <div className="w-full">
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
              </div>
              <div>{<PaletteSwatch colors={paletteColors} />}</div>
            </React.Fragment>
          );
        })}
      </CardColumn>
    </Card>
  );
};
