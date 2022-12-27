export type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <main className="WC-Page dark:bg-slate-800 flex flex-col justify-center items-center p-4 flex-grow">
      {children}
    </main>
  );
};
