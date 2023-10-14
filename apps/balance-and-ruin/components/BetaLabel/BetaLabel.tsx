export type BetaLabelProps = {
  children: React.ReactNode;
};

export const BetaLabel = ({ children }: BetaLabelProps) => {
  return <span className="text-yellow-500">{children}</span>;
};
