import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} km`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

export const InputSlider = ({ min, max, value, onChange, marks }) => (
  <Slider
    min={min}
    max={max}
    value={value}
    handle={handle}
    tipFormatter={(value) => `${value}`}
    onChange={onChange}
    marks={marks}
  />
);

export const InputRange = ({ min, max, values, onChange, marks }) => (
  <Range
    allowCross={false}
    min={min}
    max={max}
    marks={marks}
    value={[values[0], values[1]]}
    tipFormatter={(value) => `${value}`}
    onChange={onChange}
  />
);
