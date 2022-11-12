import React, { useEffect, useRef } from "react";
import { Tile } from "../data/Tile";

type Props = {
  proportion?: number;
  tiles: Array<Tile>;
};

const DrawSprite: React.FC<Props> = (props: Props) => {
  const { tiles, proportion = 1 } = props;
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const context = ref.current.getContext("2d");

    if (!context) {
      return;
    }

    let row = 0;
    let col = 0;
    const PIXELS_PER_ROW = 8 * proportion;
    const PIXELS_PER_COLUMN = 8 * proportion;

    const getXOffset = () => col * PIXELS_PER_ROW;
    const getYOffset = () => row * PIXELS_PER_COLUMN;
    tiles.forEach((tile, tiledx) => {
      tile.map.forEach((cell, idx) => {
        const fillStyle = tile.palette.colors[cell.value];
        context.fillStyle = fillStyle.toCss();
        context.fillRect(
          cell.x * proportion + getXOffset(),
          cell.y * proportion + getYOffset(),
          Math.floor(proportion),
          Math.floor(proportion)
        );
      });
      col += 1;
      if (col > 1) {
        col = 0;
        row += 1;
      }
    });
    row += 1;
  }, [tiles]);
  return <canvas ref={ref} width={16 * proportion} height={24 * proportion} />;
};

export default DrawSprite;
