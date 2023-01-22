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

const trackerDefaults = { ...getTrackerDefaults() };

const useRender = () => {
  const val = useRef(0);
  const [renderValue, setRenderValue] = useState<number>(0);
  const render = useCallback(() => {
    setRenderValue(val.current + 1);
  }, []);
  return render;
};

export default function Home() {
  const render = useRender();
  const log = useRef<string[]>([]);
  const [data, setData] = useState<GetSaveDataResponse>(trackerDefaults);
  const [hostname, setHostname] = useState("http://localhost:8190");
  const [stream, setStream] = useState<StreamRamResult["stream"] | null>(null);
  const [ramRequest, setRamRequest] = useState<
    StreamRamResult["request"] | null
  >(null);

  const providerData = useTrackerData({
    mode: TrackerMode.AUTO,
    setTrackerData: setData,
    trackerData: data,
  });

  const pushLog = useCallback((...msgs: string[]) => {
    log.current = log.current.concat(msgs);
  }, []);

  const [activeDevice, setActiveDevice] =
    useState<DevicesResponse.Device.AsObject | null>(null);

  const hostnameId = useId();

  const [devices, setDevices] = useState<
    DevicesResponse.Device.AsObject[] | null
  >(null);

  // setting to null means uninitialized, 0 means no devices active
  const noDevices = devices?.length === 0;

  const deviceOptions = noDevices
    ? []
    : devices?.map<SelectOption>(({ displayname, uri }) => ({
        label: displayname,
        value: uri,
      }))!;

  const activeOption = activeDevice
    ? deviceOptions.find((z) => z.value === activeDevice.uri)
    : null;

  const loadDevices = async () => {
    pushLog("Loading devices...");
    const result = await fetchDevices(hostname);
    const devicesList = result.devicesList;

    setDevices(devicesList);
    pushLog(`${devicesList.length} devices found`);

    if (devicesList.length && !activeDevice) {
      const newDevice = devicesList.at(0)!;
      setActiveDevice(newDevice);
      pushLog(`No active device set, updating to ${newDevice.displayname}`);
    }

    render();
  };

  useEffect(() => {
    if (activeDevice) {
    }
  }, [activeDevice, pushLog]);

  const connectStream = async () => {
    if (!activeDevice) {
      return;
    }
    const query = new GetSaveDataQuery(activeDevice.uri);
    const { request, stream } = streamRam(query);
    setStream(stream);
    setRamRequest(request);
  };

  useEffect(() => {
    if (stream && ramRequest) {
      stream.on("status", ({ code, details, metadata }) => {
        if (code !== 0) {
          console.warn(
            "Received non-zero status code: ",
            code,
            details,
            metadata
          );
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
        pushLog("Received tracker data, updating UI...");
        setData(responseData);
      });
      pushLog("Sending request for tracker data");
      stream.write(ramRequest);

      return () => {
        stream.end();
      };
    }
  }, [ramRequest, stream]);

  return (
    <TrackerContext.Provider value={providerData}>
      <div className="p-8">
        <Card title="Tracker">
          <EmoTrackerLayout />
        </Card>
        <Card title="Devices">
          <InputLabel htmlFor={hostnameId}>Hostname</InputLabel>
          <Input
            id={hostnameId}
            onChange={(e) => setHostname(e.target.value)}
            value={hostname}
          />

          <Divider />
          <Button onClick={loadDevices} variant="primary">
            Load Devices
          </Button>
          {noDevices ? (
            <div className="text-red-500">No devices found</div>
          ) : null}

          <InputLabel htmlFor={hostnameId}>Device List</InputLabel>
          <Select
            placeholder="Waiting for devices..."
            onChange={() => {}}
            options={deviceOptions}
            value={activeOption!}
          />
        </Card>
        <Card title="Testing FF6WC">
          <Button
            disabled={!Boolean(activeDevice)}
            onClick={connectStream}
            variant="primary"
          >
            Update Tracker Information
          </Button>
        </Card>

        <Card title="Log">
          <CodeBlock>{log.current.join("\n")}</CodeBlock>
        </Card>
      </div>
    </TrackerContext.Provider>
  );
}
