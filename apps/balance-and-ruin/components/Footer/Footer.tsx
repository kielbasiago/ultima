import BaseLink from "next/link";

export type FooterProps = {};

const secondaryText =
  "Final Fantasy VI: Worlds Collide is an unofficial fan project not affiliated in any way with Square Enix";

export const Footer = ({}: FooterProps) => {
  const primaryText = "Created by AtmaTek and maintained by the community";
  return (
    <div className="flex flex-col gap-2 w-full min-h-[75px] justify-center items-center bg-gray-600 text-white text-xs">
      <p>{primaryText}</p>
      <p>{secondaryText}</p>
    </div>
  );
};

type LinkProps = {
  children: React.ReactNode;
  href: string;
};

const Link = ({ children, href }: LinkProps) => (
  <BaseLink className="underline" href={href} target="_blank">
    {children}
  </BaseLink>
);

export const MusicFooter = ({}: FooterProps) => {
  const primaryText = (
    <p>
      Thanks to&nbsp;
      <Link href="https://github.com/emberling">emberling</Link>&nbsp;for the
      support!
    </p>
  );
  return (
    <div className="flex flex-col gap-2 w-full min-h-[75px] justify-center items-center bg-gray-600 text-white text-xs">
      <p>{primaryText}</p>
      <p>{secondaryText}</p>
    </div>
  );
};
