import { cva, VariantProps } from "cva";

export type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof styles>;

const styles = cva(["m-auto"], {
  defaultVariants: {
    columns: 1,
  },
  variants: {
    columns: {
      1: ["columns-1", "max-w-full lg:max-w-[1260px]", "p-5"],
      2: ["columns-1 md:columns-1 lg:columns-2 lg:max-w-[1260px]", "p-5"],
      3: ["columns-1 md:columns-2 xl:columns-3 max-w-full", "p-5"],
      null: [],
    },
  },
});

export const PageContainer = ({
  children,
  className,
  columns,
}: PageContainerProps) => {
  return <div className={styles({ columns, className })}>{children}</div>;
};
