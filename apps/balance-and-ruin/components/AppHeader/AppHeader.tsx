import { ButtonLink, DiscordButton, Header } from "@ff6wc/ui";
import { HiPencil } from "react-icons/hi";
import { WIKI_URL } from "~/../../packages/utils/constants";
import { SpriteDrawRandom } from "~/components/SpriteDrawRandom/SpriteDrawRandom";
import { SpriteDrawRandomOriginal } from "~/components/SpriteDrawRandomOriginal/SpriteDrawRandomOriginal";

export type AppHeaderProps = Record<string, unknown>;

export const AppHeader = (props: AppHeaderProps) => {
  return (
    <div>
      <Header className={"flex"}>
        {/* <div className="flex gap-3 flex-wrap justify-center"></div> */}
      </Header>
      <div className=".WC-nav flex flex-wrap justify-center items-center gap-4 p-5 bg-zinc-800">
        <ButtonLink
          className="w-fit min-h-[70px]"
          href="/sotw"
          variant="primary"
        >
          <SpriteDrawRandomOriginal />
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
