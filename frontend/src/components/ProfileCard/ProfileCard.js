import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";

import OvalButton from "../Buttons/OvalButton";
import Info from "../../assets/info.png";
import styles from "./ProfileCard.module.css";

function ProfileCard(props) {
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div
      // className={` ${
      //   styles.card
      // } shadow-card card transition ease-in translate-x-[${props.i * 35}px] `}
      className={` ${styles.card} shadow-card card transition ease-in hover:translate-x-[40px] `}
      id={props.cardID}
    >
      <a.div
        className={`${styles.side} rounded-2xl bg-cover bg-center shadow-card`}
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          backgroundImage: `url(${props.avatar.medium})`,
        }}
      >
        <div className="p-5">
          <span>
            <OvalButton
              btnName="Report"
              borderColor="border-secondary"
              bgColor="bg-secondary"
              fontSize="text-md"
              hover="hover:bg-white hover:text-secondary hover:border-none"
              handleClick={props.handleReport}
            />
          </span>
          <span className="float-right">
            <OvalButton
              btnName={`${props.distance} km`}
              fontSize="text-md"
              hover="hover:bg-white hover:text-primary hover:border-none"
            />
          </span>
        </div>

        <div
          className="flex h-1/2"
          onClick={() => setFlipped((state) => !state)}
        />
        <div className="absolute flex w-full bg-black/40 bg-blend-overlay bottom-0 px-5 py-3 rounded-b-2xl">
          <div className="w-5/6 m-0">
            <div>
              <span className="font-bold text-2xl text-white">
                {props.firstName},{" "}
              </span>
              <span className="font-light text-2xl text-white italic">
                {props.age}, {capitalizeFirstLetter(props.sex)}
              </span>
            </div>
            <div className="font-thin text-lg text-white">
              {props.hobbies.join(", ")}
            </div>
          </div>
          <div className="w-1/6 mx-0 py-3">
            <a href={`/user/${props.userID}`}>
              <img src={Info} className="w-8 mr-0" alt="info" />
            </a>
          </div>
        </div>
      </a.div>
      <a.div
        className={`${styles.side} rounded-2xl shadow-card bg-white`}
        style={{
          opacity,
          transform,
          rotateY: "180deg",
        }}
      >
        <div className="p-5">
          <span>
            <OvalButton
              btnName="Report"
              borderColor="border-secondary"
              bgColor="bg-secondary"
              fontSize="text-md"
              hover="hover:bg-white hover:text-secondary hover:border-secondary"
              handleClick={props.handleReport}
            />
          </span>
          <span className="float-right">
            <OvalButton
              btnName={props.distance}
              fontSize="text-md"
              hover="hover:bg-white hover:text-primary hover:border-primary"
            />
          </span>
        </div>

        <div
          className="flex h-1/2"
          onClick={() => setFlipped((state) => !state)}
        >
          <div className="relative w-full px-auto my-1/2 flex justify-center self-center">
            {props.bio}
          </div>
        </div>

        <div className="absolute w-full bottom-0 px-5 py-3 rounded-b-2xl">
          <div>
            <span className="font-bold text-2xl text-primary">
              {props.firstName},{" "}
            </span>
            <span className="font-normal text-2xl text-primary italic">
              {props.age}, {props.sex}
            </span>
          </div>
          <div className="font-extralight text-lg text-primary">
            {props.hobbies}
          </div>
        </div>
      </a.div>
    </div>
  );
}

export default ProfileCard;
