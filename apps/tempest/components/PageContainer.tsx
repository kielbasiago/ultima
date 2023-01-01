export type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <main className="WC-Page WC-page flex flex-col gap-8 items-center px-4 h-full">
      {children}
    </main>
  );
};
