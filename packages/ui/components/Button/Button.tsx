import { cva, VariantProps } from "cva";

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

type Props = {
  children: React.ReactNode;
};

export const Button = ({
  children,
  ...props
}: Props & VariantProps<typeof b>) => {
  return <button className={b({ ...props })}>{children}</button>;
};
