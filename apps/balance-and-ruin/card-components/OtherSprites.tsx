import { Button, Card } from "@ff6wc/ui";
import sampleSize from "lodash/sampleSize";
import React from "react";
import { useDispatch } from "react-redux";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { CharacterGraphicSelector } from "~/components/CharacterGraphicSelector/CharacterGraphicSelector";
import { defaultSpriteString } from "~/constants/graphicConstants";
import { Divider } from "~/design-components/Divider/Divider";
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
  const spriteValue =
    useFlagValueSelector<string>("-cspr") ?? defaultSpriteString;
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
