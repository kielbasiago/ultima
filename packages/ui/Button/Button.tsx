import { cva, cx, VariantProps } from "cva";

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export const buttonStyles = cva(
  ["WC-button", "text-base", "rounded-none", "transition-all"],
  {
    variants: {
      disabled: {
        true: "opacity-40 cursor-not-allowed",
      },
      size: {
        default: ["px-4", "py-2"],
        small: ["px-2", "py-1", "text-s"],
        smallest: ["p-0"],
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
        danger: [
          "bg-red-700 text-white",
          "hover:bg-red-800",
          "active:bg-red-900",
          "border-red-300 active:border-red-500",
          "focus-visible:border-red-300 focus-visible:outline-2",
        ],
        discord: [
          "bg-discord text-white",
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
      size: "default",
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
  size,
  variant,
  ...props
}: ButtonProps & VariantProps<typeof buttonStyles>) => {
  return (
    <button
      {...props}
      className={cx(
        "WC-button",
        className,
        buttonStyles({ disabled, size, variant })
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
