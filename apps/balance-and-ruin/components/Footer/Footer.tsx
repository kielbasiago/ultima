import { Footer as BaseFooter, HelperText, Link } from "@ff6wc/ui";

export type FooterProps = {};

const secondaryText =
  "Final Fantasy VI: Worlds Collide is an unofficial fan project not affiliated in any way with Square Enix";
const captcha = (
  <>
    This site is protected by reCAPTCHA and the Google
    <Link href="https://policies.google.com/privacy">
      &nbsp;Privacy Policy&nbsp;
    </Link>
    and
    <Link href="https://policies.google.com/terms">
      &nbsp;Terms of Service&nbsp;
    </Link>
    apply
  </>
);
export const Footer = ({}: FooterProps) => {
  const primaryText = "Created by AtmaTek and maintained by the community";
  return <BaseFooter messages={[primaryText, secondaryText, captcha]} />;
};

export const MusicFooter = ({}: FooterProps) => {
  const primaryText = (
    <span>
      Thanks to&nbsp;
      <Link href="https://github.com/emberling">emberling</Link>&nbsp;for the
      support!
    </span>
  );
  return <BaseFooter messages={[primaryText, secondaryText]} />;
};

export const HomeFooter = () => {
  return <BaseFooter messages={[secondaryText]} />;
};
