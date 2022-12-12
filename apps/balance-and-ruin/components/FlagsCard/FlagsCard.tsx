import { Button, Card, HelperText, Input } from "@ff6wc/ui";
import { cx } from "cva";
import first from "lodash/first";
import { useEffect, useRef, useState } from "react";
import { MdClear, MdFileUpload } from "react-icons/md";
import { useSelector } from "react-redux";
import useSWRMutation from "swr/mutation";
import { selectRawFlags } from "~/state/flagSlice";
import { base64ToByteArray } from "~/utils/base64ToByteArray";
import { downloadByteArray } from "~/utils/downloadByteArray";
import { isValidROM, removeHeader } from "~/utils/romUtils";
import { XDelta3Decoder } from "~/utils/xdelta3_decoder";

export type FlagsCardProps = {
  className?: string;
};

export const FlagsCard = ({ className, ...rest }: FlagsCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const flags = useSelector(selectRawFlags);
  const [romData, setRomData] = useState<string | null>(null);
  const [romName, setRomName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const hasRomData = Boolean(romData);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    const savedRomData = localStorage.getItem("rom_data");
    const savedRomName = localStorage.getItem("rom_name");

    // inputRef.current.textContent = savedRomName;

    if (savedRomData) {
      setRomData(savedRomData);
      setSuccess(true);
    }

    if (savedRomName) {
      setRomName(savedRomName);
    }
  }, [inputRef]);

  const { trigger, isMutating } = useSWRMutation<string>(
    "/api/generate",
    async (key: string) => {
      const result = await fetch("/api/generate", {
        body: JSON.stringify({ flags }),
        headers: {},
        method: "POST",
      });

      const b64result = await result.text();
      return b64result;
    }
  );
  const generate = async () => {
    if (isMutating) {
      return;
    }
    const patch = await trigger();
    const rom = romData as string;

    const patched = XDelta3Decoder.decode(
      base64ToByteArray(patch as string),
      base64ToByteArray(rom)
    );

    downloadByteArray("ff3-wc.smc", patched as Uint8Array);
  };

  const clearRomValues = () => {
    localStorage.removeItem("rom_name");
    localStorage.removeItem("rom_data");
    setRomName("");
    setRomData(null);
    setSuccess(false);
    setError(null);
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
          setError(`${result.message}`);
          return;
        }

        let data_string = "";
        let data_length = rom_data.byteLength;

        for (let i = 0; i < data_length; i++) {
          data_string += String.fromCharCode(rom_data[i]);
        }

        data_string = btoa(data_string);

        setSuccess(true);
        setError(null);

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

  return (
    <Card
      {...rest}
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
      <div className="flex min-h-[30px] gap-1 pl-3">
        <Button
          className="flex items-center gap-1"
          disabled={hasRomData}
          onClick={() => inputRef.current?.click()}
          variant="outline"
        >
          <MdFileUpload className={"inline"} /> Upload v1.0 US ROM file..
        </Button>
        <Input
          disabled
          ref={inputRef}
          placeholder="Upload ROM to continue"
          onChange={() => {}}
          value={romName}
        />
        <Button
          className="flex items-center gap-1"
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
        {!success && !error && (
          <div className="text-yellow-500 font-semibold">
            Waiting for ROM upload
          </div>
        )}
        {success && (
          <div className={"text-green-500 font-semibold"}>Valid ROM </div>
        )}
        {error && <div className={"text-red-500 font-semibold"}>{error}</div>}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className={"font-medium text-lg"}>Step 3: Click Generate!</h2>
        <HelperText>
          This button will be disabled until a valid ROM is selected
        </HelperText>
      </div>

      <div className="pl-3">
        <Button disabled={!hasRomData} onClick={generate} variant="primary">
          Generate
        </Button>
      </div>
    </Card>
  );
};
