import { cva, VariantProps } from "cva";

export type PageContainerProps = {
  children: React.ReactNode;
} & VariantProps<typeof styles>;

const styles = cva(["columns-1 gap-6"], {
  variants: {
    columns: {
      1: "",
      2: "md:columns-1 lg:columns-2",
      3: "md:columns-2 xl:columns-3",
      // 2: "md:grid-cols-3 lg:grid-cols-6",
      // 3: "md:grid-cols-6 lg:grid-cols-12",
    },
  },
});

export const PageContainer = ({ children, columns }: PageContainerProps) => {
  return <div className={styles({ columns: columns })}>{children}</div>;
};
