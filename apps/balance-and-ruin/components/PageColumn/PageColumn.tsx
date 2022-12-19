export type PageColumnProps = {
  children: React.ReactNode;
};

export const PageColumn = ({ children }: PageColumnProps) => {
  return <div className="block basis-0 flex-grow flex-shrink">{children}</div>;
};
