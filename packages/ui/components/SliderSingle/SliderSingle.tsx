import { cva, VariantProps } from "cva";
import BaseSlider, { SliderProps } from "rc-slider";

type Props = {
  onChange: (val: number) => void;
  value: number;
};

type TypedOnChange = (val: number | number[]) => void;

const styles = cva([], {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

export const SliderSingle = ({
  onChange,
  value,
}: Props & VariantProps<typeof styles>) => {
  return (
    <BaseSlider
      className="ff6-slider"
      defaultValue={0}
      min={0}
      max={100}
      step={1}
      marks={{
        0: "0",
        50: "50",
        100: "100",
      }}
      onChange={onChange as TypedOnChange}
      value={value}
    />
  );
};
