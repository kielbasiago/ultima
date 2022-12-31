import { Button, ButtonProps, buttonStyles, Header } from "@ff6wc/ui";
import { montserrat, robotoMono } from "@ff6wc/utils/fonts";
import { cx } from "cva";
import Link from "next/link";

export type AppHeaderProps = Record<string, unknown>;

const disabled = false;
const ButtonLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      className={buttonStyles({
        className: `${montserrat.className} flex flex-col items-center text-lg font-extrabold`,
        disabled: false,
        p: "default",
        variant: "outline",
      })}
      href="href"
    >
      {children}
    </Link>
  );
};
export const TempestHeader = (props: AppHeaderProps) => {
  const buttons = (
    <>
      <ButtonLink href="/auto">Auto</ButtonLink>
      <ButtonLink href="/manual">Manual</ButtonLink>
    </>
  );
  return (
    <div className={montserrat.className}>
      <Header buttons={buttons} />
    </div>
  );
};
