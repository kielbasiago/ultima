import { Button, Card, Input } from "@ff6wc/ui";
import { cx } from "cva";
import first from "lodash/first";
import { useEffect, useRef, useState } from "react";
import { MdClear } from "react-icons/md";
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
      className={cx("flex-col flex p-0", className)}
      title="Flags"
    >
      <div className="flex justify-between items-center gap-12">
        <span className="flex-shrink">{flags}&nbsp;</span>
      </div>
      <div className="flex min-h-[30px] gap-1">
        <Button
          className="flex items-center gap-1"
          disabled={!hasRomData}
          onClick={clearRomValues}
          variant="outline"
        >
          <MdClear className={"inline"} /> Clear ROM
        </Button>
        <Input
          className={"cursor-pointer"}
          disabled={Boolean(romData)}
          onClick={() => {
            inputRef.current?.click();
          }}
          ref={inputRef}
          placeholder="Click to select file..."
          onChange={() => {}}
          value={romName}
        />
        <input
          className={"hidden"}
          id="rom_name"
          ref={inputRef}
          name="rom"
          onChange={onRomSelect}
          type="file"
        />
        <Button onClick={generate} variant="primary">
          Generate
        </Button>
      </div>
    </Card>
  );
};
