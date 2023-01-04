import { Tab } from "@headlessui/react";

export type AppHeaderProps = Record<string, unknown>;

export const AppNavigation = (props: AppHeaderProps) => {
  return (
    <nav className="min-h-[48px] md:min-h-[64px] p-2 sticky w-full bg-white">
      Hello world
    </nav>
  );
};
