import React from "react";
import useSWRImmutable from "swr/immutable";
import { SpriteDraw } from "~/components/SpriteDraw/SpriteDraw";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export type LoadSpriteResponse = {
  palette: number[][];
  sprite: number[];
};

type SpriteDrawLoadProps = {
  paletteId: number;
  poseId: number;
  scale?: number;
  spriteId: number;
};

export default function SpriteDrawLoad({
  paletteId,
  poseId,
  scale = 3,
  spriteId,
}: SpriteDrawLoadProps) {
  const { data, error } = useSWRImmutable<LoadSpriteResponse>(
    `/api/sprite/${spriteId}/${paletteId}/${poseId}`,
    fetcher
  );

  const { alphaBytes, rgbBytes } = React.useMemo(() => {
    if (!data) {
      return {
        alphaBytes: [],
        rgbBytes: [],
      };
    }
    const { palette = [], sprite = [] } = data;

    const alphaBytes = palette[0];
    const rgbBytes = sprite.map((i) => palette[i]).flat();

    return { alphaBytes, rgbBytes };
  }, [data]);

  const SpriteRender = (
    <SpriteDraw alphaBytes={alphaBytes} rgbBytes={rgbBytes} scale={scale} />
  );

  return <>{SpriteRender}</>;
}
