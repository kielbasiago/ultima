import { Button, Header } from "@ff6wc/ui";
import SpriteDrawLoad from "~/components/SpriteDrawLoad/SpriteDrawLoad";
import useSWR from "swr";
import { cx } from "cva";
import { montserrat } from "~/utils/fonts";
import Link from "next/link";

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
  const buttons = (
    <Link href="/sotw/active">
      <Button
        className={cx(
          montserrat.className,
          "inline-flex gap-2 items-center font-montserrat text-2xl font-bold"
        )}
        variant="outline"
      >
        {showSprite ? (
          <SpriteDrawLoad
            paletteId={palette_id as number}
            poseId={pose_id as number}
            spriteId={sprite_id as number}
            scale={2}
            variant={"half"}
          />
        ) : null}
        Seed of the Week
      </Button>
    </Link>
  );
  return <Header buttons={buttons} />;
};
