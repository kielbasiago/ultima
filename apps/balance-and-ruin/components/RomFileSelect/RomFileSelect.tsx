import { ChangeEvent, useEffect, useRef, useState } from "react";
import first from "lodash/first";
import { isValidROM, removeHeader } from "~/utils/romUtils";
import { downloadBase64File } from "~/utils/downloadBase64File";
import { Button } from "~/design-components";
import useSWRMutation from "swr/mutation";
import { IpsPatcher } from "@ff6wc/ips-utils";

export const RomFileSelect = () => {
  const { trigger } = useSWRMutation<string>(
    "/api/generate-rom",
    async (key: string) => {
      const result = await fetch("/api/generate-rom", {
        method: "POST",
      });

      return result.text();
    }
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [romData, setRomData] = useState<string | null>(null);
  const [romName, setRomName] = useState<string | null>(null);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    const savedRomData = localStorage.getItem("rom_data");
    const savedRomName = localStorage.getItem("rom_name");

    // inputRef.current.textContent = savedRomName;

    if (savedRomData) {
      setRomData(savedRomData);
    }

    if (savedRomName) {
      setRomName(savedRomName);
    }
  }, [inputRef]);

  const onRomSelect = (e: ChangeEvent<HTMLInputElement>) => {
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

        try {
          localStorage.setItem("rom_data", data_string);
          localStorage.setItem("rom_name", file.name);
        } catch (e) {
          return;
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const generate = async () => {
    const rawPatch = await trigger();
    const patch = atob(rawPatch as string);
    const rom = atob(romData as string);
    const dec = new TextDecoder();
    const enc = new TextEncoder();
    const patcher = new IpsPatcher();

    if (patcher.isValidPatch(patch)) {
      const u8arr = enc.encode(patch);
      await patcher.parseFile(u8arr);
      const result = await patcher.apply(enc.encode(rom));
      downloadBase64File(btoa(dec.decode(result)), "ff3-wc.smc");
    } else {
      throw "Unexpected start of file: " + patch.slice(0, 50);
    }
  };

  return (
    <div className="flex flex-grow p-6">
      <div className="flex flex-col">
        <input
          className={"hidden"}
          id="rom_name"
          ref={inputRef}
          name="rom"
          onChange={onRomSelect}
          type="file"
        />
        <Button onClick={() => inputRef.current?.click()}>Select File</Button>
        {error && <div className={"text-red-500"}>{error}</div>}
      </div>
      <Button onClick={generate}>Generate</Button>
    </div>
  );
};
