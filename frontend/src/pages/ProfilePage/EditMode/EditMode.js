import React, { useState } from "react";
import RoundedButton from "../../../components/Buttons/RoundedButton";
import Input from "../../../components/Input/Input";
import Dropdown from "../../../components/Input/Dropdown";
import Textarea from "../../../components/Input/Textarea";
import Label from "../../../components/Input/Label";
import Radio from "../../../components/Input/Radio";
import Checkbox from "../../../components/Input/Checkbox";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import RoundedImage from "../../../components/Image/RoundedImage";
import EditImage from "../../../components/Image/EditImage";
import { useQuery } from "@apollo/client";
import { GET_HOBBY } from "../../../graphql/queries/Hobby";
import { EDIT_PROFILE_MUTATION } from "../../../graphql/mutations/Mutations";
import { useMutation } from "@apollo/client";

import {
  monthOptions,
  generateDateOptions,
  countryOptions,
  generateYearOptions,
  filterStateBySelectedCountry,
  filterCityBySelectedState,
} from "./data";

const EditMode = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const clearErr = () => setErr("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [genderBias, setGenderBias] = useState("");
  const [longTerm, setLongTerm] = useState("");
  const [shortTerm, setShortTerm] = useState("");
  const [distance, setDistance] = useState(4);
  const [ageBias, setAgeBias] = useState({ min: 21, max: 25 });
  const { loading, data } = useQuery(GET_HOBBY);
  const [images, setImages] = useState(props.photos);
  const [bio, setBio] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [length, setLength] = useState(0);
  const imgArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [editUser] = useMutation(EDIT_PROFILE_MUTATION);

  const hobbyOptions = () => {
    let hobbies = [];
    if (!loading && data.getHobbies) {
      data.getHobbies.map((hobby) => {
        hobbies.push({
          value: hobby,
          label: hobby,
        });
      });
    }
    return hobbies;
  };

  const onChange = (e) => {
    let newImgs = images;
    newImgs.push(URL.createObjectURL(e.target.files[0]));
    // No use but make img render immediately
    let idx = newImgs.length;
    setLength(idx);
    //*********
    setImages(newImgs);
  };

  const handleRemove = (e) => {
    let newImgs = images;
    newImgs.splice(e.target.id, 1);
    // No use but make img render immediately
    let idx = newImgs.length;
    setLength(idx);
    //*********
    setImages(newImgs);
  };

  const handleSave = () => {
    if (
      !email ||
      !password ||
      !year ||
      !month ||
      !date ||
      !country ||
      !state ||
      !city ||
      !gender ||
      !genderBias ||
      (!longTerm && !shortTerm) ||
      hobbies.length === 0 ||
      !bio
    ) {
      setErr("*Please provide all information");
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErr("*Please provide a properly formatted email address");
    } else if (password && password.length < 12) {
      setErr("*Password should be at least 12 characters");
    } else if (
      password &&
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/
      )
    ) {
      setErr(
        "*Password must contain at least 1 number, 1 uppercase letter and 1 special character"
      );
    } else {
      setMonth(parseInt(month) - 1);
      editUser({
        variables: {
          city: city,
          province: state,
          dob: new Date(`${year}, ${month}, ${date}`),
          sex: gender,
          genderPref: genderBias,
          hobbies: hobbies,
          bio: bio,
          distance: distance,
          minAge: ageBias.min,
          maxAge: ageBias.max,
        },
        onError: (error) => {
          setErr(error);
        },
        onCompleted: (data) => {
          props.handleCancel();
        },
      });
    }
  };
  return (
    <>
      <section className="mt-20">
        <div className="grid lg:grid-cols-2">
          <div className="w-full grid gap-y-1.5 justify-items-center">
            {err && <span className="text-red-600 font-medium">{err}</span>}
            <Input
              type="email"
              width="w-2/3"
              placeholder="Email"
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
            <div className="pt-1.5 grid grid-cols-3 gap-4 w-2/3">
              <Dropdown
                options={countryOptions}
                placeholder="Country"
                onChange={(e) => {
                  setCountry(e.value);
                  setState("");
                }}
              />

              <Dropdown
                options={filterStateBySelectedCountry(country)}
                placeholder="State"
                onChange={(e) => {
                  setState(e.value);
                  clearErr();
                }}
              />

              <Dropdown
                options={filterCityBySelectedState(state)}
                placeholder="City"
                onChange={(e) => {
                  setCity(e.value);
                  clearErr();
                }}
              />
            </div>
            <div className="w-2/3">
              <Label label="Birthday" />
              <div className="my-2 grid grid-cols-3 gap-4 ">
                <Dropdown
                  options={monthOptions}
                  placeholder="Month"
                  onChange={(e) => {
                    setMonth(e.value);
                    clearErr();
                  }}
                />
                <Dropdown
                  options={generateDateOptions()}
                  placeholder="Day"
                  onChange={(e) => {
                    setDate(e.value);
                    clearErr();
                  }}
                />
                <Dropdown
                  options={generateYearOptions()}
                  placeholder="Year"
                  onChange={(e) => {
                    setYear(e.value);
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
                  onClick={() => {
                    setGender("male");
                    clearErr();
                  }}
                />
                <Radio
                  value="Female"
                  name="gender"
                  width="w-full"
                  onClick={() => {
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
                  onClick={() => {
                    setGenderBias("male");
                    clearErr();
                  }}
                />
                <Radio
                  value="Female"
                  name="genderBias"
                  width="w-full"
                  onClick={() => {
                    setGenderBias("female");
                    clearErr();
                  }}
                />
                <Radio
                  value="Everyone"
                  name="genderBias"
                  width="w-full"
                  onClick={() => {
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
                  onClick={() => {
                    setShortTerm("shortTerm");
                    clearErr();
                  }}
                />
                <Checkbox
                  value="Long-term"
                  name="Relationship"
                  width="w-full"
                  onClick={() => {
                    setLongTerm("longTerm");
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
                onChange={(e) => {
                  setHobbies(e.map((hobby) => hobby.value));
                  clearErr();
                }}
              />
              <div className="pt-2.5">
                <Textarea
                  placeholder={"Bio"}
                  width="w-full"
                  height="h-36"
                  onChange={(e) => {
                    setBio(e.target.value);
                    clearErr();
                  }}
                />
              </div>
              <Label label="Distance Preference" />
              <div className="pt-5 pb-8 ml-2">
                <InputRange
                  maxValue={100}
                  minValue={0}
                  formatLabel={(distance) => `${distance} km`}
                  value={distance}
                  onChange={(value) => {
                    setDistance(value);
                    clearErr();
                  }}
                />
              </div>

              <Label label="Age Range Preference" />
              <div className="pt-5 ml-2">
                <InputRange
                  draggableTrack
                  maxValue={100}
                  minValue={18}
                  onChange={(value) => {
                    setAgeBias(value);
                    clearErr();
                  }}
                  value={ageBias}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-15">
        <div className="container mx-auto py-5 md:p-5">
          <div className="grid grid-cols-3 gap-4">
            {imgArr.map((num) => {
              return (
                <div className="block justify-self-center w-80 h-80">
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
            handleClick={props.handleCancel}
          />
        </div>
      </div>
    </>
  );
};

export default EditMode;
