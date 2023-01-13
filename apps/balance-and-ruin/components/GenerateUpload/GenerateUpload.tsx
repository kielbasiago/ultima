import { Button, HelperText } from "@ff6wc/ui";
import { cva } from "cva";
import { MdClear, MdFileUpload } from "react-icons/md";

export type GenerateUploadProps = {
  clearRomValues: () => any;
  shortRomName: string;
  hasRomData: boolean;
  onRomSelect: (e: React.ChangeEvent<HTMLInputElement>) => any;
  romName: string;
  error: string | null;
  success: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
};

const needRomDataStyles = cva([], {
  variants: {
    hasRomData: {
      true: ["hidden"],
      false: ["block"],
    },
  },
});

export const GenerateUpload = ({
  clearRomValues,
  hasRomData,
  inputRef,
  onRomSelect,
  romName,
  shortRomName,
  error,
  success,
}: GenerateUploadProps) => {
  return (
    <>
      <h3>Step 2: Select v1.0 US ROM file by clicking the input below</h3>
      <div className="pl-3">
        {!success && !error && (
          <div className="text-yellow-500 font-semibold subtle-text tracking-wide">
            Waiting for ROM upload
          </div>
        )}
        {success && (
          <div
            className={"text-green-500 font-semibold subtle-text tracking-wide"}
          >
            Valid ROM
          </div>
        )}
        {error ? (
          <div
            className={"text-red-500 font-semibold subtle-text tracking-wider"}
          >
            {error}
          </div>
        ) : null}
      </div>

      <div
        className={needRomDataStyles({
          className: "flex gap-4",
          hasRomData,
        })}
      >
        <div className="flex flex-col gap-2">
          <HelperText>
            Once you have selected a valid ROM it will be reused for future
            visits
          </HelperText>

          <Button
            className="w-fit"
            onClick={() => inputRef.current?.click()}
            variant="primary"
          >
            <MdFileUpload className={"inline"} /> Upload v1.0 US ROM file..
          </Button>
        </div>
        <input
          className={"hidden"}
          id="rom_name"
          ref={inputRef}
          name="rom"
          onChange={onRomSelect}
          type="file"
        />
      </div>
      <div
        className={needRomDataStyles({
          className:
            "flex flex-col items-start md:max-w-[500px] md:flex-row md:items-center gap-4",
          hasRomData: !hasRomData,
        })}
      >
        <HelperText>
          A ROM named&nbsp;
          <strong
            className="text-sm tracking-widest underline underline-offset-2"
            title={romName}
          >
            {shortRomName}
          </strong>
          &nbsp;was previously uploaded and validated. To select another ROM,
          click Clear ROM
        </HelperText>

        <Button
          className="w-fit flex-shrink-0"
          disabled={!hasRomData}
          onClick={clearRomValues}
          size="small"
          variant="danger"
        >
          <MdClear className={"inline"} /> Clear ROM
        </Button>
      </div>
    </>
  );
};
