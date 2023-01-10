import sample from "lodash/sample";
import { characterPalettes, otherPalettes } from "@ff6wc/ff6-types";
import { SpriteDrawRandom } from "~/components/SpriteDrawRandom/SpriteDrawRandom";

let validSprites = Array.from(Array(22)).map((_, idx) => idx);

const paletteIds = [...characterPalettes, ...otherPalettes];

export const SpriteDrawRandomOriginal = () => {
  const spriteId = sample(validSprites);
  const palette = paletteIds[spriteId as number];
  return <SpriteDrawRandom spriteId={spriteId} paletteId={palette} />;
};
