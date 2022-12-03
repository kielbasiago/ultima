import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Tabs } from "@ff6wc/ui";

import { RawFlagMetadata, setSchema } from "~/state/schemaSlice";
import { useDispatch } from "react-redux";
import { wrapper } from "~/state/store";
import { StartParty } from "~/components/Panels/Party/StartingParty";
import { SwdTechs } from "~/components/Panels/Party/SwdTechs";

type PageProps = {
  schema: Record<string, RawFlagMetadata>;
};

export const getStaticProps = wrapper.getStaticProps((store) => async ({}) => {
  const response = await fetch(`${process.env.API_URL}/api/metadata/flag`);
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
    label: <>Game</>,
    id: "foo",
    content: <StartParty />,
  },
  {
    label: <>OOO!</>,
    id: "foob",
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
    <div className="flex flex-col p-8">
      <Tabs
        onChange={(tab) => setSelected(tab)}
        selected={selected}
        tabs={tabs}
      />
    </div>
  );
};

export default Home;
