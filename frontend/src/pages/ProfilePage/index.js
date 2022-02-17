import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "../../components/Navbar/index";
import defaultAvt from "../../assets/mock_avatar.png";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import AgeLogo from "../../assets/age_logo.png";
import GenderLogo from "../../assets/gender_logo.png";
import LocationLogo from "../../assets/location_logo.png";
import RoundedButton from "../../components/Buttons/RoundedButton";
import Spinner from "../../components/Spinner/Spinner";
import EditAvatar from "../../components/Image/EditAvatar";
import OvalImage from "../../components/Image/OvalImage";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/User";
import React, { useState } from "react";
import EditMode from "./EditMode/EditMode";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [avt, setAvt] = useState("");
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const currentUserID = decodedToken.userId;

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: id },
  });

  const handleCancel = () => setEditMode(false);
  const handleAvtRemove = () => setAvt("");
  const handleDeleteAcc = () => alert("delete account");
  const handleEditMode = () => setEditMode(true);
  const onAvtChange = (e) => setAvt(URL.createObjectURL(e.target.files[0]));

  const getImgArr = () => {
    let images = [];
    data.userById.photo.map((pic) => images.push(pic.large));
    return images;
  };

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
      <Navbar />
      {loading && <Spinner />}
      {error && (
        <div className="flex h-screen w-full justify-center items-center">
          <div className="text-2xl">
            An error occurs! Please try again later 😕
          </div>
        </div>
      )}
      {!loading && !data && (
        <div className="flex h-screen w-full justify-center items-center">
          <div className="text-2xl">
            Looks like the user you're looking for does not exist 😕
          </div>
        </div>
      )}

      {!loading && data && (
        <main className="mt-16">
          <section className="container mx-auto px-4 py-5 sm:p-5">
            <div className="flex flex-col lg:flex-row items-center justify-evenly">
              <div className="w-36 h-36 sm:w-48 sm:h-48 overflow-hidden rounded-full">
                {editMode ? (
                  avt ? (
                    <OvalImage src={avt} handleRemove={handleAvtRemove} />
                  ) : (
                    <EditAvatar handleChange={onAvtChange} />
                  )
                ) : data.userById.avatar ? (
                  <img
                    src={data.userById.avatar.medium}
                    alt="user avatar"
                    className="object-contain"
                  />
                ) : (
                  <img
                    src={defaultAvt}
                    alt="user avatar"
                    className="object-contain"
                  />
                )}
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="flex flex-col items-center justify-center lg:items-start">
                  <p className="text-lg text-primary font-bold">
                    {data.userById.firstName} {data.userById.lastName}
                  </p>
                  <div className="grid grid-cols-3 w-full justify-items-center sm:justify-items-start mt-4 lg:mt-2">
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 mr-1">
                        <img src={AgeLogo} alt="age logo" />
                      </div>
                      <p>{getAge(data.userById.dob)}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 mr-1">
                        <img src={GenderLogo} alt="gender logo" />
                      </div>
                      <p>{capitalizeFirstLetter(data.userById.sex)}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 flex justify-center">
                        <img src={LocationLogo} alt="location logo" />
                      </div>
                      {data.userById.location ? (
                        <p>
                          {data.userById.location.city},{" "}
                          {data.userById.location.province}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <p className="mt-4 lg:mt-2">
                    <span className="font-bold">Hobbies: </span>

                    {data.userById.hobbies
                      ? data.userById.hobbies.join(", ")
                      : ""}
                  </p>
                  <p className="mt-4 lg:mt-2">
                    {data.userById.bio ? data.userById.bio : ""}
                  </p>
                </div>
                {currentUserID === id &&
                  (editMode ? (
                    <RoundedButton
                      btnName="Delete account"
                      bgColor={"bg-secondary"}
                      borderColor={"border-secondary"}
                      fontSize={"text-lg"}
                      paddingLR={"px-6 w-full"}
                      paddingTB={"py-1 mt-4 lg:mt-2"}
                      hover={
                        "hover:bg-white hover:text-secondary hover:border-secondary"
                      }
                      handleClick={handleDeleteAcc}
                    />
                  ) : (
                    <RoundedButton
                      btnName="Edit Profile"
                      bgColor={"bg-secondary"}
                      borderColor={"border-secondary"}
                      fontSize={"text-lg"}
                      paddingLR={"px-6 w-full"}
                      paddingTB={"py-1 mt-4 lg:mt-2"}
                      hover={
                        "hover:bg-white hover:text-secondary hover:border-secondary"
                      }
                      handleClick={handleEditMode}
                    />
                  ))}
              </div>
            </div>
          </section>
          {editMode ? (
            <EditMode
              handleCancel={handleCancel}
              photos={getImgArr()}
              avt={data.userById.avatar.medium}
              newAvt={avt}
            />
          ) : (
            <section className="container mx-auto mt-16 px-5">
              <LightGallery
                speed={500}
                plugins={[lgZoom]}
                elementClassNames="grid grid-cols-2 sm:grid-cols-3 gap-12"
              >
                {data.userById.photo.map((pic, key) => (
                  <a
                    href={`${pic.large}`}
                    className="block justify-self-center"
                  >
                    <img
                      src={`${pic.large}`}
                      alt={key}
                      className="object-cover object-center"
                    />
                  </a>
                ))}
              </LightGallery>
            </section>
          )}
        </main>
      )}
    </>
  );
};

export default ProfilePage;
