import last from "lodash/last";
import React from "react";
import { GetSaveDataQuery } from "~/queries/GetSaveDataQuery";
import { SnesSession } from "@ff6wc/tracker-core/SnesSession";
import { getTrackerDefaults, TrackerContext } from "./TrackerProvider";
import { TrackerMode } from "~/types/tracker";
import isEqual from "lodash/isEqual";
import { Button, CodeBlock } from "@ff6wc/ui";
import { sleep } from "~/utils/sleep";
import { useTrackerData } from "~/utils/useTrackerData";

type Props = {
  children: React.ReactNode;
  mode: TrackerMode;
  showButtons?: boolean;
};

const OverlayMessage = ({ message }: { message: string }) => (
  <div className="overlay overlay-background">{message}</div>
);

const trackerDefaults = { ...getTrackerDefaults() };

export function Tracker({
  children,
  mode,
  showButtons = true,
}: Props): JSX.Element {
  const id = React.useId();
  const [session, setSession] = React.useState(new SnesSession());
  const [trackerData, setTrackerData] = React.useState(trackerDefaults);

  React.useEffect(() => {
    if (window.localStorage.getItem("ff6wc-trackerdata")) {
      setTrackerData(
        JSON.parse(window.localStorage.getItem("ff6wc-trackerdata") as string)
      );
    }
  }, []);

  const providerData = useTrackerData({
    mode,
    setTrackerData,
    trackerData,
  });

  const logs = React.useRef<Array<string>>([]);
  const [sendRequest, setSendRequest] = React.useState(0);
  const [____ignoreRenderVal, setRender] = React.useState(0);

  const resetTracker = () => {
    setTrackerData(getTrackerDefaults());
  };
  const connect = () => {
    session.connect().then(() => {
      setSendRequest(sendRequest + 1);
    });
  };

  /**
   * creating a new snes session will trigger the useEffect below,
   */
  const disconnect = async () => {
    await session.disconnect();
    setSession(new SnesSession());
  };

  // connect to snes
  React.useEffect(() => {
    if (!session.isConnected && mode === TrackerMode.AUTO) {
      setTimeout(() => {
        console.log("auto-connect");
        void (async function () {
          session.clearLog();
          logs.current.push("CONNECTING");
          await session.connect();
          logs.current.push("CONNECTED");
          setSendRequest(Math.random());
        })();
      }, 100);
    }
  }, [mode, session]);

  // send data request to snes,
  React.useEffect(() => {
    if (mode === TrackerMode.MANUAL) {
      return;
    }
    void (async function () {
      if (!session.isConnected) {
        return;
      }
      setTimeout(async () => {
        const dataResult = await session.send(
          new GetSaveDataQuery().setLogger((...msgs) => {
            logs.current.push(...msgs);
            setRender(Math.random());
          })
        );

        if (!session.isConnected) {
          return;
        }
        const result = {
          ...trackerData,
          ...dataResult,
        };
        setTrackerData(result);
        await sleep(1500);
        setSendRequest(sendRequest + 1);
      }, 0);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendRequest]);

  React.useEffect(() => {
    if (!isEqual(trackerData, trackerDefaults)) {
      window.localStorage.setItem(
        "ff6wc-trackerdata",
        JSON.stringify(trackerData)
      );
    }
  }, [trackerData]);

  return (
    <TrackerContext.Provider value={providerData}>
      <div className="flex flex-col gap-2 relative p-6">
        {children}
        {session.error ? (
          <OverlayMessage message={session.error} />
        ) : logs.current.length &&
          !session.isConnected &&
          mode === TrackerMode.AUTO ? (
          <OverlayMessage message={`${last(logs.current)}`} />
        ) : null}
      </div>
      <div className={showButtons ? "" : "hidden"}>
        {mode === "AUTO" && <Button onClick={disconnect}>Reconnect</Button>}
        {mode === "MANUAL" && (
          <>
            <Button onClick={resetTracker}>Reset Tracker</Button>
          </>
        )}
      </div>
    </TrackerContext.Provider>
  );
}

export default Tracker;
