import { Button, Card, HelperText, Input } from "@ff6wc/ui";
import { cx } from "cva";
import first from "lodash/first";
import { useEffect, useRef, useState } from "react";
import { MdClear, MdFileUpload } from "react-icons/md";
import { useSelector } from "react-redux";
import useSWRMutation from "swr/mutation";
import { selectRawFlags } from "~/state/flagSlice";
import { base64ToByteArray } from "~/utils/base64ToByteArray";
import { isValidROM, removeHeader } from "~/utils/romUtils";
import { XDelta3Decoder } from "~/utils/xdelta3_decoder";
import JSZip from "jszip";
import { useRouter } from "next/router";

export type FlagsCardProps = {
  className?: string;
};

type GenerateResponse = {
  filename: string;
  patch: string;
  seed_id: string;
  log: string;
};

export const GenerateCard = ({ className, ...rest }: FlagsCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const flags = useSelector(selectRawFlags);
  const [romData, setRomData] = useState<string | null>(null);
  const [romName, setRomName] = useState("");
  const [romSelectError, setRomSelectError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const hasRomData = Boolean(romData);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    const savedRomData = localStorage.getItem("rom_data");
    const savedRomName = localStorage.getItem("rom_name");

    if (savedRomData) {
      setRomData(savedRomData);
      setSuccess(true);
    }

    if (savedRomName) {
      setRomName(savedRomName);
    }
  }, [inputRef]);

  const { error, trigger, isMutating } = useSWRMutation(
    ["/api/generate", flags],
    async (key, { arg }) => {
      const result = await fetch("/api/generate", {
        body: JSON.stringify({ key: "ff6wc", flags: arg }),
        headers: {},
        method: "POST",
      });

      if (result.status !== 200) {
        const error = await result.text();
        throw new Error(`Error creating seed ${error}`);
      }

      const data = await result.json();
      return data as GenerateResponse;
    }
  );
  const generate = async () => {
    if (isMutating) {
      return;
    }
    const generateResult = await trigger(flags);
    if (!generateResult) {
      throw new Error("There was an error generating the rom");
    }
    const { filename, patch, seed_id, log } = generateResult;
    const rom = romData as string;

    const patched = XDelta3Decoder.decode(
      base64ToByteArray(patch as string),
      base64ToByteArray(rom)
    );

    const jsz = new JSZip();
    let zip = jsz.file(`${filename}.smc`, patched, { binary: true });
    zip = jsz.file(`${filename}.txt`, log);
    zip.generateAsync({ type: "blob" }).then((content) => {
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(content);
      link.download = `${filename}.zip`;
      link.click();
      router.push(`/seed/${seed_id}`);
    });
  };

  const clearRomValues = () => {
    localStorage.removeItem("rom_name");
    localStorage.removeItem("rom_data");
    setRomName("");
    setRomData(null);
    setSuccess(false);
    setRomSelectError(null);
  };

  const onRomSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = first(e.target.files);
    const reader = new FileReader();
    if (file) {
      reader.onload = async function () {
        let rom_data = new Uint8Array(reader.result as ArrayBuffer);
        rom_data = await removeHeader(rom_data);

        let result = await isValidROM(rom_data);
        if (!result.success) {
          setRomSelectError(`${result.message}`);
          return;
        }

        let data_string = "";
        let data_length = rom_data.byteLength;

        for (let i = 0; i < data_length; i++) {
          data_string += String.fromCharCode(rom_data[i]);
        }

        data_string = btoa(data_string);

        setSuccess(true);
        setRomSelectError(null);

        try {
          localStorage.setItem("rom_data", data_string);
          localStorage.setItem("rom_name", file.name);
          setRomData(data_string);
          setRomName(file.name);
        } catch (e) {
          return;
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const showDisabledText = !romData;
  return (
    <Card
      {...rest}
      className="max-w-[1200px]"
      contentClassName={cx("p-0 gap-3", className)}
      title="Generate"
    >
      <div className="flex flex-col gap-2">
        <h2 className={"font-medium text-base"}>
          Step 1: Select your flags above
        </h2>
        <span className="text-sm pl-3">{flags}&nbsp;</span>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className={"font-medium text-"}>
          Step 2: Select v1.0 US ROM file by clicking the input below
        </h2>
        <HelperText>
          Once you have selected a valid ROM it will be reused for future visits
        </HelperText>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col">
          <Button
            className="w-fit"
            disabled={hasRomData}
            onClick={() => inputRef.current?.click()}
            variant="outline"
          >
            <MdFileUpload className={"inline"} /> Upload v1.0 US ROM file..
          </Button>
          <Input
            className="h-fit"
            disabled
            ref={inputRef}
            placeholder="Upload ROM to continue"
            onChange={() => {}}
            value={romName}
          />
        </div>
        <Button
          className=""
          disabled={!hasRomData}
          onClick={clearRomValues}
          variant="outline"
        >
          <MdClear className={"inline"} /> Clear ROM
        </Button>
        <input
          className={"hidden"}
          id="rom_name"
          ref={inputRef}
          name="rom"
          onChange={onRomSelect}
          type="file"
        />
      </div>
      <div className="pl-3">
        {!success && !romSelectError && (
          <div className="text-yellow-500 font-semibold">
            Waiting for ROM upload
          </div>
        )}
        {success && (
          <div className={"text-green-500 font-semibold"}>Valid ROM </div>
        )}
        {romSelectError ? (
          <div className={"text-red-500 font-semibold"}>{romSelectError}</div>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className={"font-medium text-lg"}>Step 3: Click Generate!</h2>
        {showDisabledText ? (
          <HelperText>
            This button will be disabled until a valid ROM is selected
          </HelperText>
        ) : null}
      </div>

      <div className="pl-3">
        <Button
          disabled={!hasRomData || isMutating}
          onClick={generate}
          variant="primary"
        >
          Generate
        </Button>
        {error ? (
          <div className={"text-red-500 font-semibold"}>{error}</div>
        ) : null}{" "}
      </div>
    </Card>
  );
};
