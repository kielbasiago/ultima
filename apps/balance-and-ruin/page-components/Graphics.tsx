import {
  CharacterSprites,
  type CharacterSpritesProps,
} from "~/card-components/CharacterSprites";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import useSWR from "swr";
import { SpritePalettes } from "~/card-components/SpritePalettes";

export const Graphics = () => {
  const { data } = useSWR<CharacterSpritesProps>(["/api/sprites"], async () => {
    const response = await fetch("/api/sprites");
    const result = await response.json();
    return result as CharacterSpritesProps;
  });

  const { palettes = [], sprites = [] } = data || {};

  return (
    <PageContainer>
      <PageColumn>
        <SpritePalettes palettes={palettes} />
      </PageColumn>
      <PageColumn>
        <CharacterSprites palettes={palettes} sprites={sprites} />
      </PageColumn>
    </PageContainer>
  );
};
