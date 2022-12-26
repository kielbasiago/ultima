import Image from "next/image";
import Link from "next/link";
import { Button } from "~/design-components";

export type DisclaimerProps = Record<string, unknown>;

export const Header = ({}: DisclaimerProps) => {
  return (
    <div className="relative flex flex-col w-full min-h-[200px] justify-center items-center text-white text-xs shadow-lg">
      <div className="flex flex-col p-3 z-10 gap-3">
        <Link href="/">
          <Image
            alt="Final Fantasy VI: Worlds Collide"
            src="/thumbnaillogoblack.png"
            height={526 / 5}
            width={1356 / 5}
          />
        </Link>

        <div className="flex justify-center">
          <Link href="https://discord.gg/5MPeng5" target="_blank">
            <Button variant="default" className={"bg-white"}>
              <Image
                alt="Join our Discord community"
                src="/discord.svg"
                width={100}
                height={50}
              />
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-[url('/hero.png')] opacity-60 bg-no-repeat bg-cover bg-center z-0"></div>
    </div>
  );
};
