import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import styles from "./ProfileCard.module.css";

function ProfileCard(props) {
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

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
        <CardHeader
          handleReport={props.handleReport}
          distance={props.distance}
        />
        <div
          className="flex h-1/2"
          onClick={() => setFlipped((state) => !state)}
        />
        <div className="absolute w-full bg-black/40 bg-blend-overlay bottom-0 px-5 py-3 rounded-b-2xl">
          <CardFooter
            firstName={props.firstName}
            age={props.age}
            sex={props.sex}
            hobbies={props.hobbies}
            userID={props.userID}
            textColor="white"
          />
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
        <CardHeader
          handleReport={props.handleReport}
          distance={props.distance}
        />
        <div
          className="flex h-1/2"
          onClick={() => setFlipped((state) => !state)}
        >
          <div className="relative w-full px-auto my-1/2 flex justify-center self-center">
            {props.bio}
          </div>
        </div>
        <div className="absolute w-full bottom-0 px-5 py-3 rounded-b-2xl">
          <CardFooter
            firstName={props.firstName}
            age={props.age}
            sex={props.sex}
            hobbies={props.hobbies}
            userID={props.userID}
            textColor="primary"
          />
        </div>
      </a.div>
    </div>
  );
}

export default ProfileCard;
