import { cva, VariantProps } from "cva";
import BaseSlider, { SliderProps as BaseSliderProps } from "rc-slider";

export type SliderProps<T extends number | number[]> = BaseSliderProps<T> & {
  onChange?: (val: T) => void;
  value?: T;
};

const styles = cva([], {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

export const Slider = <T extends number | number[]>({
  onChange,
  value,
  ...rest
}: SliderProps<T> & VariantProps<typeof styles>) => {
  return (
    <BaseSlider
      className="ff6-slider"
      min={0}
      max={100}
      step={1}
      marks={{
        0: "0",
        50: "50",
        100: "100",
      }}
      {...(rest as SliderProps<number | number[]>)}
      onChange={onChange as BaseSliderProps["onChange"]}
      value={value as BaseSliderProps["value"]}
    />
  );
};
