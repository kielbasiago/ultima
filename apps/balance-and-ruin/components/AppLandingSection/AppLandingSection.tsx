import { openSans } from "@ff6wc/utils/fonts";
import { cx } from "cva";

type Props = {
  title: React.ReactNode;
  children: React.ReactNode;
};
export const AppLandingSection = ({ children, title }: Props) => {
  return (
    <div className="w-full items-center flex flex-col bg-gray-800">
      <span className="w-full text-center bg-gray-600">
        <h2
          className={cx(
            openSans.className,
            "main-header-text",
            "text-4xl lg:text-6xl p-3"
          )}
        >
          {title}
        </h2>
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-gray-500">
        {children}
      </div>
    </div>
  );
};
