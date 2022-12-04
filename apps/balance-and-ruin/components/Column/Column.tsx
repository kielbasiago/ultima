export type ColumnProps = {
  children: React.ReactNode;
};

export const Column = ({ children }: ColumnProps) => {
  return <div className={"flex flex-col gap-2"}>{children}</div>;
};
