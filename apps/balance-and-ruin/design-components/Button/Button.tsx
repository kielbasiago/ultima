import { cva, cx, VariantProps } from "cva";

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const b = cva(["px-2 py-1", "text-base", "rounded-none", "transition-all"], {
  variants: {
    disabled: {
      true: "opacity-40 cursor-not-allowed",
    },
    variant: {
      default: [
        "bg-none",
        "border-white hover:border-primary-300 active:border-primary",
        "focus-visible:outline-2 focus-visible:outline-blue-300",
      ],
      primary: [
        "bg-blue-700 text-white",
        "border-blue-300 active:border-blue-500",
        "focus-visible:border-blue-300 focus-visible:outline-2",
      ],
      outline: [
        "focus-visible:shadow-input-focus focus-visible:border-inputs-focus focus-visible:outline-none",
        "border-inputs-border border-1",
        "bg-inputs-background",

        "border-1 border-inputs-border",
        "bg-inputs-background",
        "outline-transparent",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type Props = BaseButtonProps & {
  children: React.ReactNode;
};

export const Button = ({
  children,
  className,
  disabled,
  variant,
  ...props
}: Props & VariantProps<typeof b>) => {
  return (
    <button {...props} className={cx(className, b({ disabled, variant }))}>
      {children}
    </button>
  );
};
