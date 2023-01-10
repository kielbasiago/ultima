import type { NextPage } from "next";
import { FlagCreatePage } from "~/components/FlagCreatePage/FlagCreatePage";
import { setRawFlags } from "~/state/flagSlice";
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
      const protocol =
        process.env.NODE_ENV === "development" ? "http" : "https";

      const presetPromise = fetch(
        "https://storage.googleapis.com/seedbot/user_presets.json"
      );

      const schemaPromise = fetch(
        `${protocol}://${process.env.VERCEL_URL}/api/metadata/flag`
      );

      const objectivesPromise = fetch(
        `${protocol}://${process.env.VERCEL_URL}/api/metadata/objective`
      );

      const presets: Record<string, FlagPreset> = await (
        await presetPromise
      ).json();

      const schema = await (await schemaPromise).json();

      const objectives = await (await objectivesPromise).json();

      await store.dispatch(setSchema(schema));

      await store.dispatch(setObjectiveMetadata(objectives));
      const preset = presets["ultros league"];
      if (preset) {
        await store.dispatch(setRawFlags(preset.flags));
      }
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
