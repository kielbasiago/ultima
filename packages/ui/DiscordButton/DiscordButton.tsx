import { Link } from "../Link/Link";
import Image from "next/image";
import { buttonStyles } from "../Button/Button";
import { DISCORD_URL } from "@ff6wc/utils/constants";

export const DiscordButton = () => {
  return (
    <Link
      className={buttonStyles({
        className: "max-w-[500px] min-h-[70px] inline-flex",
        variant: "outline",
        p: "default",
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
