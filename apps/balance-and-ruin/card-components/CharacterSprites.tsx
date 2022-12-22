import { characterNames } from "@ff6wc/ff6-types";
import { Button, Card, Input } from "@ff6wc/ui";
import { useDispatch } from "react-redux";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import {
  CharacterGraphicSelector,
  LoadPalettesResponse,
  LoadSpritesResponse,
} from "~/components/CharacterGraphicSelector/CharacterGraphicSelector";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import sampleSize from "lodash/sampleSize";
import {
  defaultPaletteString,
  defaultPortraitString,
  defaultSpriteString,
} from "~/constants/graphicConstants";

export type CharacterSpritesProps = {
  palettes: LoadPalettesResponse;
  portraits: LoadSpritesResponse;
  sprites: LoadSpritesResponse;
};

export const CharacterSprites = ({
  palettes: paletteDefs = [],
  portraits: portraitDefs = [],
  sprites: spriteDefs = [],
}: CharacterSpritesProps) => {
  const dispatch = useDispatch();

  const paletteValues =
    useFlagValueSelector<string>("-cpal") ?? defaultPaletteString;

  const portraitValues =
    useFlagValueSelector<string>("-cpor") ?? defaultPortraitString;

  const spriteValue =
    useFlagValueSelector<string>("-cspr") ?? defaultSpriteString;

  const randomizeSprites = () => {
    const characterSprites = sampleSize(
      spriteDefs.map(({ id }) => id),
      14
    );

    const sprites =
      spriteValue?.split(".").map((i) => Number.parseInt(i)) || [];

    sprites?.splice(0, 14, ...characterSprites);
    dispatch(
      setFlag({
        flag: "-cspr",
        value: sprites.join("."),
      })
    );
  };

  const randomizePortraits = () => {
    const characterPortraits = sampleSize(
      portraitDefs.map(({ id }) => id),
      14
    );

    const sprites =
      portraitValues?.split(".").map((i) => Number.parseInt(i)) || [];

    sprites?.splice(0, 14, ...characterPortraits);
    dispatch(
      setFlag({
        flag: "-cpor",
        value: sprites.join("."),
      })
    );
  };

  return (
    <Card title={"Character Sprites"}>
      <CardColumn>
        <span className="inline-flex gap-2 flex-wrap">
          <Button
            disabled={!portraitDefs.length}
            onClick={randomizePortraits}
            variant="primary"
          >
            Randomize Portraits
          </Button>
          <Button
            disabled={!spriteDefs.length}
            onClick={randomizeSprites}
            variant="primary"
          >
            Randomize Sprites
          </Button>
        </span>
        {characterNames.map((character, idx) => {
          return (
            <CharacterGraphicSelector
              key={character}
              id={idx}
              Label={
                <Input
                  defaultValue={characterNames[idx].toUpperCase()}
                  disabled
                />
              }
              paletteOptionCount={5}
              palettes={paletteDefs}
              portraitId={idx}
              portraits={portraitDefs}
              sprites={spriteDefs}
            />
          );
        })}
      </CardColumn>
    </Card>
  );
};
