import React from "react";
import { LayoutGroup } from "./layout";
import { cx } from "cva";

type Props = {
  children: React.ReactNode;
  group: LayoutGroup;
};

export const TrackerGroup: React.FC<Props> = (props) => {
  const { children, group } = props;
  const [groupName, className] = group.args;
  const targetId = `group-${groupName}-container`;
  React.useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      if (document.getElementById(targetId) === e.target) {
        e.preventDefault();
      }
    });
  }, [targetId]);
  return (
    <div
      className={cx(`group-${groupName}`, "flex w-fit flex-nowrap")}
      id={targetId}
    >
      {children}
    </div>
  );
};

export default TrackerGroup;
