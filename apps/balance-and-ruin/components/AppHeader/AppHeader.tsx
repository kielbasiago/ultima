import { ButtonLink, DiscordButton, Header } from "@ff6wc/ui";
import useSWR from "swr";
import SpriteDrawLoad from "~/components/SpriteDrawLoad/SpriteDrawLoad";

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

export const AppHeader = (props: AppHeaderProps) => {
  const { data } = useRandomSprite();
  const { palette_id, pose_id, sprite_id } = data ?? {};
  const showSprite =
    Number.isFinite(palette_id) &&
    Number.isFinite(pose_id) &&
    Number.isFinite(sprite_id);
  return (
    <Header className="WC-header">
      <div className="flex gap-3 flex-wrap justify-center">
        <DiscordButton />
        <ButtonLink href="/sotw/active">
          {showSprite ? (
            <SpriteDrawLoad
              paletteId={palette_id as number}
              poseId={pose_id as number}
              spriteId={sprite_id as number}
              scale={2}
              variant={"half"}
            />
          ) : null}
          <div className="flex flex-col items-center">
            <p>Seed of the Week</p>
          </div>
        </ButtonLink>
      </div>
    </Header>
  );
};
