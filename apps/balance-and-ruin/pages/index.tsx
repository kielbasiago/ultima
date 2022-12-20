import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Tabs } from "@ff6wc/ui";
import { RawFlagMetadata, setSchema } from "~/state/schemaSlice";
import { useDispatch } from "react-redux";
import { wrapper } from "~/state/store";
import { FlagsCard } from "~/components/FlagsCard/FlagsCard";
import { Party } from "~/page-components/Party";
import { Items } from "~/page-components/Items";
import { Commands } from "~/page-components/Commands";
import { Battle } from "~/page-components/Battle";
import { Gameplay } from "~/page-components/Misc";
import { Magic } from "~/page-components/Magic";
import { AccessibilityAndFixes } from "~/page-components/Accessibility";
import { Graphics } from "~/page-components/Graphics";
import { Presets } from "~/page-components/Presets";
import { PaintBrushIcon } from "@heroicons/react/24/solid";

type PageProps = {
  schema: Record<string, RawFlagMetadata>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}) => {
      const protocol =
        process.env.NODE_ENV === "development" ? "http" : "https";
      const url = `${protocol}://${process.env.VERCEL_URL}/api/metadata/flag`;
      const response = await fetch(url);
      const schema = await response.json();
      await store.dispatch(setSchema(schema));
      return {
        props: {
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

type WithChildren = { children: React.ReactNode };
const TabContainer = ({ children }: WithChildren) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

type WithIcon = {
  Icon: React.ComponentType<JSX.IntrinsicElements["svg"]>;
};
const TabIcon = ({ Icon }: WithIcon) => {
  return (
    <span>
      <Icon height={16} width={16} />
    </span>
  );
};

const tabs: TabItem[] = [
  {
    label: <TabContainer>Presets</TabContainer>,
    id: "presets",
    content: <Presets />,
  },
  {
    label: <TabContainer>Party</TabContainer>,
    id: "party",
    content: <Party />,
  },
  {
    label: <TabContainer>Commands</TabContainer>,
    id: "commands",
    content: <Commands />,
  },
  {
    label: <TabContainer>Battle</TabContainer>,
    id: "battle",
    content: <Battle />,
  },
  {
    label: <TabContainer>Magic</TabContainer>,
    id: "magic",
    content: <Magic />,
  },
  {
    label: <TabContainer>Items</TabContainer>,
    id: "items",
    content: <Items />,
  },
  {
    label: <TabContainer>Gameplay</TabContainer>,
    id: "misc",
    content: <Gameplay />,
  },
  {
    label: (
      <TabContainer>
        <TabIcon Icon={PaintBrushIcon} />
        <span>Graphics</span>
      </TabContainer>
    ),
    id: "Graphics",
    content: <Graphics />,
  },
  {
    label: <TabContainer>Accessibility & Fixes</TabContainer>,
    id: "accessibility",
    content: <AccessibilityAndFixes />,
  },
];

const Home: NextPage<PageProps> = ({ schema }: PageProps) => {
  const [selected, setSelected] = useState<TabItem | null>(tabs[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSchema(schema));
  }, [dispatch, schema]);

  return (
    <div>
      <div className="flex flex-col p-8">
        <Tabs
          onChange={(tab) => setSelected(tab)}
          selected={selected}
          tabs={tabs}
        />
        {/* <Party /> */}
      </div>
      <div className="p-8">
        <FlagsCard />
      </div>
    </div>
  );
};

export default Home;
