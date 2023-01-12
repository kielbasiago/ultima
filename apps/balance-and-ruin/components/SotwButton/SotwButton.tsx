import { ButtonLink } from "@ff6wc/ui";
import { cva } from "cva";
import { SpriteDrawRandomOriginal } from "~/components/SpriteDrawRandomOriginal/SpriteDrawRandomOriginal";

const button = cva(["w-fit max-w-[500px] min-h-[70px] inline-flex"]);

export const SotwButton = ({}: {}) => {
  return (
    <ButtonLink className={button()} href="/sotw" variant="primary">
      <SpriteDrawRandomOriginal />
      <div>
        <div>Seed of the Week</div>
      </div>
    </ButtonLink>
  );
};
