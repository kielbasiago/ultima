export type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <main className="WC-Page WC-page flex flex-col items-center p-12 pt-0 h-full">
      {children}
    </main>
  );
};
