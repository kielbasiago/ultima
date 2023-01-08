import sample from "lodash/sample";
import { SpriteDrawRandom } from "~/components/SpriteDrawRandom/SpriteDrawRandom";

const validSprites = Array.from(Array(20)).map((_, idx) => idx);

export const SpriteDrawRandomOriginal = () => {
  const spriteId = sample(validSprites);
  return <SpriteDrawRandom spriteId={spriteId} />;
};
