import { cva } from "cva";

export type PageContainerProps = {
  children: React.ReactNode;
  gutters?: boolean;
};

const pageStyles = cva(["WC-page flex flex-col gap-8 items-center h-full"], {
  variants: {
    gutters: {
      true: ["px-4", "justify-around"],
      false: [],
    },
  },
  defaultVariants: {
    gutters: true,
  },
});

export const PageContainer = ({
  children,
  gutters = true,
}: PageContainerProps) => {
  return <main className={pageStyles({ gutters })}>{children}</main>;
};
