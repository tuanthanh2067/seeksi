import React from "react";

const EditAvatar = (props) => {
  return (
    <div className="h-full" id="avt">
      <input
        type="file"
        id="upload-avt"
        accept="image/*"
        onChange={props.handleChange}
        hidden
      />
      <label
        htmlFor="upload-avt"
        className={`flex text-white bg-secondary block h-full text-center hover:opacity-90 hover:text-lg hover:text-bold `}
      >
        <div className="m-auto">Upload</div>
      </label>
    </div>
  );
};

export default EditAvatar;
