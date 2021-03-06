import React from "react";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";

const Dropdown = ({
  id,
  name,
  options = [],
  defaultValue,
  width = "50vw",
  placeholder,
  isMulti = false,
  isClearable = false,
  onChange,
}) => {
  const animatedComponents = makeAnimated();

  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
      borderRadius: "0.375rem",
      boxShadow: "inset 0 4px 4px 0 rgba(0, 0, 0, 0.25)",
      maxWidth: `${width}`,
      minHeight: "3rem",
    }),
    menu: (provided) => ({
      ...provided,
      maxWidth: `${width}`,
      backgroundColor: "white",
    }),
    option: (provided) => ({
      ...provided,
      color: "#000000A8",
      maxWidth: `${width}`,
      border: "1px",
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#f06c9b33",
      color: "#000000",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: "#f06c9b99",
        color: "white",
      },
    }),
  };

  const values = isMulti
    ? options.filter((option) => defaultValue.includes(option.label))
    : options.filter((option) => option.label === defaultValue);

  return (
    <Select
      id={id}
      name={name}
      closeMenuOnSelect={!isMulti}
      components={{ Placeholder, animatedComponents }}
      placeholder={placeholder}
      isMulti={isMulti}
      isClearable={isClearable}
      options={options}
      value={values}
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary: "#f06c9b99",
          primary25: "#f06c9b33",
          primary50: "#f06c9b33",
        },
      })}
      onChange={onChange}
    />
  );
};

export default Dropdown;
