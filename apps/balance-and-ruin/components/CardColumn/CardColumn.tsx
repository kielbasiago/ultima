export type CardColumnProps = {
  children: React.ReactNode;
};

export const CardColumn = ({ children }: CardColumnProps) => {
  return <div className={"flex flex-col gap-2"}>{children}</div>;
};
