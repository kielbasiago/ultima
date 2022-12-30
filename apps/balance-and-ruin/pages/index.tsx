import type { NextPage } from "next";
import { FlagCreatePage } from "~/components/FlagCreatePage/FlagCreatePage";
import { SeedbotPreset, SeedOfTheWeek } from "~/page-components/Settings";
import { setObjectiveMetadata } from "~/state/objectiveSlice";
import { RawFlagMetadata, setSchema } from "~/state/schemaSlice";
import { wrapper } from "~/state/store";
import { ObjectiveMetadata } from "~/types/objectives";

type PageProps = {
  objectives: ObjectiveMetadata;
  presets: Record<string, SeedbotPreset>;
  schema: Record<string, RawFlagMetadata>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}) => {
      const sotwPromise = fetch(
        "https://storage.googleapis.com/seedbot/sotw_db.json"
      );

      const presetPromise = fetch(
        "https://storage.googleapis.com/seedbot/user_presets.json"
      );
      const sotw: Record<string, SeedOfTheWeek> = await (
        await sotwPromise
      ).json();

      const presets: Record<string, SeedbotPreset> = await (
        await presetPromise
      ).json();

      const protocol =
        process.env.NODE_ENV === "development" ? "http" : "https";
      const response = await fetch(
        `${protocol}://${process.env.VERCEL_URL}/api/metadata/flag`
      );
      const schema = await response.json();
      await store.dispatch(setSchema(schema));

      const objectivesResponse = await fetch(
        `${protocol}://${process.env.VERCEL_URL}/api/metadata/objective`
      );
      const objectives = await objectivesResponse.json();

      console.log("OBJECTIVOES", objectives);

      await store.dispatch(setObjectiveMetadata(objectives));

      return {
        props: {
          objectives,
          presets,
          schema,
        },
      };
    }
);

const Home: NextPage<PageProps> = ({
  objectives,
  presets,
  schema,
}: PageProps) => {
  return (
    <FlagCreatePage objectives={objectives} presets={presets} schema={schema} />
  );
};

export default Home;
