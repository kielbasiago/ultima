import { cva } from "cva";
import React from "react";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const styles = cva("", {
  variants: {
    variant: {
      default: [
        "focus-visible:shadow-[0_0_0_3px_#33abff] focus-visible:outline-none",
        "border-inputs-border border-1",
        "bg-inputs-background",
        "px-2 py-1",
        "text-sm",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const Input = (props: InputProps) => {
  return <input {...props} className={styles()} />;
};
