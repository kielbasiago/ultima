import { Link } from "../Link/Link";
import Image from "next/image";
import { buttonStyles } from "../Button/Button";
import { DISCORD_URL } from "@ff6wc/utils/constants";
import { cva } from "cva";

const button = cva(["max-w-[500px] min-h-[70px] inline-flex"]);
export const DiscordButton = ({}: {}) => {
  return (
    <Link
      className={buttonStyles({
        className: button(),
        variant: "discord",
      })}
      href={DISCORD_URL}
      target="_blank"
    >
      <Image
        alt="Join our Discord community"
        src="/discordwhite.svg"
        width={155}
        height={60}
      />
    </Link>
  );
};
