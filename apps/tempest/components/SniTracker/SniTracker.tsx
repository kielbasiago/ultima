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

  const { error: devicesError, isLoading } = useSWR(
    ["devices"],
    async () => {
      pushLog("Loading devices...");
      const result = await fetchDevices(hostname).catch((err) => {
        pushLog(err);
        throw err;
      });
      const devicesList = result.devicesList;

      setDevices(devicesList);
      pushLog(`${devicesList.length} devices found`);

      if (devicesList.length && !activeDevice) {
        const newDevice = devicesList.at(0)!;
        setActiveDevice(newDevice);
        pushLog(`No active device set, updating to ${newDevice.displayname}`);
        connectStream(newDevice.uri);
      }
      render();
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

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
    });
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

      if (!isEqual(dataRef.current, responseData)) {
        // TODO: DOCTORDT
        // At this point something changed between the previous / new data
		// responseData keys: ...
		// "characters" (14)
		// "events" (54)
		// "dragons" (16), both "iceDragon" and "narsheDragon", e.g.
		// "allFlags" (84), all of the above
		// "characterCount": 0,
		// "esperCount": 0,  <-- track this
		// "checkCount": 0, 
		// "dragonCount": 0,
		// "bossCount": 0,
		// "gameTime": 0,  <-- useful for new game / reset, maybe?
		// "saveCheck": 0, <-- save checksum, useful for testing SAVE GAME events.
		// "chestCount": 0, <-- track this
		
        // Find the changes 
		const diff = {};
		// Track characters, events, dragons
		for (const key in responseData.allFlags) {
			if (responseData.allFlags[key] != dataRef.current.allFlags[key]) {
				diff[key] = responseData.allFlags[key]
			}
		}
		// Track espers
		if (responseData.esperCount != dataRef.current.esperCount) {
			diff['esperCount'] = responseData.esperCount
		}
		// Track chests
		if (responseData.chestCount != dataRef.current.chestCount) {
			diff['chestCount'] = responseData.chestCount
		}
		
		// TESTING: write monster formation 
		if (responseData.formID != dataRef.current.formID) {
			diff['formation'] = responseData.formID
		}
		// TESTING: write gg bit
		if (responseData.ggBit != dataRef.current.ggBit) {
			diff['gg_bit'] = responseData.ggBit
		}
		
		// Write the log string
		let thislog = '';
		let ctr = Object.keys(diff).length;
		
		// Catch special cases
		if (dataRef.current.saveCheck == 0) {
			// Catch initialization
			//thislog += '*TRACKING STARTED*'
	    } else if (responseData.gameTime == 0 && responseData.characterCount > 0 && dataRef.current.gameTime == 0 && dataRef.current.characterCount == 0) {
			// Catch NewGame
			thislog += '*NEW GAME*';
		} else if (responseData.saveCheck != dataRef.current.saveCheck) {  
			// Catch save game event
			thislog += '*SAVE GAME*';
		} else if (responseData.gameTime > 0 && responseData.characterCount > 0 && dataRef.current.characterCount == 0) {  
			// Catch load game
			thislog += '*LOAD GAME*';
		} else if (responseData.characterCount == 0 && responseData.gameTime < 1 && dataRef.current.saveCheck != 0) {  
			// Catch reset game
			thislog += '*RESET*';
		} else if (dataRef.current.onTier > 0 && (responseData.onTier - dataRef.current.onTier) == 1) {  
			// Catch defeated a tier
			thislog += 'Defeated Tier ' + dataRef.current.onTier;
		} else if (responseData.gg == 1 && dataRef.current.gg == 0) {  
			// Catch beat the game
			thislog += 'Defeated Kefka - gg!';
		} else {
			for (const key in diff) {
				thislog += `${key}: ${diff[key]}`;
				ctr -= 1;
				if (ctr > 0) {
					thislog += '\n\t';
				}
			}
		}
		// for (const key in diff) {
		// 	console.log(`${key}: ${diff[key]}`);
		// }
		
		// Append each row to the adventure log here (if not empty)
		if (thislog) {
			const thistime = new Date();
			//thistime = `[${new Date().toISOString()}] `;
			if (responseData.gg == 1) {
				// Adjust timing to match "crackow" instead of dissolve
				thistime.setSeconds(thistime.getSeconds() - 5);
			}
			pushAdventureLog(`[${thistime.toISOString()}] ` + thislog);
		}
      } else {
        //pushAdventureLog(`[${new Date().toISOString()}] Nothing has changed `);
      }

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

  if (devicesError) {
    status = Status.ERROR;
  } else if (isLoading) {
    status = Status.LOADING;
  } else if (data) {
    status = Status.ACTIVE;
  }

  if (simple) {
    return (
      <TrackerContext.Provider value={providerData}>
        <div className="flex flex-col gap-2 relative p-6">
          <PageContainer>
            <div className="flex flex-col relative justify-center gap-2">
              <EmoTrackerLayout />
              {devicesError ? (
                <OverlayMessage messages={[devicesError]} />
              ) : null}
              {noDevices ? (
                <OverlayMessage
                  messages={[
                    "No devices found",
                    "Make sure you have connected your emulator to SNI",
                  ]}
                />
              ) : null}
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
            {devicesError ? <OverlayMessage messages={[devicesError]} /> : null}
            {noDevices ? (
              <OverlayMessage
                messages={[
                  "No devices found",
                  "Make sure you have connected your emulator to SNI",
                ]}
              />
            ) : null}
          </div>
        </Card>
        <Card title="Status">
          {status === Status.ACTIVE ? (
            <span className="text-green-500 text-sm">Tracking</span>
          ) : null}
          {status === Status.LOADING ? (
            <span className="text-yellow-500 text-sm">Loading devices</span>
          ) : null}
          {status === Status.ERROR ? (
            <span className="text-red-500 text-sm">{devicesError}</span>
          ) : null}

          {status === Status.DISCONNECTED ? (
            <span className="text-zinc-400 text-sm">Waiting for activity</span>
          ) : null}
        </Card>
        <Card title="Settings">
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
        </Card>

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
