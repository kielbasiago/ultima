import { Button, Card, HelperText, Input, Link } from "@ff6wc/ui";
import { cx } from "cva";
import JSZip from "jszip";
import first from "lodash/first";
import { useRef, useState } from "react";
import { MdClear, MdFileUpload } from "react-icons/md";
import { SeedCardProps } from "~/components/SeedCard/SeedCard";
import { ROM_FILE_EXTENSIONS } from "~/constants/romConstants";
import { base64ToByteArray } from "~/utils/base64ToByteArray";
import { XDelta3Decoder } from "~/utils/xdelta3_decoder";

export const MusicSeedCard = ({ className, seed, ...rest }: SeedCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [romName, setRomName] = useState<string | null>(null);
  const [romData, setRomData] = useState<string | null>(null);
  const [jsz, setJsz] = useState<JSZip | null>(null);
  const [zipName, setZipName] = useState("");
  const [zipSelectError, setZipSelectError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const hasRomData = Boolean(romData);

  const generate = async () => {
    if (!romData || !jsz || !romName) {
      return;
    }
    const { filename, patch, seed_id, log: spoiler_log } = seed;

    const patched = XDelta3Decoder.decode(
      base64ToByteArray(patch),
      base64ToByteArray(romData)
    );

    jsz.file(romName, patched, { binary: true });
    jsz.file(`${filename}.txt`, spoiler_log);
    jsz.generateAsync({ type: "blob" }).then((content) => {
      clearRomValues();
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(content);
      link.download = `${filename}.zip`;
      link.click();
    });
  };

  const clearRomValues = () => {
    setJsz(null);
    setZipName("");
    setRomData(null);
    setSuccess(false);
    setZipSelectError(null);
  };

  const onZipSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipSelectError(null);
    const file = first(e.target.files);
    const reader = new FileReader();
    if (file) {
      reader.onload = async function () {
        let zip_data = new Uint8Array(reader.result as ArrayBuffer);
        let data_string = "";
        let data_length = zip_data.byteLength;

        for (let i = 0; i < data_length; i++) {
          data_string += String.fromCharCode(zip_data[i]);
        }

        data_string = btoa(data_string);

        const jszip = new JSZip();
        const zip = await jszip.loadAsync(zip_data);

        const rom = Object.values(zip.files).find(({ name }) =>
          ROM_FILE_EXTENSIONS.some((ext) => name.endsWith(ext))
        );

        if (!rom) {
          setZipSelectError(
            "Invalid file - No file ending in .smc or .sfc was found in the zip"
          );
          return;
        }

        const data = await rom.async("base64");

        const others = Object.values(zip.files).filter(
          ({ name }) => name !== rom?.name
        );

        try {
          zip.remove(rom.name);
          setJsz(zip);
          setRomData(data);
          setRomName(rom.name);
          setZipName(file.name);
          setSuccess(true);
        } catch (e: unknown) {
          setZipSelectError((e as Error)?.message);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const showHelperText = !hasRomData;
  const disableGenerate = !hasRomData;

  return (
    <Card
      {...rest}
      contentClassName={cx("p-0 gap-3", className)}
      title={
        <>
          Randomize music using{" "}
          <Link href="https://github.com/emberling/johnnydmad">johnnydmad</Link>
        </>
      }
    >
      <div className="flex flex-col gap-2">
        <p className="text-red-500 font-semibold p-4 bg-white w-fit">
          <span>Randomizing music will significantly modify load speeds</span>
        </p>

        <h2 className={"font-medium text-lg"}>
          Step 1:{" "}
          <span className="">
            <Link href="/">Generate an FF6WC zip file</Link>
          </span>
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className={"font-medium text-lg"}>
          Step 2: Upload the created zip
        </h2>
      </div>

      <div className="flex min-h-[30px] gap-1 pl-3">
        <Button
          className="flex items-center gap-1"
          disabled={hasRomData}
          onClick={() => inputRef.current?.click()}
          variant="outline"
        >
          <MdFileUpload className={"inline"} /> Upload FF6WC zip file..
        </Button>
        <Input
          disabled
          ref={inputRef}
          placeholder="Upload ROM to continue"
          onChange={() => {}}
          value={zipName}
        />
        <Button
          className="flex items-center gap-1"
          disabled={!hasRomData}
          onClick={clearRomValues}
          variant="outline"
        >
          <MdClear className={"inline"} /> Clear upload
        </Button>
        <input
          accept=".zip"
          className={"hidden"}
          id="rom_name"
          ref={inputRef}
          name="rom"
          onChange={onZipSelect}
          type="file"
        />
      </div>
      <div className="pl-3">
        {!success && !zipSelectError && (
          <div className="text-yellow-500 font-semibold">
            Waiting for upload
          </div>
        )}
        {success && (
          <div className={"text-green-500 font-semibold"}>Valid upload</div>
        )}
        {zipSelectError ? (
          <div className={"text-red-500 font-semibold"}>{zipSelectError}</div>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className={"font-medium text-lg"}>Step 3: Click Generate!</h2>
        {showHelperText ? (
          <HelperText>
            Please upload a valid FF6WC zip above to continue
          </HelperText>
        ) : null}
      </div>

      <div className="fle flex-col gap-2 pl-3">
        <Button disabled={disableGenerate} onClick={generate} variant="primary">
          Generate
        </Button>
      </div>
    </Card>
  );
};
