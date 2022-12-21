import { cx } from "cva";
import { useEffect, useRef } from "react";
import { draw_rgb, scale_rgb } from "~/utils/rgbUtils";

export type SpriteDrawProps = {
  alphaBytes: number[];
  className?: string;
  onClick?: () => void;
  rgbBytes: number[];
  scale: number;
};

const width = 16;
const height = 24;

export const SpriteDraw = ({
  alphaBytes,
  className,
  onClick,
  rgbBytes,
  scale = 3,
}: SpriteDrawProps) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) {
      return;
    }

    const scaled_rgb_data = scale_rgb(rgbBytes, scale, width, height);

    draw_rgb(
      scaled_rgb_data,
      alphaBytes,
      canvas.getContext("2d", { willReadFrequently: true }),
      width * scale,
      height * scale
    );
  }, [alphaBytes, ref, rgbBytes, scale]);

  return (
    <canvas
      className={cx(className, "inline")}
      onClick={onClick}
      ref={ref}
      width={width * scale}
      height={height * scale}
    />
  );
};
