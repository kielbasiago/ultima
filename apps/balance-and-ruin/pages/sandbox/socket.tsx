import { SnesSession } from "@ff6wc/tracker-core";
import { Button } from "@ff6wc/ui";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { GetSaveDataQuery } from "../../queries/GetSaveDataQuery";
import io from "socket.io-client";

const useSnesSession = () => {
  return React.useMemo(() => new SnesSession("ff6wc-tracker"), []);
};

export default function Web() {
  const session = useSnesSession();

  useEffect(
    () =>
      void (async function () {
        // this is currently double invoking
        await fetch("/api/socket");
        const socket = io();

        const onConnect = () => {
          console.log("connected");
        };
        socket.on("connect", onConnect);
        return () => {
          console.log("disconnecting");
          socket.off("connect", onConnect);
        };
      })(),
    []
  );

  return <div>Check console for interactions, hitting /api/socket</div>;
}
