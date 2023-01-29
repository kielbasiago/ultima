import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  DevicesResponse,
  fetchDevices,
  streamRam,
  StreamRamResult,
} from "@ff6wc/tracker-core";
import { Button, Card, CodeBlock, Divider, Input } from "@ff6wc/ui";
import { base64ToByteArray } from "@ff6wc/utils/base64ToByteArray";
import { PageContainer } from "~/components/PageContainer";
import { Select, SelectOption } from "~/components/Select/Select";
import { GetSaveDataQuery } from "~/queries/GetSaveDataQuery";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { GetSaveDataResponse, TrackerMode } from "~/types/tracker";
import { useTrackerData } from "~/utils/useTrackerData";
import {
  getTrackerDefaults,
  TrackerContext,
} from "~/components/EmoTracker/TrackerProvider";
import { EmoTrackerLayout } from "~/components/EmoTracker/EmoTrackerLayout";
import useSWR from "swr";
import isEqual from "lodash/isEqual";

const trackerDefaults = { ...getTrackerDefaults() };

const useRender = () => {
  const val = useRef(0);
  const [renderValue, setRenderValue] = useState<number>(0);
  const render = useCallback(() => {
    setRenderValue(val.current + 1);
  }, [val]);
  return render;
};

const OverlayMessage = ({ messages }: { messages: string[] }) => (
  <div className="overlay overlay-background text-center flex flex-col p-8 gap-4">
    {messages.map((message, idx) => (
      <span key={idx}>{message}</span>
    ))}
  </div>
);

const Status = {
  ACTIVE: "ACTIVE",
  LOADING: "LOADING",
  ERROR: "ERROR",
  DISCONNECTED: "DISCONNECTED",
} as const;

type Status = keyof typeof Status;

export function SniTracker({ simple = false }) {
  const render = useRender();

  const [error, setError] = useState<string[]>([]);

  const adventureLog = useRef<string[]>([]);
  const log = useRef<string[]>([]);

  const dataRef = useRef<GetSaveDataResponse>(trackerDefaults);
  const [data, baseSetTrackerData] =
    useState<GetSaveDataResponse>(trackerDefaults);
  const [hostname, setHostname] = useState("http://localhost:8190");

  const [stream, setStream] = useState<StreamRamResult["stream"] | null>(null);
  const [ramRequest, setRamRequest] = useState<
    StreamRamResult["request"] | null
  >(null);

  const setTrackerData = (newData: GetSaveDataResponse) => {
    dataRef.current = newData;
    baseSetTrackerData(newData);
  };

  const providerData = useTrackerData({
    mode: TrackerMode.AUTO,
    setTrackerData,
    trackerData: data,
  });

  const pushAdventureLog = useCallback((...msgs: string[]) => {
    adventureLog.current = adventureLog.current.concat(msgs);
  }, []);

  const pushLog = useCallback(
    (...msgs: string[]) => {
      log.current = log.current.concat(msgs);
      render();
    },
    [render]
  );

  const { data: devices, isLoading } = useSWR<
    DevicesResponse.Device.AsObject[] | null,
    string[]
  >(
    ["devices"],
    async () => {
      pushLog("Loading devices...");
      const result = await fetchDevices(hostname);

      if (!result?.devicesList.length) {
        return Promise.reject([
          "No devices found",
          "Make sure your emulator/snes is connected to SNI",
          "This will be rechecked every few seconds so no refresh is required",
        ]);
      }

      const devicesList = result.devicesList;

      pushLog(`${devicesList.length} devices found`);
      if (!devicesList.length) {
        return [];
      } else if (devicesList.length) {
        const newDevice = devicesList.at(0)!;
        connectStream(newDevice.uri);
        pushLog(`No active device set, updating to ${newDevice.displayname}`);
      }

      return devicesList;
    },
    {
      suspense: false,
      revalidateOnFocus: false,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      onError(err, key, config) {
        if (Array.isArray(err)) {
          setError(err);
          pushLog(...err);
        } else {
          setError([err]);
          pushLog(err);
        }
        setStream(null);
      },
      refreshInterval(latestData) {
        return 5000;
      },
    }
  );

  const deviceOptions =
    devices?.map<SelectOption>(({ displayname, uri }) => ({
      label: displayname,
      value: uri,
    })) ?? [];

  const connectStream = async (deviceUri: string) => {
    const query = new GetSaveDataQuery(deviceUri);
    const { request, stream } = streamRam(query);
    setStream(stream);
    setRamRequest(request);
  };

  useEffect(() => {
    if (!stream || !ramRequest) {
      return;
    }
    stream.on("end", (status) => {
      console.log("connection closes with status", status);
      setStream(null);
    });
    stream.on("status", ({ code, details, metadata }) => {
      if (code !== 0) {
        console.error(
          "Received non-zero status code: ",
          code,
          details,
          metadata
        );
        const err = ["Disconnected from SNI", details];
        setError(err);
        pushLog(...err);
      }
    });
    stream.on("data", async (response) => {
      const { responsesList, uri } = response.toObject();
      const responseData = await new GetSaveDataQuery(uri).onResponse(
        responsesList.map(({ data }) => {
          if (typeof data === "string") {
            return base64ToByteArray(data);
          } else {
            return data;
          }
        }) as Buffer[]
      );

      if (!isEqual(dataRef.current, responseData)) {
        // TODO: DOCTORDT
        // At this point something changed between the previous / new data
        // Find the changes and then append each row to the adventure log here
        // pushAdventureLog(`[${new Date().toISOString()}] Something has changed`);
      } else {
        // pushAdventureLog(`[${new Date().toISOString()}] Nothing has changed `);
      }
      setError([]);
      setTrackerData(responseData);
    });

    stream.write(ramRequest);

    const token = setInterval(() => {
      stream.write(ramRequest);
    }, 2000);

    return () => {
      clearInterval(token);
      stream.end();
    };
  }, [ramRequest, stream]);

  let status: Status = Status.DISCONNECTED;

  if (Boolean(stream)) {
    status = Status.ACTIVE;
  } else if (isLoading) {
    status = Status.LOADING;
  } else if (error) {
    status = Status.ERROR;
  }

  if (simple) {
    return (
      <TrackerContext.Provider value={providerData}>
        <div className="flex flex-col gap-2 relative p-6">
          <PageContainer>
            <div className="flex flex-col relative justify-center gap-2">
              <EmoTrackerLayout />
              {error.length ? <OverlayMessage messages={error} /> : null}
            </div>
          </PageContainer>
        </div>
      </TrackerContext.Provider>
    );
  }

  return (
    <TrackerContext.Provider value={providerData}>
      <div className="flex flex-col gap-2 relative p-6">
        <Card title="Tracker">
          <div className="flex flex-col relative justify-center">
            <EmoTrackerLayout />
            {error.length ? <OverlayMessage messages={error} /> : null}
          </div>
        </Card>
        <Card title="Status">
          {status === Status.ACTIVE ? (
            <span className="text-green-500 text-sm">Tracking</span>
          ) : null}
          {status === Status.LOADING ? (
            <span className="text-yellow-500 text-sm">Loading devices</span>
          ) : null}
          {status === Status.ERROR
            ? error?.map((err) => (
                <span className="text-red-500 text-sm" key={err}>
                  {err}
                </span>
              ))
            : null}

          {status === Status.DISCONNECTED ? (
            <span className="text-zinc-400 text-sm">Waiting for activity</span>
          ) : null}
        </Card>
        {/* <Card title="Settings">
          <InputLabel htmlFor={hostnameId}>Hostname</InputLabel>
          <Input
            id={hostnameId}
            onChange={(e) => setHostname(e.target.value)}
            value={hostname}
          />

          <Divider />

          <InputLabel htmlFor={hostnameId}>Device List</InputLabel>
          <Select
            placeholder="Waiting for devices..."
            onChange={() => {}}
            options={deviceOptions}
            value={activeOption!}
          />
        </Card> */}

        <Card title="Adventure Log">
          <CodeBlock>{adventureLog.current.join("\n")}</CodeBlock>
        </Card>

        <Card title="Log">
          <CodeBlock>{log.current.join("\n")}</CodeBlock>
        </Card>
      </div>
    </TrackerContext.Provider>
  );
}
