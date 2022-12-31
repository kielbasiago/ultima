import { Footer as BaseFooter } from "@ff6wc/ui";
export type FooterProps = Record<string, unknown>;

export const Footer = ({}: FooterProps) => {
  return (
    <BaseFooter
      messages={[
        "Created by Kielbasiago",
        "Final Fantasy VI: Worlds Collide is an unofficial fan project not affiliated in any way with Square Enix",
      ]}
    />
  );
};
