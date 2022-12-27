import React from "react";
import { cva } from "cva";

type Props = {
  children?: React.ReactNode;
  col?: boolean;
  justify?: "center" | "between";
};

const rowStyles = cva(["inline-flex"], {
  defaultVariants: {
    justify: "between",
  },
  variants: {
    justify: {
      center: ["justify-center"],
      between: ["justify-between"],
    },
  },
});

export const TrackerRow: React.FC<Props> = (props) => {
  const { children, justify, ...rest } = props;
  return (
    <div {...rest} className={rowStyles({ justify })}>
      {children}
    </div>
  );
};

export default TrackerRow;
