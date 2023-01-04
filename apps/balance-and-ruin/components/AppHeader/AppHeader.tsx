import { ButtonLink, DiscordButton, Header } from "@ff6wc/ui";
import { HiPencil } from "react-icons/hi";
import { WIKI_URL } from "~/../../packages/utils/constants";
import { SpriteDrawRandom } from "~/components/SpriteDrawRandom/SpriteDrawRandom";

export type AppHeaderProps = Record<string, unknown>;

export const AppHeader = (props: AppHeaderProps) => {
  return (
    <div>
      <Header className={"flex"}>
        {/* <div className="flex gap-3 flex-wrap justify-center"></div> */}
      </Header>
      <div className=".WC-nav flex flex-wrap justify-center items-center gap-4 p-5 bg-zinc-800">
        <ButtonLink className="w-fit" href="/sotw" variant="primary">
          <SpriteDrawRandom />
          <div>
            <div>Seed of the Week</div>
          </div>
        </ButtonLink>
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
