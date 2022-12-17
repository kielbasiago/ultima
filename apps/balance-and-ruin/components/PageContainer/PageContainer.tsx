export type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="flex flex-row justify-center flex-wrap gap-6">
      {children}
    </div>
  );
};
