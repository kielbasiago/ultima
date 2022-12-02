import { useEffect } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { Card } from "@ff6wc/ui";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import { FlagsCard } from "~/components/FlagsCard/FlagsCard";

import { RawFlagMetadata, setSchema } from "~/state/schemaSlice";
import { useDispatch } from "react-redux";
import { wrapper } from "~/state/store";

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

const Home: NextPage<PageProps> = ({ schema }: PageProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Home | call dispatch in useEffect");
    dispatch(setSchema(schema));
  }, [dispatch, schema]);

  // dispatch(setSchema(schema));

  return (
    <div className={"p-12 flex flex-col h-full justify-between"}>
      <Card className="gap-4 p-4" contentClassName="gap-4" title={"Items"}>
        <FlagSlider
          flag="-lsced"
          label="Level Scaling Factor"
          min={0.5}
          max={5}
          step={0.5}
        />
        <FlagRange flag="-csb" label="Cursed Shield Battles" />
        <FlagSwitch flag="-mca" label="Moogle Charm All" />
        <FlagSwitch flag="-nxppd" invert label="Split Party Exp" />
      </Card>
      <FlagsCard />
    </div>
  );
};

export default Home;
