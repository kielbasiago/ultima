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

export const SpriteDrawRandom = () => {
  const { data } = useRandomSprite();
  const { palette_id, pose_id, sprite_id } = data ?? {};

  const showSprite =
    Number.isFinite(palette_id) &&
    Number.isFinite(pose_id) &&
    Number.isFinite(sprite_id);

  return !showSprite ? null : (
    <SpriteDrawLoad
      paletteId={palette_id as number}
      poseId={pose_id as number}
      spriteId={sprite_id as number}
      scale={2}
      variant={"half"}
    />
  );
};
