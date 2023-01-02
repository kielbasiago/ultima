import {
  Button,
  ButtonLink,
  ButtonProps,
  buttonStyles,
  DiscordButton,
  Header,
} from "@ff6wc/ui";
import { montserrat, robotoMono } from "@ff6wc/utils/fonts";

export type AppHeaderProps = Record<string, unknown>;

export const TempestHeader = (props: AppHeaderProps) => {
  return (
    <div className={montserrat.className}>
      <Header>
        <div className="flex gap-3"></div>
      </Header>
      {/* <div className="flex justify-center gap-4 p-5">
        <ButtonLink href="/auto">Auto</ButtonLink>
        <ButtonLink href="/manual">Manual</ButtonLink>
      </div> */}
    </div>
  );
};
