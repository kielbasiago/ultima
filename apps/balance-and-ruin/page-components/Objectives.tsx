import {
  CharacterSprites,
  type CharacterSpritesProps,
} from "~/card-components/CharacterSprites";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import useSWR from "swr";
import { SpritePalettes } from "~/card-components/SpritePalettes";
import { OtherSprites } from "~/card-components/OtherSprites";

export const Graphics = () => {
  const { data } = useSWR<CharacterSpritesProps>(["/api/sprites"], async () => {
    const response = await fetch("/api/sprites");
    const result = await response.json();
    return result as CharacterSpritesProps;
  });

  const { palettes = [], portraits = [], sprites = [] } = data || {};

  return (
    <PageContainer>
      <PageColumn>
        <CharacterSprites
          palettes={palettes}
          portraits={portraits}
          sprites={sprites}
        />
      </PageColumn>
    </PageContainer>
  );
};
