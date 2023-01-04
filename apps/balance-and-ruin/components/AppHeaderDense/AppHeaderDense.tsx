import { ButtonLink, DiscordButton, Header } from "@ff6wc/ui";
import useSWR from "swr";
import { WIKI_URL } from "~/../../packages/utils/constants";
import SpriteDrawLoad from "~/components/SpriteDrawLoad/SpriteDrawLoad";
import { HiPencil } from "react-icons/hi";

export type AppHeaderProps = Record<string, unknown>;

type RandomPayload = {
  sprite_id: number;
  palette_id: number;
  pose_id: number;
};

const useRandomSprite = () => {
  return useSWR<RandomPayload>(["/api/sprite/random"], async () => {
    const response = await fetch("/api/sprite/random");
    const data = await response.json();
    return data;
  });
};

export const AppHeaderDense = (props: AppHeaderProps) => {
  const { data } = useRandomSprite();
  const { palette_id, pose_id, sprite_id } = data ?? {};
  const showSprite =
    Number.isFinite(palette_id) &&
    Number.isFinite(pose_id) &&
    Number.isFinite(sprite_id);

  return (
    <div className="min-h-[48px] md:min-h-[64px] p-2 sticky w-full">
      Hello world{" "}
    </div>
  );
};
