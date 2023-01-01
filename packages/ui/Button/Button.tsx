import { cva, cx, VariantProps } from "cva";

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export const buttonStyles = cva(
  ["text-base", "rounded-none", "transition-all"],
  {
    variants: {
      disabled: {
        true: "opacity-40 cursor-not-allowed",
      },
      p: {
        default: ["px-4", "py-2"],
        none: [],
      },
      variant: {
        default: [
          "bg-none",
          "border-white hover:border-primary-300 active:border-primary",
          "focus-visible:outline-2 focus-visible:outline-blue-300",
        ],
        primary: [
          "bg-blue-700 text-white",
          "hover:bg-blue-800",
          "active:bg-blue-900",
          "border-blue-300 active:border-blue-500",
          "focus-visible:border-blue-300 focus-visible:outline-2",
        ],
        outline: [
          "text-gray-700",
          "focus-visible:shadow-input-focus focus-visible:border-inputs-focus focus-visible:outline-none",
          "border-inputs-border border-1",
          "bg-transparent",

          "border-2 border-inputs-border",
          "outline-transparent",

          "dark:bg-transparent dark:border-white-500 dark:text-white dark:bg-black dark:bg-opacity-40",
        ],
      },
    },
    defaultVariants: {
      p: "default",
      variant: "default",
    },
  }
);

export type ButtonProps = BaseButtonProps & {
  children: React.ReactNode;
};

export const Button = ({
  children,
  className,
  disabled,
  p,
  variant,
  ...props
}: ButtonProps & VariantProps<typeof buttonStyles>) => {
  return (
    <button
      {...props}
      className={cx(
        "WC-button",
        className,
        buttonStyles({ disabled, p, variant })
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
