import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Tabs } from "@ff6wc/ui";

import { RawFlagMetadata, setSchema } from "~/state/schemaSlice";
import { useDispatch } from "react-redux";
import { wrapper } from "~/state/store";
import { StartParty } from "~/components/Panels/Party/StartingParty";
import { SwdTechs } from "~/components/Panels/Party/SwdTechs";
import { Debug } from "~/components/Panels/Debug/Debug";
import { FlagsCard } from "~/components/FlagsCard/FlagsCard";

type PageProps = {
  schema: Record<string, RawFlagMetadata>;
};

export const getStaticProps = wrapper.getStaticProps((store) => async ({}) => {
  const url = `${process.env.API_URL}/api/metadata/flag`;
  const response = await fetch(url);
  const schema = await response.json();
  await store.dispatch(setSchema(schema));
  return {
    props: {
      schema,
    },
  };
});

type TabItem = {
  content: React.ReactNode;
  label: React.ReactNode;
  id: string;
};

const tabs: TabItem[] = [
  {
    label: <>Debug</>,
    id: "debug",
    content: <Debug />,
  },
  {
    label: <>Game</>,
    id: "game",
    content: <StartParty />,
  },
  {
    label: <>Skills</>,
    id: "skills",
    content: <SwdTechs />,
  },
];

const Home: NextPage<PageProps> = ({ schema }: PageProps) => {
  const [selected, setSelected] = useState<TabItem | null>(tabs[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSchema(schema));
  }, [dispatch, schema]);

  // dispatch(setSchema(schema));

  return (
    <div>
      <div className="flex flex-col p-8">
        <Tabs
          onChange={(tab) => setSelected(tab)}
          selected={selected}
          tabs={tabs}
        />
      </div>
      <div className="p-8">
        <FlagsCard />
      </div>
    </div>
  );
};

export default Home;
