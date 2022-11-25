import BaseSlider from "rc-slider";

type Props = {
  onChange: (val: number[]) => void;
  value: number[];
};

type TypedOnChange = (val: number | number[]) => void;

export const SliderRange = ({ onChange, value }: Props) => {
  return (
    <BaseSlider
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
