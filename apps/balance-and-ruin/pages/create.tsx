import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { FlagCreatePage } from "~/components/FlagCreatePage/FlagCreatePage";
import { setRawFlags } from "~/state/flagSlice";
import { setObjectiveMetadata } from "~/state/objectiveSlice";
import { RawFlagMetadata, setSchema } from "~/state/schemaSlice";
import { makeStore } from "~/state/store";
import { ObjectiveMetadata } from "~/types/objectives";
import { FlagPreset } from "~/types/preset";

export type PageProps = {
  objectives: ObjectiveMetadata;
  presets: Record<string, FlagPreset>;
  schema: Record<string, RawFlagMetadata>;
};

const Create = () => {

  const [objectives, setObjectives] = useState(null)
  const [presets, setPresets] = useState(null)
  const [schema, setSchemaLocal] = useState(null)
  const [version, setVersion] = useState(null)
  

  useEffect(() => {
    const store = makeStore()

    // fetch presets
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/presets`)
      .then((res) => res.json())
      .then((data) => {
        setPresets(data)
        // TODO: figure out why this isn't having the desired effect -- it's defaulting to the startingFlags in flagSlice.ts -- a race condition?
        const preset = data["ultros league"];
        if (preset) {
          store.dispatch(setRawFlags(preset.flags));
        }
      })
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/metadata/flag`)
      .then((res) => res.json())
      .then((data) => {
        setSchemaLocal(data)
        store.dispatch(setSchema(data))
      })

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/metadata/objective`)
      .then((res) => res.json())
      .then((data) => {
        setObjectives(data)
        store.dispatch(setObjectiveMetadata(data))
      })

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wc`)
      .then((res) => res.json())
      .then((data) => {
        const fetchedVersion = data["version"]
        setVersion(fetchedVersion)
      })
  }, [])

  if(objectives && presets && schema && version) {
    return(<FlagCreatePage objectives={objectives} presets={presets} schema={schema} version={version}/>)
  } else {
    return(<p>Loading...</p>)
  }
};

export default Create;
