import React from "react";
import useSWRImmutable from "swr/immutable";
import { SpriteDraw } from "~/components/SpriteDraw/SpriteDraw";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export type LoadSpriteResponse = {
  palette: number[][];
  sprite: number[];
};

type SpriteDrawLoadProps = {
  className?: string;
  onClick?: () => void;
  paletteId: number;
  poseId: number;
  scale?: number;
  spriteId: number;
  variant?: "full" | "half";
};

export default function SpriteDrawLoad({
  className,
  onClick,
  paletteId,
  poseId,
  scale = 3,
  spriteId,
  variant = "full",
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

  return (
    <SpriteDraw
      alphaBytes={alphaBytes}
      className={className}
      onClick={onClick}
      rgbBytes={rgbBytes}
      scale={scale}
      variant={variant}
    />
  );
}
