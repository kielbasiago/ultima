export type BetaLabelProps = {
  children: React.ReactNode;
};

export const BetaLabel = ({ children }: BetaLabelProps) => {
  return <div className="text-yellow-500">{children}</div>;
};
