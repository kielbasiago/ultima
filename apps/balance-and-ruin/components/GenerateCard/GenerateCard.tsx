import {
  Button,
  Card,
  CodeBlock,
  Divider,
  HelperText,
  Input,
  Link,
} from "@ff6wc/ui";
import { cva, cx } from "cva";
import first from "lodash/first";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdClear, MdFileUpload } from "react-icons/md";
import { useSelector } from "react-redux";
import useSWRMutation from "swr/mutation";
import { getFlagValue, selectFlagValues } from "~/state/flagSlice";
import { base64ToByteArray } from "~/utils/base64ToByteArray";
import { isValidROM, removeHeader } from "~/utils/romUtils";
import { XDelta3Decoder } from "~/utils/xdelta3_decoder";
import JSZip from "jszip";
import { useRouter } from "next/router";
import { selectSchema } from "~/state/schemaSlice";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { GenerateUpload } from "~/components/GenerateUpload/GenerateUpload";

export type FlagsCardProps = {
  className?: string;
  enableEditing?: boolean;
};

type GenerateResponse = {
  filename: string;
  patch: string;
  seed_id: string;
  log: string;
};

const useOrderedFlags = () => {
  const schema = useSelector(selectSchema);
  const flagValues = useSelector(selectFlagValues);
  return useMemo(() => {
    const keys = Object.keys(schema);
    return keys.reduce((acc, key) => {
      const additional = getFlagValue(key, flagValues[key]);
      return `${acc} ${additional}`.trim();
    }, "");
  }, [flagValues, schema]);
};

const textareaStyles = cva([
  "text-sm",
  "max-h-[600px] bg-gray-200 dark:bg-gray-900 p-4",
  "whitespace-normal font-mono break-words box-decoration-clone",
  "overflow-auto",
]);

const needRomDataStyles = cva([], {
  variants: {
    hasRomData: {
      true: ["hidden"],
      false: ["block"],
    },
  },
});

export const GenerateCard = ({
  className,
  enableEditing = false,
  ...rest
}: FlagsCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const flags = useSelector(selectRawFlags);
  const [romData, setRomData] = useState<string | null>(null);
  const [romName, setRomName] = useState("");
  const [romSelectError, setRomSelectError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const ext = romName.slice(romName.length - 7, romName.length);
  const displayRomName = !romName
    ? ""
    : romName.length > 20
    ? romName.slice(0, 8).concat("...", ext)
    : romName;

  const flags = useOrderedFlags();
  const router = useRouter();

  const { executeRecaptcha } = useGoogleReCaptcha();

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
      const { flags, reCAPTCHA } = arg;
      const result = await fetch("/api/generate", {
        body: JSON.stringify({ reCAPTCHA, flags }),
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

    let reCAPTCHA: string | null = null;
    if (!executeRecaptcha) {
      console.warn("recaptcha not available");
    } else {
      reCAPTCHA = await executeRecaptcha("generate_seed");
    }

    const generateResult = await trigger({ flags, reCAPTCHA });
    if (!generateResult) {
      throw new Error("There was an error generating the ROM");
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

  const [editable, setEditable] = useState(false);
  const textarearef = useRef<HTMLTextAreaElement>(null);

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
      <div className="flex flex-col gap-2 w-full h-full">
        <h3 className={"font-medium text-base"}>
          Step 1: Select your flags above
        </h3>
        <textarea
          className={cx(
            textareaStyles(),
            "h-full w-full p-4 min-h-[300px] text-xs"
          )}
          disabled
          value={flags}
        />
        {!enableEditing || !editable ? null : (
          <CodeBlock>
            <textarea
              className="w-full min-h-"
              ref={textarearef}
              value={flags}
            />
          </CodeBlock>
        )}
      </div>
      <Divider />

      <GenerateUpload
        clearRomValues={clearRomValues}
        hasRomData={hasRomData}
        romName={romName}
        shortRomName={displayRomName}
        error={romSelectError}
        inputRef={inputRef}
        onRomSelect={onRomSelect}
        success={success}
      />
      <Divider />

      <div className="flex flex-col gap-2">
        <h3 className={"font-medium text-lg"}>Step 3: Click Generate!</h3>
        {showDisabledText ? (
          <HelperText>
            This button will be disabled until a valid ROM is selected
          </HelperText>
        ) : null}
      </div>

      <div className="pl-3 flex flex-col gap-4">
        <Button
          className={"w-fit p-8 text-xl"}
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
