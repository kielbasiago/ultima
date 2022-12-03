import { cva, VariantProps } from "cva";

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const b = cva([], {
  variants: {
    variant: {
      default: [
        "px-4 py-1",
        // "bg-button-bg",
        "border-1 border-button-border",
        "font-extrabold",
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
  variant,
  ...props
}: Props & VariantProps<typeof b>) => {
  return (
    <button {...props} className={b({ variant })}>
      {children}
    </button>
  );
};
