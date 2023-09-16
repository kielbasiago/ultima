import { cva, VariantProps } from "cva";

const styles = cva(["font-normal bg-transparent w-fit"], {
  variants: {
    variant: {
      danger: ["text-red-600"],
      warning: ["text-yellow-500"],
      success: ["text-green-500"],
      default: ["text-zinc-400"],
    },
    emphasis: {
      true: ["dark:bg-zinc-800 px-4 py-4"],
      false: ["px-2"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type BadgeTextProps = React.PropsWithChildren &
  VariantProps<typeof styles>;

export const BadgeText = ({ children, emphasis, variant }: BadgeTextProps) => {
  return <div className={styles({ emphasis, variant })}>{children}</div>;
};
