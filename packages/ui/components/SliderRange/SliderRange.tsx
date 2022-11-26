import { Slider, SliderProps } from "../Slider/Slider";

type RangeSliderValues = [number, number];

type Props = SliderProps<RangeSliderValues> & {
  onChange: (val: RangeSliderValues) => void;
  value: RangeSliderValues;
};

type TypedOnChange = (val: number | number[]) => void;

export const SliderRange = ({ onChange, value }: Props) => {
  return (
    <Slider
      className="ff6-slider"
      defaultValue={[25, 75]}
      min={0}
      max={100}
      step={1}
      marks={{
        0: "0",
        50: "50",
        100: "100",
      }}
      onChange={onChange as TypedOnChange}
      range
      value={value}
    />
  );
};
