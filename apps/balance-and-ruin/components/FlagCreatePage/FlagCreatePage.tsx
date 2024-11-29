import { TabLabel } from "@ff6wc/ui";
import { Tab } from "@headlessui/react";
import { cx } from "cva";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import type { IconType } from "react-icons";
import {
  GiBrokenWall,
  GiDrinkMe,
  GiElectric,
  GiGladius,
  GiMagnifyingGlass,
  GiPaintBrush,
  GiRetroController,
  GiWizardStaff,
} from "react-icons/gi";
import { HiCog, HiOutlineViewList, HiUserGroup } from "react-icons/hi";
import { HiOutlineWrench } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { FlagsCard } from "~/card-components/Flags";
import { AppHeader } from "~/components/AppHeader/AppHeader";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { Footer } from "~/components/Footer/Footer";
import { GenerateCard } from "~/components/GenerateCard/GenerateCard";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import { Accessibility } from "~/page-components/Accessibility";
import { Battle } from "~/page-components/Battle";
import { BetaPage } from "~/page-components/BetaPage";
import { Commands } from "~/page-components/Commands";
import { Fixes } from "~/page-components/Fixes";
import { Gameplay } from "~/page-components/Gameplay";
import { Graphics } from "~/page-components/Graphics";
import { Items } from "~/page-components/Items";
import { Magic } from "~/page-components/Magic";
import { Objectives } from "~/page-components/Objectives";
import { Party } from "~/page-components/Party";
import { Settings } from "~/page-components/Settings";
import { setObjectiveMetadata } from "~/state/objectiveSlice";
import { RawFlagMetadata, setSchema } from "~/state/schemaSlice";
import { ObjectiveMetadata } from "~/types/objectives";
import { FlagPreset } from "~/types/preset";

type PageProps = {
  objectives: ObjectiveMetadata;
  presets: Record<string, FlagPreset>;
  schema: Record<string, RawFlagMetadata>;
  version: string;
};

type TabItem = {
  className?: string;
  content: React.ReactNode;
  label: React.ReactNode;
  id: string;
};

type WithChildren = { children: React.ReactNode; className?: string };
const TabContainer = ({ children, className }: WithChildren) => {
  return (
    <div
      className={cx(
        "flex items-center gap-2",
        "py-1 md:py-2 lg:py-3",
        "px-2 md:px-3",
        className
      )}
    >
      {children}
    </div>
  );
};

type WithIcon = {
  className?: string;
  Icon: IconType;
};
const TabIcon = ({ className, Icon }: WithIcon) => {
  return (
    <>
      <Icon className={className} size={"1.25rem"} />
    </>
  );
};

export const FlagCreatePage = ({ objectives, presets, schema, version }: PageProps) => {
  const tabs: TabItem[] = useMemo(
    () =>
      [
        {
          label: (
            <TabContainer>
              <TabIcon Icon={HiCog} />
              Settings
            </TabContainer>
          ),

          id: "settings",
          content: <Settings presets={presets} />,
        },
        {
          label: (
            <TabContainer>
              <TabIcon Icon={HiOutlineViewList} />
              Objectives
            </TabContainer>
          ),
          content: <Objectives />,
          id: "objectives",
        },
        {
          label: (
            <TabContainer>
              <TabIcon Icon={HiUserGroup} />
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
              <TabIcon Icon={GiGladius} />
              Battle
            </TabContainer>
          ),
          id: "battle",
          content: <Battle />,
        },
        {
          label: (
            <TabContainer>
              <TabIcon Icon={GiElectric} />
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
              <span className="whitespace-nowrap">Accessibility</span>
            </TabContainer>
          ),
          id: "accessibility",
          content: <Accessibility />,
        },
        {
          label: (
            <TabContainer>
              <TabIcon Icon={GiBrokenWall} />
              <span>Fixes</span>
            </TabContainer>
          ),
          id: "fixes",
          content: <Fixes />,
        },
        process.env.NEXT_PUBLIC_ENABLE_BETA === "true"
          ? {
              label: (
                <TabContainer className="card-fancy-gradient">
                  <TabIcon Icon={HiOutlineWrench} />
                  <span>Beta</span>
                </TabContainer>
              ),
              id: "beta",
              content: <BetaPage />,
            }
          : null,
      ].filter((z) => !!z) as TabItem[],
    [presets]
  );
  const [selected, setSelected] = useState<TabItem | null>(tabs[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSchema(schema));
    dispatch(setObjectiveMetadata(objectives));
  }, [dispatch, objectives, schema]);

  return (
    <>
      <Head>
        <title>FF6WC</title>
        <meta
          name="description"
          content="Final Fantasy VI open-world randomizer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader />
      <main className="WC-Page WC-page">
        <div className="flex justify-center items-center py-4">Version: {version}</div>
        <Tab.Group onChange={(idx) => setSelected(tabs[idx])}>
          <div className="flex justify-center items-center py-4">
            <Tab.List className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {tabs.map((tab) => (
                <TabLabel
                  className={tab.className}
                  key={tab.id}
                  selected={selected?.id === tab.id}
                >
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
      <PageContainer className={"w-full"}>
        <CardColumn>
          <GenerateCard />
        </CardColumn>
      </PageContainer>
      <Footer />
    </>
  );
};
