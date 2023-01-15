import { ButtonLink, DiscordButton, Header } from "@ff6wc/ui";
import { HiPencil } from "react-icons/hi";
import { WIKI_URL } from "@ff6wc/utils/constants";
import { SotwButton } from "~/components/SotwButton/SotwButton";

export type AppHeaderProps = Record<string, unknown>;

export const AppHeader = (props: AppHeaderProps) => {
  return (
    <div>
      <Header className={"flex"}>
        {/* <div className="flex gap-3 flex-wrap justify-center"></div> */}
      </Header>
      <div className=".WC-nav flex flex-wrap justify-center items-center gap-4 p-5 bg-zinc-800">
        <SotwButton />
        <DiscordButton />
        <ButtonLink
          className="w-fit min-h-[70px]"
          href={WIKI_URL}
          variant="primary"
        >
          <HiPencil size="36" />
          Wiki
        </ButtonLink>
      </div>
    </div>
  );
};
