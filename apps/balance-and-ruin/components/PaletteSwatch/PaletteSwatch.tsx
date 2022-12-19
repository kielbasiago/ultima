import chroma from "chroma-js";
import { useEffect, useRef } from "react";

export type PaletteSwatchProps = {
  colors: number[][];
};

const height = 18;
const width = 18;
const paletteCount = 16;

export const PaletteSwatch = ({ colors }: PaletteSwatchProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const context = canvas?.current?.getContext("2d", {
      willReadFrequently: true,
    });
    if (!context) {
      return;
    }
    let currentWidth = 0;
    colors.forEach(([r, g, b]) => {
      const color = chroma(r, g, b);
      context.fillStyle = color.hex();
      context?.fillRect(currentWidth, 0, width, height);
      currentWidth += width;
    });
  }, [colors]);
  return (
    <canvas
      className={"inline"}
      height={height}
      width={width * paletteCount}
      ref={canvas}
    />
  );
};
