import { cva, cx, VariantProps } from "cva";
import { useEffect, useRef } from "react";
import { draw_rgb, scale_rgb } from "~/utils/rgbUtils";

const width = 16;
const height = 24;

const styles = cva(["inline"], {
  variants: {
    scale: {
      1: ["min-w-[16px] min-h-[24px]"],
      2: ["min-w-[32px] min-h-[48px]"],
      3: ["min-w-[48px] min-h-[72px]"],
      4: ["min-w-[64px] min-h-[96px]"],
      5: ["min-w-[80px] min-h-[120px]"],
    },
  },
});

export type SpriteDrawProps = VariantProps<typeof styles> & {
  alphaBytes: number[];
  className?: string;
  onClick?: () => void;
  rgbBytes: number[];
  variant?: "full" | "half";
};

export const SpriteDraw = ({
  alphaBytes,
  className,
  onClick,
  rgbBytes,
  scale = 3,
  variant = "full",
}: SpriteDrawProps) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !rgbBytes.length) {
      return;
    }

    const scaled_rgb_data = scale_rgb(rgbBytes, scale as number, width, height);

    draw_rgb(
      scaled_rgb_data,
      alphaBytes,
      canvas.getContext("2d", { willReadFrequently: true }),
      width * (scale as number),
      height * (scale as number)
    );
  }, [alphaBytes, ref, rgbBytes, scale, variant]);

  return (
    <canvas
      className={styles({ className, scale })}
      onClick={onClick}
      ref={ref}
      width={width * (scale as number)}
      height={height * (scale as number)}
    />
  );
};
