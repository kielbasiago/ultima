import { cx } from "cva";

export type PageColumnProps = {
  children: React.ReactNode;
  className?: string;
};

export const PageColumn = ({ children, className }: PageColumnProps) => {
  return (
    <div
      className={cx(
        "WC-PageColumn",
        className,
        "col-span-8 lg:col-span-4 inline-block h-fit w-full"
      )}
    >
      {children}
    </div>
  );
};
