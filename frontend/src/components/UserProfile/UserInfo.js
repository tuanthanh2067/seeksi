import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import defaultAvt from "../../assets/mock_avatar.png";
import AgeLogo from "../../assets/age_logo.png";
import GenderLogo from "../../assets/gender_logo.png";
import LocationLogo from "../../assets/location_logo.png";
import RoundedButton from "../Buttons/RoundedButton";
import EditAvatar from "../Image/EditAvatar";
import OvalImage from "../Image/OvalImage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

const ProfilePage = (props) => {
  const navigate = useNavigate();
  const [avt, setAvt] = useState(
    props.user.avatar ? props.user.avatar.medium : defaultAvt
  );
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const currentUserID = decodedToken.userId;

  const handleEdit = () => navigate(`/edit/${id}`);
  const onAvtChange = (e) => setAvt(URL.createObjectURL(e.target.files[0]));
  const handleAvtRemove = () => setAvt("");

  const getAge = (birthday) => {
    const userDOB = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - userDOB.getFullYear();
    const month = today.getMonth() - userDOB.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < userDOB.getDate())) {
      age--;
    }
    return age;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-5 sm:p-5">
        <div className="grid grid-cols-3 gap-5">
          <div className="w-52 h-52 justify-self-center overflow-hidden rounded-full">
            {props.isEdit ? (
              avt ? (
                <OvalImage src={avt} handleRemove={handleAvtRemove} />
              ) : (
                <EditAvatar handleChange={onAvtChange} avatar={defaultAvt} />
              )
            ) : (
              <img
                src={props.user.avatar ? props.user.avatar.medium : defaultAvt}
                alt="user avatar"
                className="object-contain"
              />
            )}
          </div>
          <div className="col-span-2 h-52 self-center flex flex-col justify-between">
            <div className="block text-lg">
              <p className="text-2xl text-primary font-bold">
                {props.user.firstName} {props.user.lastName}
              </p>
              <div className="flex gap-16 mt-2">
                <div className="flex gap-2">
                  <div className="w-6 h-6">
                    <img src={AgeLogo} alt="age logo" />
                  </div>
                  <p>{getAge(props.user.dob)}</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6">
                    <img src={GenderLogo} alt="gender logo" />
                  </div>
                  <p>{capitalizeFirstLetter(props.user.sex)}</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 flex justify-center">
                    <img src={LocationLogo} alt="location logo" />
                  </div>
                  {props.user.location ? (
                    <p>
                      {props.user.location.city}, {props.user.location.province}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <p className="mt-2">
                <span className="font-bold">Hobbies: </span>

                {props.user.hobbies ? props.user.hobbies.join(", ") : ""}
              </p>
              <p className="mt-2">{props.user.bio ? props.user.bio : ""}</p>
            </div>
            {currentUserID === id &&
              (props.isEdit ? (
                <RoundedButton
                  btnName="Delete account"
                  bgColor={"bg-secondary"}
                  borderColor={"border-secondary"}
                  fontSize={"text-lg"}
                  paddingLR={"px-4 w-1/3"}
                  hover={
                    "hover:bg-white hover:text-secondary hover:border-secondary"
                  }
                  handleClick={() => {
                    props.showDeleteConfirm(true);
                  }}
                />
              ) : (
                <RoundedButton
                  btnName="Edit Profile"
                  bgColor={"bg-secondary"}
                  borderColor={"border-secondary"}
                  fontSize={"text-lg"}
                  paddingLR={"px-6 w-2/3"}
                  hover={
                    "hover:bg-white hover:text-secondary hover:border-secondary"
                  }
                  handleClick={handleEdit}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;