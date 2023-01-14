import { cx } from "cva";
import React, { useEffect } from "react";
import SpriteDrawLoad from "~/components/SpriteDrawLoad/SpriteDrawLoad";

type Props = {
  className?: string;
  paletteId: number;
  scale?: number;
  spriteId: number;

  poses: number[];
  delay: number;
};

export const SpriteDrawAnimation = ({
  delay,
  paletteId,
  spriteId,
  scale,
  poses,
}: Props) => {
  const [toggle, setToggle] = React.useState<number>(0);

  useEffect(() => {
    let internalToggle = toggle;
    internalToggle += 1;
    setToggle(internalToggle % poses.length);
    const token = setInterval(() => {
      internalToggle += 1;
      setToggle(internalToggle % poses.length);
    }, delay);

    return () => {
      clearInterval(token);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(poses)]);

  return (
    <span className={"min-h-[48px]"}>
      {poses.map((poseid, idx) => (
        <React.Fragment key={idx}>
          <SpriteDrawLoad
            className={toggle !== idx ? "hidden" : ""}
            key={poseid}
            poseId={poseid}
            spriteId={spriteId}
            paletteId={paletteId}
            scale={scale}
          />
        </React.Fragment>
      ))}
    </span>
  );
};
