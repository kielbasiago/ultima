import { ChangeEvent, useEffect, useRef, useState } from "react";
import first from "lodash/first";
import { isValidROM, removeHeader } from "~/utils/romUtils";
import { Button } from "~/design-components";
import useSWRMutation from "swr/mutation";
import { XDelta3Decoder } from "~/utils/xdelta3_decoder";

function base64ToByteArray(base64: string) {
  var raw = atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

function saveByteArray(fileName: string, bytes: Uint8Array) {
  var blob = new Blob([bytes], { type: "application/pdf" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

export const RomFileSelect = () => {
  const { trigger } = useSWRMutation<string>(
    "/api/generate-rom",
    async (key: string) => {
      const result = await fetch("/api/generate-rom", {
        method: "POST",
      });

      const b64result = await result.text();
      return b64result;
    }
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [success, setSuccess] = useState(false);
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
      setSuccess(true);
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

        setSuccess(true);

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
    const patch = await trigger();
    const rom = romData as string;

    const patched = XDelta3Decoder.decode(
      base64ToByteArray(patch as string),
      base64ToByteArray(rom)
    );

    saveByteArray("ff3-wc.smc", patched as Uint8Array);
    // const result = await patcher.apply(enc.encode(rom));
    // downloadBase64File(btoa(dec.decode(patched)), "ff3-wc-5.smc");
    // downloadBase64File(btoa(patch), "ff3-wc-4.ips");
  };

  return (
    <div className="flex flex-grow p-6">
      <div className="flex flex-col gap-5">
        <div>
          <h2 className={"text-lg font-semibold"}>Step 1: Select ROM</h2>
          <input
            className={"hidden"}
            id="rom_name"
            ref={inputRef}
            name="rom"
            onChange={onRomSelect}
            type="file"
          />
          <Button onClick={() => inputRef.current?.click()}>Select File</Button>
        </div>

        {success && <div className={"text-green-500"}>Valid ROM</div>}
        {error && <div className={"text-red-500"}>{error}</div>}
        <div>
          <h2 className={"text-lg font-semibold"}>Step 2: Click Generate</h2>
          <Button onClick={generate}>Generate</Button>
        </div>
      </div>
    </div>
  );
};
