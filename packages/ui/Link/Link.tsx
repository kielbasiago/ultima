import { cva, cx, VariantProps } from "cva";
import BaseLink from "next/link";

type LinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: "_blank";
};

const linkStyles = cva([], {
  variants: {
    color: {
      blue: ["text-blue-400"],
      inherit: ["text-inherit"],
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

export const Link = ({
  children,
  className,
  color,
  href,
  target,
}: LinkProps & VariantProps<typeof linkStyles>) => {
  const t = href.startsWith("https") ? "_blank" : undefined;
  return (
    <BaseLink
      className={linkStyles({ color, className })}
      href={href}
      target={t}
    >
      {children}
    </BaseLink>
  );
};
