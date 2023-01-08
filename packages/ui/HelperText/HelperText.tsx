export type HelperTextProps = {
  children: React.ReactNode;
  className?: string;
};

export const HelperText = ({ children }: HelperTextProps) => {
  return (
    <span className="text-xs text-slate-500 dark:text-gray-200 whitespace-pre-wrap">
      {children}
    </span>
  );
};
