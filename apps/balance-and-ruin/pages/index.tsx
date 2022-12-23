import { TabLabel } from "@ff6wc/ui";
import {
  GiPaintBrush,
  GiRetroController,
  GiDrinkMe,
  GiWizardStaff,
  GiLightningTrio,
  GiRelicBlade,
  GiUprising,
  GiMagnifyingGlass,
} from "react-icons/gi";
import type { IconType } from "react-icons";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { FlagsCard } from "~/card-components/Flags";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { GenerateCard } from "~/components/GenerateCard/GenerateCard";
import { AccessibilityAndFixes } from "~/page-components/Accessibility";
import { Battle } from "~/page-components/Battle";
import { Commands } from "~/page-components/Commands";
import { Graphics } from "~/page-components/Graphics";
import { Items } from "~/page-components/Items";
import { Magic } from "~/page-components/Magic";
import { Gameplay } from "~/page-components/Gameplay";
import { Party } from "~/page-components/Party";
import {
  Presets,
  SeedbotPreset,
  SeedOfTheWeek,
} from "~/page-components/Presets";
import { RawFlagMetadata, setSchema } from "~/state/schemaSlice";
import { wrapper } from "~/state/store";
import { cx } from "cva";
import { Tab } from "@headlessui/react";

type PageProps = {
  presets: Record<string, SeedbotPreset>;
  schema: Record<string, RawFlagMetadata>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}) => {
      const sotwResponse = await fetch(
        "https://storage.googleapis.com/seedbot/sotw_db.json"
      );
      const sotw: Record<string, SeedOfTheWeek> = await sotwResponse.json();

      const presetResponse = await fetch(
        "https://storage.googleapis.com/seedbot/user_presets.json"
      );
      const presets: Record<string, SeedbotPreset> =
        await presetResponse.json();

      const protocol =
        process.env.NODE_ENV === "development" ? "http" : "https";
      const url = `${protocol}://${process.env.VERCEL_URL}/api/metadata/flag`;
      const response = await fetch(url);
      const schema = await response.json();
      await store.dispatch(setSchema(schema));
      return {
        props: {
          presets,
          schema,
        },
      };
    }
);

type TabItem = {
  content: React.ReactNode;
  label: React.ReactNode;
  id: string;
};

type WithChildren = { children: React.ReactNode; className?: string };
const TabContainer = ({ children, className }: WithChildren) => {
  return (
    <div className={cx("flex items-center gap-2", className)}>{children}</div>
  );
};

type WithIcon = {
  className?: string;
  Icon: IconType;
};
const TabIcon = ({ className, Icon }: WithIcon) => {
  return (
    <span className="">
      <Icon className={className} size={"1.25rem"} />
    </span>
  );
};

const Home: NextPage<PageProps> = ({ presets, schema }: PageProps) => {
  const tabs: TabItem[] = useMemo(
    () => [
      {
        label: (
          <TabContainer>
            <TabIcon Icon={GiWizardStaff} />
            Presets
          </TabContainer>
        ),

        id: "presets",
        content: <Presets presets={presets} />,
      },
      {
        label: (
          <TabContainer>
            <TabIcon Icon={GiUprising} />
            Party
          </TabContainer>
        ),
        id: "party",
        content: <Party />,
      },
      {
        label: (
          <TabContainer>
            <TabIcon Icon={GiWizardStaff} />
            Commands
          </TabContainer>
        ),
        id: "commands",
        content: <Commands />,
      },
      {
        label: (
          <TabContainer>
            <TabIcon Icon={GiRelicBlade} />
            Battle
          </TabContainer>
        ),
        id: "battle",
        content: <Battle />,
      },
      {
        label: (
          <TabContainer>
            <TabIcon Icon={GiLightningTrio} />
            Magic
          </TabContainer>
        ),
        id: "magic",
        content: <Magic />,
      },
      {
        label: (
          <TabContainer>
            <TabIcon Icon={GiDrinkMe} />
            Items
          </TabContainer>
        ),
        id: "items",
        content: <Items />,
      },
      {
        label: (
          <TabContainer>
            <TabIcon Icon={GiRetroController} />
            Gameplay
          </TabContainer>
        ),
        id: "misc",
        content: <Gameplay />,
      },
      {
        label: (
          <TabContainer>
            <TabIcon Icon={GiPaintBrush} />
            <span>Graphics</span>
          </TabContainer>
        ),
        id: "Graphics",
        content: <Graphics />,
      },
      {
        label: (
          <TabContainer>
            <TabIcon Icon={GiMagnifyingGlass} />
            Accessibility & Fixes
          </TabContainer>
        ),
        id: "accessibility",
        content: <AccessibilityAndFixes />,
      },
    ],
    [presets]
  );

  const [selected, setSelected] = useState<TabItem | null>(tabs[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSchema(schema));
  }, [dispatch, schema]);

  return (
    <>
      <div className="WC-Page">
        <main className={"w-11/12 lg:w-10/12  m-auto"}>
          <Tab.Group onChange={(idx) => setSelected(tabs[idx])}>
            <div className="flex justify-center items-center">
              <Tab.List className="p-5">
                {tabs.map((tab) => (
                  <TabLabel key={tab.id} selected={selected?.id === tab.id}>
                    {tab.label}
                  </TabLabel>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels tabIndex={-1}>
              {tabs.map(({ content, id }) => (
                <Tab.Panel tabIndex={-1} key={`tab-panel-${id}`}>
                  {content}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </main>
      </div>
      <div className="flex p-8">
        <CardColumn>
          <FlagsCard />
          <GenerateCard />
        </CardColumn>
      </div>
    </>
  );
};

export default Home;
