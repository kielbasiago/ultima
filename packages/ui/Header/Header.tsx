import { Button } from "../Button/Button";
import Link from "next/link";
import Image from "next/image";

export type HeaderProps = Record<string, unknown>;

export const Header = ({}: HeaderProps) => {
  return (
    <nav className="relative flex flex-col w-full min-h-[200px] justify-center items-center text-white text-xs shadow-lg">
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
      <div className="flex flex-col p-3 z-10 gap-3">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Link
            className={`max-w-[500px]`}
            href="https://discord.gg/5MPeng5"
            target="_blank"
          >
            <Button variant="default" className={"bg-white"}>
              <Image
                alt="Join our Discord community"
                src="/discordblack.png"
                width={125}
                height={55}
              />
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-[url('/hero.png')] opacity-80 brightness-75 bg-no-repeat bg-cover bg-center z-0"></div>
    </nav>
  );
};
