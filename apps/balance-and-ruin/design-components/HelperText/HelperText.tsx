export type HelperTextProps = {
  children: React.ReactNode;
};

export const HelperText = ({ children }: HelperTextProps) => {
  return <span className="text-xs text-slate-500">{children}</span>;
};
