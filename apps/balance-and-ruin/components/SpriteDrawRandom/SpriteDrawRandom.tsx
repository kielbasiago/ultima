import SpriteDrawLoad from "~/components/SpriteDrawLoad/SpriteDrawLoad";
import useSWR from "swr";

type RandomPayload = {
  sprite_id: number;
  palette_id: number;
  pose_id: number;
};

const useRandomSprite = () => {
  return useSWR<RandomPayload>(["/api/sprite/random"], async () => {
    const response = await fetch("/api/sprite/random");
    const data = await response.json();
    return data;
  });
};

type Props = {
  spriteId?: number;
  paletteId?: number;
  poseId?: number;
};

export const SpriteDrawRandom = ({ paletteId, poseId, spriteId }: Props) => {
  const { data } = useRandomSprite();
  const { palette_id, pose_id, sprite_id } = data ?? {};

  const sprite = spriteId ?? sprite_id;
  const palette = paletteId ?? palette_id;
  const pose = poseId ?? pose_id;

  const showSprite =
    Number.isFinite(sprite) &&
    Number.isFinite(palette) &&
    Number.isFinite(pose);

  return !showSprite ? (
    <span className="min-w-[32px] min-h-[48px]"></span>
  ) : (
    <SpriteDrawLoad
      paletteId={palette as number}
      poseId={pose as number}
      spriteId={sprite as number}
      scale={2}
      variant={"half"}
    />
  );
};
