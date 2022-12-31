import { cx } from "cva";
import BaseLink from "next/link";

type LinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: "_blank";
};

export const Link = ({ children, className, href, target }: LinkProps) => {
  const t = href.startsWith("https") ? "_blank" : undefined;
  return (
    <BaseLink className={cx("text-blue-400", className)} href={href} target={t}>
      {children}
    </BaseLink>
  );
};
