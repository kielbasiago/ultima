export type HelperTextProps = {
  children: React.ReactNode;
};

export const HelperText = ({ children }: HelperTextProps) => {
  return (
    <span className="text-xs text-slate-500 max-w-[500px]">{children}</span>
  );
};
