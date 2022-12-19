import { useEffect, useState } from "react";
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

const tabs: TabItem[] = [
  {
    label: <>Presets</>,
    id: "presets",
    content: <Presets />,
  },
  {
    label: <>Party</>,
    id: "party",
    content: <Party />,
  },
  {
    label: <>Commands</>,
    id: "commands",
    content: <Commands />,
  },
  {
    label: <>Battle</>,
    id: "battle",
    content: <Battle />,
  },
  {
    label: <>Magic</>,
    id: "magic",
    content: <Magic />,
  },
  {
    label: <>Items</>,
    id: "items",
    content: <Items />,
  },
  {
    label: <>Gameplay</>,
    id: "misc",
    content: <Gameplay />,
  },
  { label: <>Graphics</>, id: "Graphics", content: <Graphics /> },
  {
    label: <>Accessibility & Fixes</>,
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
