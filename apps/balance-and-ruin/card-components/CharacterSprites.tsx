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
  defaultCharacterNameString,
  defaultPaletteString,
  defaultPortraitString,
  defaultSpriteString,
  defaultSpritePaletteString,
} from "~/constants/graphicConstants";
import { CharacterNameInput } from "~/components/CharacterNameInput/CharacterNameInput";

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
      .slice(0, 14);

  const defaultSprites = 
    defaultSpriteString
    .split(".")
    .map((val) => Number.parseInt(val))
    .slice(0, 14);

  const defaultSpritePalettes = 
    defaultSpritePaletteString
    .split(".")
    .map((val) => Number.parseInt(val))
    .slice(0, 14);

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

  const restoreDefault = () => {
    //default sprites
    const sprites =
      spriteValue?.split(".").map((i) => Number.parseInt(i)) || [];
    sprites?.splice(0, 14, ...defaultSprites);
    dispatch(
      setFlag({
        flag: "-cspr",
        value: sprites.join("."),
      })
    );

    //default portraits
    const portraits = 
      portraitValues?.split(".").map((i) => Number.parseInt(i)) || [];
    portraits?.splice(0, 14, ...defaultPortraits);
    dispatch(
      setFlag({
        flag: "-cpor",
        value: portraits.join("."),
      })
    );

    //default sprite palettes
    const spritePalettes = 
      spritePaletteValues?.split(".").map((i) => Number.parseInt(i)) || [];
      spritePalettes?.splice(0, 14, ...defaultSpritePalettes);
    dispatch(
      setFlag({
        flag: "-cspp",
        value: spritePalettes.join("."),
      })
    );

    //default names
    dispatch(
      setFlag({
        flag: "-name",
        value: defaultCharacterNameString,
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
          <Button
            onClick={restoreDefault}
            variant="primary"
          >
            Default
          </Button>
        </span>
        {characterNames.map((character, idx) => {
          return (
            <CharacterGraphicSelector
              key={character}
              id={idx}
              Label={<CharacterNameInput characterId={idx} />}
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
