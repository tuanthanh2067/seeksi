import React from "react";

const EditImage = (props) => {
  return (
    <div className="h-full w-full">
      <input
        type="file"
        id="upload-img"
        accept="image/*"
        onChange={props.handleChange}
        hidden
      />
      <label
        htmlFor="upload-img"
        className={`flex text-white bg-secondary block h-full text-center rounded-md hover:opacity-90 hover:text-lg hover:text-bold `}
      >
        <div className="m-auto">Upload</div>
      </label>
    </div>
  );
};

export default EditImage;
