export type PageColumnProps = {
  children: React.ReactNode;
};

export const PageColumn = ({ children }: PageColumnProps) => {
  return (
    <div className="flex flex-col gap-6 basis-4 flex-grow flex-shrink-0 min-w-fit">
      {children}
    </div>
  );
};
