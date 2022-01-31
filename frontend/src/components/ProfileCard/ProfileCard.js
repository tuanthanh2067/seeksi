import React from "react";
import OvalButton from "../Buttons/OvalButton";
import Info from "../../assets/info.png";
import styles from "./ProfileCard.module.css";

function ProfileCard(props) {
  const handleFrontClick = () => {
    const theCard = document.getElementById("theCard");
    theCard.style.transform = "rotateY(180deg)";
  };

  const handleBackClick = () => {
    const theCard = document.getElementById("theCard");
    theCard.style.transform = "rotateY(0deg)";
  };

  const handleReport = () => {
    console.log("show report dialog here");
  };

  return (
    <div className="container relative max-w-sm h-[450px] m-auto">
      <div id="theCard" className={`${styles.theCard} rounded-2xl`}>
        <div
          className={`${styles.frontCard} relative max-w-sm h-[450px] rounded-2xl bg-cover bg-center shadow-card`}
          style={{
            // backgroundImage: `url(https://pbs.twimg.com/media/FIDek0OVcAEjkwi?format=jpg&name=small)`,
            backgroundImage: `url(${props.avatar})`,
          }}
        >
          <div className="p-5">
            <span>
              <OvalButton
                btnName="Report"
                fontSize="text-md"
                borderColor="border-secondary"
                bgColor="bg-secondary"
                hover="hover:bg-white hover:text-secondary hover:border-none"
                handleClick={handleReport}
              />
            </span>
            <span className="float-right">
              <OvalButton btnName={props.distance} fontSize="text-md" />
            </span>
          </div>
          <div className="flex h-[300px]" onClick={handleFrontClick}></div>
          <div className="absolute flex w-full bg-black/40 bg-blend-overlay bottom-0 px-5 py-3 rounded-b-2xl">
            <div className="w-5/6 m-0">
              <div>
                <span className="font-bold text-2xl text-white">
                  {props.firstName},{" "}
                </span>
                <span className="font-light text-2xl text-white italic">
                  {props.age}, {props.sex}
                </span>
              </div>
              <div className="font-thin text-lg text-white">
                {props.hobbies}
              </div>
            </div>
            <div className="w-1/6 mx-0 py-3">
              <a href={`/`}>
                <img src={Info} className="w-8 mr-0" alt="info" />
              </a>
            </div>
          </div>
        </div>
        <div
          className={`${styles.backCard} relative max-w-sm h-[450px] rounded-2xl shadow-card`}
        >
          <div className="p-5">
            <span>
              <OvalButton
                btnName="Report"
                borderColor="border-secondary"
                bgColor="bg-secondary"
                fontSize="text-md"
                hover="hover:bg-white hover:text-secondary hover:border-secondary"
                handleClick={handleReport}
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
          <div className="flex h-[300px]" onClick={handleBackClick}>
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
        </div>
      </div>
    </div>
  );
}

ProfileCard.defaultProps = {};

export default ProfileCard;
