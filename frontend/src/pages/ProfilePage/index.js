import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "../../components/Navbar/index";

import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

import AgeLogo from "../../assets/age_logo.png";
import GenderLogo from "../../assets/gender_logo.png";
import LocationLogo from "../../assets/location_logo.png";
import RoundedButton from "../../components/Buttons/RoundedButton";
import Spinner from "../../components/Spinner/Spinner";

import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/User";

const ProfilePage = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const currentUserID = decodedToken.userId;

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: id },
  });

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

  const handleClick = () => {
    //go to edit profile page
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
        <main>
          <section>
            <div className="container mx-auto px-4 py-5 sm:p-5">
              <div className="grid grid-cols-3 gap-5">
                <div className="w-52 h-52 justify-self-center overflow-hidden rounded-full">
                  <img
                    src={data.userById.avatar.medium}
                    alt="user avatar"
                    className="object-contain"
                  />
                </div>
                <div className="col-span-2 h-52 self-center flex flex-col justify-between">
                  <div className="block text-lg">
                    <p className="text-2xl text-primary font-bold">
                      {data.userById.firstName} {data.userById.lastName}
                    </p>
                    <div className="flex gap-16 mt-2">
                      <div className="flex gap-2">
                        <div className="w-6 h-6">
                          <img src={AgeLogo} alt="age logo" />
                        </div>
                        <p>{getAge(data.userById.dob)}</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-6 h-6">
                          <img src={GenderLogo} alt="gender logo" />
                        </div>
                        <p>{capitalizeFirstLetter(data.userById.sex)}</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-6 h-6 flex justify-center">
                          <img src={LocationLogo} alt="location logo" />
                        </div>
                        <p>
                          {data.userById.location.city},{" "}
                          {data.userById.location.province}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2">
                      <span className="font-bold">Hobbies: </span>
                      {data.userById.hobbies.join(", ")}
                    </p>
                    <p className="mt-2">{data.userById.bio}</p>
                  </div>
                  {currentUserID === id && (
                    <RoundedButton
                      btnName="Edit Profile"
                      bgColor={"bg-secondary"}
                      borderColor={"border-secondary"}
                      fontSize={"text-lg"}
                      paddingLR={"px-6 w-2/3"}
                      hover={
                        "hover:bg-white hover:text-secondary hover:border-secondary"
                      }
                      handleClick={handleClick}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="mt-20">
            <div className="container mx-auto py-5 md:p-5">
              <LightGallery
                speed={500}
                plugins={[lgZoom]}
                elementClassNames="grid grid-cols-3 gap-y-7"
              >
                {data.userById.photo.map((pic, key) => (
                  <a
                    href={`${pic.large}`}
                    className="block justify-self-center w-80 h-80"
                  >
                    <img
                      src={`${pic.large}`}
                      className="object-cover object-center"
                    />
                  </a>
                ))}
              </LightGallery>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default ProfilePage;
