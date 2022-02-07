import Navbar from "../../components/Navbar/index";

import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

import DefaultAvatar from "../../assets/mock_avatar.png";
import AgeLogo from "../../assets/age_logo.png";
import GenderLogo from "../../assets/gender_logo.png";
import LocationLogo from "../../assets/location_logo.png";
import RoundedButton from "../../components/Buttons/RoundedButton";

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <main>
        <section>
          <div className="container mx-auto px-4 py-5 sm:p-5">
            <div className="grid grid-cols-3 gap-5">
              <div className="w-52 h-52 justify-self-center overflow-hidden rounded-full">
                <img
                  src={DefaultAvatar}
                  alt="user avatar"
                  className="object-contain"
                />
              </div>
              <div className="col-span-2 h-52 self-center flex flex-col justify-between">
                <div className="block text-lg">
                  <p className="text-2xl text-primary font-bold">John Doe</p>
                  <div className="flex gap-16 mt-2">
                    <div className="flex gap-2">
                      <div className="w-6 h-6">
                        <img src={AgeLogo} alt="age logo" />
                      </div>
                      <p>24</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6">
                        <img src={GenderLogo} alt="gender logo" />
                      </div>
                      <p>Male</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 flex justify-center">
                        <img src={LocationLogo} alt="location logo" />
                      </div>
                      <p>Vancouver, Canada</p>
                    </div>
                  </div>
                  <p className="mt-2">
                    <span className="font-bold">Hobbies: </span>Tennis, Camping,
                    Surfing
                  </p>
                  <p className="mt-2">Nice to meet you! I'm John</p>
                </div>
                <RoundedButton
                  btnName="Edit Profile"
                  bgColor={"bg-secondary"}
                  borderColor={"border-secondary"}
                  fontSize={"text-lg"}
                  paddingLR={"px-6 w-2/3"}
                  hover={
                    "hover:bg-white hover:text-secondary hover:border-secondary"
                  }
                />
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
              <a
                href={DefaultAvatar}
                className="block justify-self-center w-80 h-80"
              >
                <img src={DefaultAvatar} className="object-contain" />
              </a>
              <a
                href={DefaultAvatar}
                className="block justify-self-center w-80 h-80"
              >
                <img src={DefaultAvatar} className="object-contain" />
              </a>
              <a
                href={DefaultAvatar}
                className="block justify-self-center w-80 h-80"
              >
                <img src={DefaultAvatar} className="object-contain" />
              </a>
              <a
                href={DefaultAvatar}
                className="block justify-self-center w-80 h-80"
              >
                <img src={DefaultAvatar} className="object-contain" />
              </a>
              <a
                href={DefaultAvatar}
                className="block justify-self-center w-80 h-80"
              >
                <img src={DefaultAvatar} className="object-contain" />
              </a>
              <a
                href={DefaultAvatar}
                className="block justify-self-center w-80 h-80"
              >
                <img src={DefaultAvatar} className="object-contain" />
              </a>
              <a
                href={DefaultAvatar}
                className="block justify-self-center w-80 h-80"
              >
                <img src={DefaultAvatar} className="object-contain" />
              </a>
              <a
                href={DefaultAvatar}
                className="block justify-self-center w-80 h-80"
              >
                <img src={DefaultAvatar} className="object-contain" />
              </a>
              <a
                href={DefaultAvatar}
                className="block justify-self-center w-80 h-80"
              >
                <img src={DefaultAvatar} className="object-contain" />
              </a>
            </LightGallery>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
