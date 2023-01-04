import type { NextPage } from "next";
import { FlagCreatePage } from "~/components/FlagCreatePage/FlagCreatePage";
import { setObjectiveMetadata } from "~/state/objectiveSlice";
import { RawFlagMetadata, setSchema } from "~/state/schemaSlice";
import { wrapper } from "~/state/store";
import { ObjectiveMetadata } from "~/types/objectives";
import { FlagPreset } from "~/types/preset";

export type PageProps = {
  objectives: ObjectiveMetadata;
  presets: Record<string, FlagPreset>;
  schema: Record<string, RawFlagMetadata>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}) => {
      const presetPromise = fetch(
        "https://storage.googleapis.com/seedbot/user_presets.json"
      );

      const presets: Record<string, FlagPreset> = await (
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

const Create: NextPage<PageProps> = ({
  objectives,
  presets,
  schema,
}: PageProps) => {
  return (
    <FlagCreatePage objectives={objectives} presets={presets} schema={schema} />
  );
};

export default Create;
