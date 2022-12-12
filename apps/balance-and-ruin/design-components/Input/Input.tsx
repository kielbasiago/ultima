import { cva, cx } from "cva";
import React from "react";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const styles = cva("", {
  variants: {
    variant: {
      default: [
        "focus-visible:shadow-input-focus focus-visible:border-inputs-focus focus-visible:outline-none",
        "border-inputs-border border-1",
        "bg-inputs-background",
        "px-2 py-1",
        "text-sm",
      ],
    },
    disabled: {
      true: "select-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, ...rest }: InputProps, ref) => {
    return (
      <input
        {...rest}
        className={cx(styles({ disabled }), className)}
        disabled={disabled}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";
