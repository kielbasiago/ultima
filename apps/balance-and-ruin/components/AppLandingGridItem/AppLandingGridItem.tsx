import { openSans } from "~/pages/_app";
import { cx } from "cva";

type Props = {
  title: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};
export const AppLandingGridItem = ({ children, className, title }: Props) => {
  return (
    <div
      className={cx(
        "h-full w-full items-center mb-3 flex flex-col px-4 py-2 bg-gray-800 mx-auto",
        className
      )}
    >
      <h2
        className={cx(
          openSans.className,
          "py-2",
          "main-header-text",
          "text-3xl lg:text-4xl"
        )}
      >
        {title}
      </h2>
      <div className="h-full flex flex-col items-center justify-between lg:max-w-[75%]">
        {children}
      </div>
    </div>
  );
};
