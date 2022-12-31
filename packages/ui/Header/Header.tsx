import { Button, buttonStyles } from "../Button/Button";
import Link from "next/link";
import Image from "next/image";
import { cx } from "cva";

export type HeaderProps = {
  buttons?: React.ReactNode;
  className?: string;
};

export const Header = ({ buttons = null, className }: HeaderProps) => {
  return (
    <nav
      className={cx(
        className,
        "relative flex flex-col w-full min-h-fit justify-center items-center text-white text-xs shadow-lg"
      )}
    >
      <div className={"z-20"}>
        <Link href="/">
          <Image
            alt="Final Fantasy VI: Worlds Collide"
            src="/thumbnaillogowhite.png"
            height={526 / 4}
            width={1356 / 4}
          />
        </Link>
      </div>
      <div className="flex flex-col p-3 z-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3">
          <Link
            className={buttonStyles({
              className: "max-w-[500px]",
              variant: "outline",
              p: "default",
            })}
            href="https://discord.gg/5MPeng5"
            target="_blank"
          >
            <Image
              alt="Join our Discord community"
              src="/discordwhite.svg"
              width={155}
              height={40}
            />
          </Link>
          {buttons}
        </div>
      </div>
      <div className="WC-hero absolute top-0 bottom-0 left-0 right-0 bg-[url('/hero.png')] opacity-80 brightness-75 bg-no-repeat bg-cover bg-center z-0"></div>
    </nav>
  );
};
