import { cva, VariantProps } from "cva";

const styles = cva(["text-xs  whitespace-pre-wrap"], {
  variants: {
    variant: {
      success: ["text-green-600 dark:text-green-400"],
      default: ["text-slate-500 dark:text-gray-200"],
    },
    size: {
      default: ["text-xs"],
      normal: ["text-normal"],
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

export type HelperTextProps = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof styles>;

export const HelperText = ({ children, size, variant }: HelperTextProps) => {
  return <span className={styles({ size, variant })}>{children}</span>;
};
