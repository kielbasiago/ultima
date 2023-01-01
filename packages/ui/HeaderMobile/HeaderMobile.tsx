import { Link } from "../Link/Link";
import Image from "next/image";
import { cx } from "cva";

export type HeaderProps = {
  className?: string;
  children?: React.ReactNode;
};

export const HeaderMobile = ({ children = null, className }: HeaderProps) => {
  return (
    <nav
      className={cx(
        className,
        "WC-header relative flex flex-col w-full min-h-fit justify-center items-center text-white text-xs shadow-lg"
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
      <div className="flex flex-col p-3 z-10">{children}</div>
      <div className="WC-hero absolute top-0 bottom-0 left-0 right-0 bg-[url('/hero.png')] opacity-80 brightness-75 bg-no-repeat bg-cover bg-center z-0"></div>
    </nav>
  );
};
