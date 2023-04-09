import { Button, Card } from "@ff6wc/ui";
import sampleSize from "lodash/sampleSize";
import React from "react";
import { useDispatch } from "react-redux";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { CharacterGraphicSelector } from "~/components/CharacterGraphicSelector/CharacterGraphicSelector";
import { 
  defaultPortraitString,
  defaultSpriteString,
  defaultSpritePaletteString, 
} from "~/constants/graphicConstants";
import { Divider } from "@ff6wc/ui/Divider/Divider";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";

export type LoadPalettesResponse = {
  id: string;
  key: string;
  palette: number[][];
}[];

export type SpriteItem = { id: number; key: string };

export type LoadSpritesResponse = SpriteItem[];

export type CharacterSpritesProps = {
  palettes: LoadPalettesResponse;
  portraits: LoadSpritesResponse;
  sprites: LoadSpritesResponse;
};

const SOLDIER = 14;
const IMP = 15;
const ESPER_TERRA = 16;
const MERCHAN = 17;
const GHOST = 18;
const KEFKA = 19;

const names: Record<number, string> = {
  [SOLDIER]: "Soldier",
  [IMP]: "Imp",
  [ESPER_TERRA]: "Esper Terra",
  [MERCHAN]: "Merchant",
  [GHOST]: "Ghost",
  [KEFKA]: "Kefka",
};

const portraits: Record<number, number> = {
  [IMP]: 14,
};

const dudes = [SOLDIER, IMP, ESPER_TERRA, MERCHAN, GHOST, KEFKA];

export const OtherSprites = ({
  palettes: paletteDefs = [],
  portraits: portraitDefs = [],
  sprites: spriteDefs = [],
}: CharacterSpritesProps) => {
  const dispatch = useDispatch();

  const portraitValues =
    useFlagValueSelector<string>("-cpor") ?? defaultPortraitString;

  const spriteValue =
    useFlagValueSelector<string>("-cspr") ?? defaultSpriteString;

  const spritePaletteValues =
    useFlagValueSelector<string>("-cspp") ?? defaultSpritePaletteString;

  const defaultPortraits = 
    defaultPortraitString
      .split(".")
      .map((val) => Number.parseInt(val))
      .slice(14, 15); // just IMP

  const defaultSprites = 
    defaultSpriteString
    .split(".")
    .map((val) => Number.parseInt(val))
    .slice(14, 14+dudes.length);

  const defaultSpritePalettes = 
    defaultSpritePaletteString
    .split(".")
    .map((val) => Number.parseInt(val))
    .slice(14, 14+dudes.length);

  const randomize = () => {
    const characterSprites = sampleSize(
      spriteDefs.map(({ id }) => id),
      dudes.length
    );

    const sprites =
      spriteValue?.split(".").map((i) => Number.parseInt(i)) || [];

    sprites?.splice(14, dudes.length, ...characterSprites);
    dispatch(
      setFlag({
        flag: "-cspr",
        value: sprites.join("."),
      })
    );
  };

  const restoreDefault = () => {
    const sprites =
      spriteValue?.split(".").map((i) => Number.parseInt(i)) || [];

    sprites?.splice(14, dudes.length, ...defaultSprites);

    dispatch(
      setFlag({
        flag: "-cspr",
        value: sprites.join("."),
      })
    );

    const portraits = 
      portraitValues?.split(".").map((i) => Number.parseInt(i)) || [];

    portraits?.splice(14, 1, ...defaultPortraits);
    dispatch(
      setFlag({
        flag: "-cpor",
        value: portraits.join("."),
      })
    );

    const spritePalettes = 
      spritePaletteValues?.split(".").map((i) => Number.parseInt(i)) || [];

    spritePalettes?.splice(14, dudes.length, ...defaultSpritePalettes);
    dispatch(
      setFlag({
        flag: "-cspp",
        value: spritePalettes.join("."),
      })
    );
  };

  return (
    <Card title={"Other Sprites"}>
      <CardColumn>
        <span className="inline-flex gap-2 flex-wrap">
          <Button
            disabled={!spriteDefs.length}
            onClick={randomize}
            variant="primary"
          >
            Randomize Sprites
          </Button>
          <Button
            onClick={restoreDefault}
            variant="primary"
          >
            Default
          </Button>
        </span>

        {dudes.map((dude, idx) => (
          <React.Fragment key={dude}>
            {idx ? <Divider /> : null}
            <CharacterGraphicSelector
              key={dude}
              id={dude}
              Label={names[dude] ?? null}
              paletteOptionCount={6}
              palettes={paletteDefs}
              portraitId={portraits[dude] ?? null}
              portraits={portraitDefs}
              sprites={spriteDefs}
            />
          </React.Fragment>
        ))}
      </CardColumn>
    </Card>
  );
};
