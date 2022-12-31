import { Link } from "../Link/Link";
import { montserrat } from "@ff6wc/utils/fonts";
import { buttonStyles } from "../Button/Button";

export const ButtonLink = ({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) => {
  return (
    <Link
      className={buttonStyles({
        className: `${montserrat.className} ${
          className ?? ""
        } inline-flex flex-row items-center justify-center gap-2 text-lg font-extrabold`,
        disabled: false,
        p: "default",
        variant: "outline",
      })}
      href={href}
    >
      {children}
    </Link>
  );
};
