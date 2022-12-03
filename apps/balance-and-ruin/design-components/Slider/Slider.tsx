import { cva, VariantProps } from "cva";
import { times } from "lodash";
import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export const Slider = <T extends number | number[]>({
  onChange,
  min = 0,
  max = 100,
  step: untypedStep = 1,
  value,
  ...rest
}: SliderProps<T> & VariantProps<typeof styles>) => {
  const step = untypedStep ?? 1;
  const steps = (max - min) / step;
  const every = steps > 10 ? 10 : steps > 6 ? 0.5 : step;

  const defaultMarks = {
    [min]: min,
    [max]: max,
  };

  return (
    <BaseSlider
      className="ff6-slider"
      step={step}
      min={min}
      max={max}
      marks={defaultMarks}
      {...(rest as SliderProps<number | number[]>)}
      onChange={onChange as BaseSliderProps["onChange"]}
      value={value as BaseSliderProps["value"]}
    />
  );
};