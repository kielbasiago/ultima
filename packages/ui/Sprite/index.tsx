import { testData } from "./test";

export type SpriteProps = {
  /** raw byte array for the sprite. includes palette colors? */
  data: number[] | null;
};

const Sprite = ({ data }: SpriteProps): JSX.Element => {
  return <>{JSON.stringify(data || testData)}</>;
};

export default Sprite;
export * from "./CharacterSprite";
