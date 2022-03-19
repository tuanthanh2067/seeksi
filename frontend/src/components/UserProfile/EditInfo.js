import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RoundedButton from "../../components/Buttons/RoundedButton";
import { InputSlider, InputRange } from "../../components/Input/InputRange";
import Dropdown from "../../components/Input/Dropdown";
import Textarea from "../../components/Input/Textarea";
import Label from "../../components/Input/Label";
import Radio from "../../components/Input/Radio";
import Checkbox from "../../components/Input/Checkbox";
import RoundedImage from "../../components/Image/RoundedImage";
import EditImage from "../../components/Image/EditImage";
import { useQuery, useMutation } from "@apollo/client";
import { GET_HOBBY } from "../../graphql/queries/Hobby";
import { EDIT_PROFILE_MUTATION } from "../../graphql/mutations/Mutations";
import {
  UPLOAD_AVATAR,
  UPLOAD_PHOTOS,
  DELETE_PHOTOS,
} from "../../graphql/mutations/Photos";
import {
  countryOptions,
  filterStateBySelectedCountry,
  filterCity,
} from "../../utils/data";

const EditInfo = ({ id, user, photos, avt, requiredAvt }) => {
  const navigate = useNavigate();
  const [replace, setReplace] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const clearErr = () => setErr("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [genderBias, setGenderBias] = useState("");
  const [longTerm, setLongTerm] = useState(false);
  const [shortTerm, setShortTerm] = useState(false);
  const [distance, setDistance] = useState(0);
  const [ageBias, setAgeBias] = useState([20, 30]);
  const [images, setImages] = useState(photos);
  const [bio, setBio] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [length, setLength] = useState(photos.length);
  const [render, setRender] = useState(0);
  const [uploadImgs, setUploadImgs] = useState([]);
  const imgArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const { loading, data } = useQuery(GET_HOBBY);
  const [editUser] = useMutation(EDIT_PROFILE_MUTATION);
  const [uploadAvatar] = useMutation(UPLOAD_AVATAR);
  const [uploadPhotos] = useMutation(UPLOAD_PHOTOS);
  const [deletePhoto] = useMutation(DELETE_PHOTOS);

  const hobbyOptions = () => {
    let hobbies = [];
    if (!loading && data.getHobbies) {
      data.getHobbies
        .filter((hobby, i) => {
          return data.getHobbies.indexOf(hobby) === i;
        })
        .map((hobby, key) => {
          hobbies.push({
            value: hobby,
            label: hobby,
          });
          return "";
        });
    }
    return hobbies;
  };

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const onChange = (e) => {
    let newImgs = images;
    newImgs.push(URL.createObjectURL(e.target.files[0]));
    // No use but make img render immediately
    let idx = newImgs.length;
    setRender(idx);
    //*********
    setImages(newImgs);
    newImgs = uploadImgs;
    newImgs.push(e.target.files[0]);
    setUploadImgs(newImgs);
    clearErr();
  };

  const handleRemove = (e) => {
    let newImgs = images;
    if (length > 0) {
      deletePhoto({
        variables: { path: newImgs[e.target.id] },
        onError: (error) => {
          toast.error(error.message);
        },
        onCompleted: (data) => {
          toast.success(data.deletePhoto.message);
        },
      });
      setLength(length - 1);
    }
    newImgs.splice(e.target.id, 1);
    let idx = newImgs.length;
    setRender(idx); // No use but make img render immediately
    setImages(newImgs);
    if (images.length === 0) {
      setReplace(true);
    }
    newImgs = uploadImgs;
    newImgs.splice(e.target.id, 1);
    setUploadImgs(newImgs);
  };

  const handleSave = () => {
    if (
      // !email ||
      // !password ||
      !country ||
      !city ||
      !gender ||
      !genderBias ||
      (!longTerm && !shortTerm) ||
      hobbies.length === 0 ||
      !bio
    ) {
      setErr("*Please provide all information");
      scrollToTop();
      // } else if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      //   setErr("*Please provide a properly formatted email address");
      // } else if (password && password.length < 12) {
      //   setErr("*Password should be at least 12 characters");
      // } else if (
      //   password &&
      //   !password.match(
      //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/
      //   )
      // ) {
      //   setErr(
      //     "*Password must contain at least 1 number, 1 uppercase letter and 1 special character"
      //   );
      // } else if (password && password !== confirmPassword) {
      //   setErr("*Passwords do not match");
    } else if (hobbies.length > 5) {
      setErr("Please select only up to 5 hobbies");
      scrollToTop();
    } else if (
      (length === 0 && images.length === 0) ||
      (!avt && !user.avatar.origin) ||
      requiredAvt
    ) {
      setErr("Uploading your images helps attract your potential partners 😉");
      scrollToTop();
    } else {
      if (avt !== "") {
        uploadAvatar({
          variables: { file: avt },
          onError: (error) => {
            toast.error(error.message);
            scrollToTop();
          },
          onCompleted: (data) => {
            toast.success("Uploaded avatar successfully!");
            navigate(`/user/${id}`);
          },
        });
      }

      if (uploadImgs.length !== 0) {
        uploadPhotos({
          variables: {
            files: uploadImgs,
            replace: replace,
          },
          onError: (error) => {
            toast.error(error.message);
            scrollToTop();
          },
          onCompleted: (data) => {
            toast.success("Uploaded photos successfully!");
            navigate(`/user/${id}`);
          },
        });
      }

      editUser({
        variables: {
          country: country,
          city: city,
          province: state,
          sex: gender,
          genderPref: genderBias,
          hobbies: hobbies,
          bio: bio,
          distance: distance,
          minAge: ageBias[0],
          maxAge: ageBias[1],
          longTerm: longTerm,
          shortTerm: shortTerm,
        },
        onError: (error) => {
          // setErr(error.message);
          toast.error(error.message);
          scrollToTop();
        },
        onCompleted: (data) => {
          toast.success(data.editUser.message[0]);
          navigate(`/user/${id}`);
        },
      });
    }
  };

  useEffect(() => {
    if (user.location) {
      setCountry(user.location.country);
      setState(user.location.province);
      setCity(user.location.city);
    }
    if (user.preference) {
      setGenderBias(user.preference.gender);
      setLongTerm(user.preference.longTerm);
      setShortTerm(user.preference.shortTerm);
      setDistance(user.preference.distance);
      setAgeBias([user.preference.minAge, user.preference.maxAge]);
    }
    if (user.hobbies) setHobbies(user.hobbies);
    if (user.bio) setBio(user.bio);
    if (user.sex) setGender(user.sex);
  }, []);

  return (
    <>
      <section className="mt-20">
        <div className="grid lg:grid-cols-2">
          <div className="w-full grid gap-y-1.5 justify-items-center">
            {err && <span className="text-red-600 font-medium">{err}</span>}
            {/* <Input
              type="email"
              width="w-2/3"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearErr();
              }}
            />
            <Input
              type="password"
              width="w-2/3"
              placeholder="New password"
              onChange={(e) => {
                setPassword(e.target.value);
                clearErr();
              }}
            />
            <Input
              type="password"
              width="w-2/3"
              placeholder="Confirm new password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearErr();
              }}
            /> */}
            <div className="w-2/3">
              <Label label="Location" />
              <div className="my-2 grid grid-cols-3 gap-4 ">
                <Dropdown
                  options={countryOptions}
                  placeholder="Country"
                  defaultValue={country}
                  onChange={(e) => {
                    setCountry(e.value);
                    setState("");
                  }}
                />

                <Dropdown
                  options={filterStateBySelectedCountry(country)}
                  placeholder="State"
                  defaultValue={state}
                  onChange={(e) => {
                    setState(e.value);
                    clearErr();
                  }}
                />

                <Dropdown
                  options={filterCity(state, country)}
                  placeholder="City"
                  defaultValue={city}
                  onChange={(e) => {
                    setCity(e.value);
                    clearErr();
                  }}
                />
              </div>
            </div>

            <div className="w-2/3">
              <Label label="Sex" />
              <div className="grid grid-cols-3 gap-4 ">
                <Radio
                  value="Male"
                  name="gender"
                  width="w-full"
                  checked={gender === "male" ? "checked" : ""}
                  onChange={() => {
                    setGender("male");
                    clearErr();
                  }}
                />
                <Radio
                  value="Female"
                  name="gender"
                  width="w-full"
                  checked={gender === "female" ? "checked" : ""}
                  onChange={() => {
                    setGender("female");
                    clearErr();
                  }}
                />
              </div>
              <Label label="Gender Preference" />
              <div className="grid grid-cols-3 gap-4 ">
                <Radio
                  value="Male"
                  name="genderBias"
                  width="w-full"
                  checked={genderBias === "male" ? "checked" : ""}
                  onChange={() => {
                    setGenderBias("male");
                    clearErr();
                  }}
                />
                <Radio
                  value="Female"
                  name="genderBias"
                  width="w-full"
                  checked={genderBias === "female" ? "checked" : ""}
                  onChange={() => {
                    setGenderBias("female");
                    clearErr();
                  }}
                />
                <Radio
                  value="Everyone"
                  name="genderBias"
                  width="w-full"
                  checked={genderBias === "everyone" ? "checked" : ""}
                  onChange={() => {
                    setGenderBias("everyone");
                    clearErr();
                  }}
                />
              </div>
              <Label label="What kind of relationship are you looking for?" />
              <div className="grid grid-cols-3 gap-4 ">
                <Checkbox
                  value="Short-term"
                  name="Relationship"
                  width="w-full"
                  checked={shortTerm ? "checked" : ""}
                  onChange={() => {
                    setShortTerm(!shortTerm);
                    clearErr();
                  }}
                />
                <Checkbox
                  value="Long-term"
                  name="Relationship"
                  width="w-full"
                  checked={longTerm ? "checked" : ""}
                  onChange={() => {
                    setLongTerm(!longTerm);
                    clearErr();
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-full grid justify-items-center">
            <div className="w-2/3 mt-5 lg:mt-1.5">
              <Dropdown
                options={hobbyOptions()}
                isMulti="true"
                placeholder={"Hobbies"}
                defaultValue={hobbies}
                onChange={(e) => {
                  setHobbies(e.map((hobby, key) => hobby.value));
                  clearErr();
                }}
              />
              <div className="pt-2.5">
                <Textarea
                  placeholder={"Bio"}
                  width="w-full"
                  height="h-36"
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                    clearErr();
                  }}
                />
              </div>
              <Label label={`Distance Preference: ${distance} km`} />
              <div className="pt-5 pb-8 ml-2">
                <InputSlider
                  min={0}
                  max={500}
                  marks={{
                    0: "0",
                    500: "500",
                  }}
                  value={distance}
                  onChange={(value) => {
                    setDistance(value);
                    clearErr();
                  }}
                />
              </div>

              <Label
                label={`Age Range Preference: ${ageBias[0]} - ${ageBias[1]} y.o`}
              />
              <div className="pt-5 ml-2">
                <InputRange
                  min={18}
                  max={82}
                  marks={{
                    18: "18",
                    82: "82",
                  }}
                  values={ageBias}
                  onChange={(value) => {
                    setAgeBias(value);
                    clearErr();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-16">
        <div className="container mx-auto mt-16 px-5">
          <div className="grid grid-cols-2 auto-cols-fr sm:grid-cols-3 gap-12">
            {imgArr.map((num, key) => {
              return (
                <div className="block justify-self-center w-48 h-48 lg:w-72 lg:h-72">
                  {images[num] ? (
                    <RoundedImage
                      src={images[num]}
                      handleRemove={handleRemove}
                      idx={num}
                      key={num}
                    />
                  ) : (
                    <EditImage handleChange={onChange} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className=" py-20 grid grid-cols-3 ">
        <div className="w-full grid grid-cols-2  justify-items-center">
          <RoundedButton
            btnName="Save"
            bgColor={"bg-primary"}
            borderColor={"border-primary"}
            fontSize={"text-lg"}
            paddingLR={"px-2 w-2/3"}
            hover={"hover:bg-white hover:text-primary hover:border-primary"}
            handleClick={handleSave}
          />

          <RoundedButton
            btnName="Cancel"
            bgColor={"bg-primary"}
            borderColor={"border-primary"}
            fontSize={"text-lg"}
            paddingLR={"px-2 w-2/3"}
            hover={"hover:bg-white hover:text-primary hover:border-primary"}
            handleClick={() => navigate(`/user/${id}`)}
          />
        </div>
      </div>
    </>
  );
};

export default EditInfo;
