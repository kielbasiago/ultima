import { QueryBuilder, SnesSession } from "@ff6wc/tracker-core";
import { Button, Tile } from "@ff6wc/ui";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { GetSaveDataQuery } from "../queries/GetSaveDataQuery";
import io from "socket.io-client";
import Sprite from "@ff6wc/ui/DrawSprite";
import { GetCharacterSpriteDataQuery } from "../queries/GetSpriteDataQuery";
import { FF6Character } from "@ff6wc/ff6-types";

const useSnesSession = () => {
  return React.useMemo(() => new SnesSession("ff6wc-tracker"), []);
};

const useTrackerInfo = (session: SnesSession) => {
  return useQuery(
    ["draw-sprite"],
    async () => {
      await session.connect();
      const qb = new QueryBuilder(session);
      return qb.send(new GetCharacterSpriteDataQuery());
    },
    {
      staleTime: Infinity,
    }
  );
};

export default function DrawSprite() {
  const session = useSnesSession();
  const { data } = useTrackerInfo(session);

  const getFormation = (key: FF6Character) =>
    [0, 1, 6, 7, 8, 9].map(
      (idx) => data?.portraits[key].sprite[idx]
    ) as Array<Tile>;

  const name = "terra";

  if (!data) {
    return null;
  }
  const formation = getFormation("terra");

  return (
    <div>
      <Sprite tiles={formation} key={name} proportion={2} />

      <input defaultValue={""} />
    </div>
  );
}
