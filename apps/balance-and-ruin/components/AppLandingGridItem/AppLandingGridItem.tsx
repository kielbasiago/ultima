import { openSans } from "@ff6wc/utils/fonts";
import { cx } from "cva";

type Props = {
  title: React.ReactNode;
  children: React.ReactNode;
};
export const AppLandingGridItem = ({ children, title }: Props) => {
  return (
    <div className="w-full items-center flex flex-col px-4 py-2 bg-gray-800 mx-auto">
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
      <p className="lg:max-w-[75%]">{children}</p>
    </div>
  );
};
