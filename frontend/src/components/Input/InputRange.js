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

export const InputSlider = (props) => (
  <Slider
    min={1}
    max={500}
    value={props.value}
    handle={handle}
    tipFormatter={(value) => `${value}`}
    onChange={props.onChange}
    marks={{
      1: "1",
      500: "500",
    }}
  />
);

export const InputRange = (props) => (
  <Range
    allowCross={false}
    marks={{
      18: "18",
      82: "82",
    }}
    min={18}
    max={82}
    value={[props.values[0], props.values[1]]}
    tipFormatter={(value) => `${value}`}
    onChange={props.onChange}
  />
);
