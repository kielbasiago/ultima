import React from "react";
import { useTrackerContext } from "./TrackerProvider";
import { cx } from "cva";

// const url = (str: string) => urljoin("https://kielbasa.s3.us-east-2.amazonaws.com/autotracker/images", `${str}.png`);

export function RenderCell(
  key: string,
  renderable: React.ReactNode,
  displayName: string,
  className: string,
  containerClassName: string,
  adornment: React.ReactNode,
  opts?: {
    min?: number;
    max?: number;
    value?: number;
  }
): JSX.Element {
  const { onClick, onRightClick } = useTrackerContext();

  const [mouseDownTarget, setMouseDownTarget] =
    React.useState<EventTarget | null>(null);

  const containerRef = React.useRef<HTMLSpanElement | null>(null);
  const id = `cell-${key}`;

  const targetId = `${id}-target`;

  React.useEffect(() => {
    const callback = (e: MouseEvent) => {
      if (document.getElementById(targetId) === e.target) {
        e.preventDefault?.();
      }
    };
    document.addEventListener("contextmenu", callback);
  }, [targetId]);

  if (!key) {
    return <></>;
  }

  const onMouseDown: React.MouseEventHandler = (e) => {
    setMouseDownTarget(e.target);
  };
  const onMouseUp: React.MouseEventHandler = (e) => {
    if ((!mouseDownTarget && e.target) || e.target === mouseDownTarget) {
      // value sdescribed here: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value
      if (e.button === 0) {
        onClick(key);
      } else if (e.button === 2) {
        onRightClick(key);
        e.preventDefault?.();
      }
      setMouseDownTarget(null);
    }
  };

  const onWheel: React.WheelEventHandler = (e) => {
    const isUp = e.deltaY < 0;
    const isDown = e.deltaY > 0;
    const v =
      typeof opts?.value === "number"
        ? opts?.value
        : opts?.value === true
        ? 1
        : 0;
    if (opts && v === opts?.max && isUp) {
      return;
    }
    if (opts && v === opts?.min && isDown) {
      return;
    }

    const event: React.MouseEvent = {
      ...e,
      button: e.deltaY < 0 ? 0 : 2,
      target: e.target as EventTarget,
    };

    onMouseUp(event);
  };

  return (
    <>
      <span
        ref={containerRef}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onWheel={onWheel}
        className={cx("relative", containerClassName)}
      >
        {renderable}
        {adornment ? adornment : null}
        <div className="overlay" id={targetId}></div>
      </span>
    </>
  );
}
