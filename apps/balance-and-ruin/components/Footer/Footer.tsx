import { Footer as BaseFooter, Link } from "@ff6wc/ui";

export type FooterProps = {};

const secondaryText =
  "Final Fantasy VI: Worlds Collide is an unofficial fan project not affiliated in any way with Square Enix";

export const Footer = ({}: FooterProps) => {
  const primaryText = "Created by AtmaTek and maintained by the community";
  return <BaseFooter messages={[primaryText, secondaryText]} />;
};

export const MusicFooter = ({}: FooterProps) => {
  const primaryText = (
    <p>
      Thanks to&nbsp;
      <Link href="https://github.com/emberling">emberling</Link>&nbsp;for the
      support!
    </p>
  );
  return <BaseFooter messages={[primaryText, secondaryText]} />;
};
