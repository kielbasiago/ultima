import Image from "next/image";
import Link from "next/link";

export type DisclaimerProps = Record<string, unknown>;

export const Header = ({}: DisclaimerProps) => {
  return (
    <div className="flex flex-col w-full min-h-[75px] justify-center items-center text-white text-xs shadow-lg">
      <div className="p-3">
        <Link href="/">
          <Image
            alt="Final Fantasy VI: Worlds Collide"
            src="/thumbnaillogoblack.png"
            height={526 / 5}
            width={1356 / 5}
          />
        </Link>
      </div>
    </div>
  );
};
