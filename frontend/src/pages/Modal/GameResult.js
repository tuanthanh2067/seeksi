import React from "react";
import ResultIcon from "../../assets/results.png";
import YesIcon from "../../assets/yes.png";
import NoIcon from "../../assets/no.png";
import ExitIcon from "../../assets/exit.png";
import Spinner from "../../components/Spinner/Spinner";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./GameResult.css";

const Slide = ({ questions, userAnswers, partnerAnswers, isSame }) => {
  return (
    <div className="mb-4">
      {questions.map((question, index) => (
        <div className="grid grid-cols-7 gap-4 my-5" key={question.id}>
          <div className="col-start-1 py-auto m-auto w-[35px]">
            {userAnswers[index] === "not_answered" ? (
              <span className="text-white font-semibold text-[0.8rem] m-auto">
                N/A
              </span>
            ) : (
              <img
                className="m-auto"
                src={userAnswers[index] === "yes" ? YesIcon : NoIcon}
                alt="game answer"
              />
            )}
          </div>
          <div
            className={`col-start-2 col-span-5 border-[1px] rounded-md bg-white p-2 align-middle text-left leading-none font-medium  ${
              isSame[index] ? "text-dark-green" : "text-black"
            }`}
          >
            {question.question}
          </div>
          <div className="col-start-7 m-auto w-[35px]">
            {partnerAnswers[index] === "not_answered" ? (
              <span className="text-white font-semibold text-[0.8rem] m-auto">
                N/A
              </span>
            ) : (
              <img
                className="m-auto"
                src={partnerAnswers[index] === "yes" ? YesIcon : NoIcon}
                alt="game answer"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const GameResult = ({
  setShowGameResults,
  data,
  error,
  loading,
  partnerId,
  partnerName,
}) => {
  if (error) console.log(error);
  let commonAnswersCount = 0;
  let partnerIndex;
  let isSame = [];
  if (data) {
    data.getGameRoom.answers[0].answers.forEach((answer, index) => {
      isSame[index] = false;
      if (
        answer !== "not_answered" &&
        answer === data.getGameRoom.answers[1].answers[index]
      ) {
        commonAnswersCount++;
        isSame[index] = true;
      }
    });

    partnerIndex = data.getGameRoom.answers[0].user === partnerId ? 0 : 1;
  }

  return (
    <div
      className={`bg-black bg-opacity-50 inset-0 fixed z-50 flex justify-center items-center h-screen`}
    >
      <div className="flex flex-col bg-purple w-11/12 lg:w-1/3 md:max-w-3xl rounded-md ">
        <div className="gameTitle flex mx-auto mt-5 mb-3  items-center ">
          <div className="flex justify-self-center">
            <span>
              <img src={ResultIcon} alt="game icon" />
            </span>
            <span className="text-orange font-bold text-2xl text-center pl-2">
              Never Have I Ever...
            </span>
          </div>
        </div>
        {data && !data.getGameRoom.answers[partnerIndex].submitted_status && (
          <span className="text-[#A2F5C3] underline underline-offset-2 font-semibold text-base text-center mb-3">
            Waiting for {partnerName} to finish the game!
          </span>
        )}
        {loading && <Spinner />}
        {error && (
          <div className="flex mb-5 mx-auto h-24">
            <div className="italic place-self-center my-auto text-white">
              An error occurs, please try again later!
            </div>
          </div>
        )}
        {data && (
          <>
            <div className="gameResults flex flex-col mx-4 font-medium">
              <div className="gameHeader grid grid-cols-7 gap-4 mb-1 text-white">
                <div className="col-start-1 text-center">You</div>
                <div className="col-start-2 col-span-5 text-center">
                  Common answers: {commonAnswersCount}/10
                </div>
                <div className="col-start-7 text-center">{partnerName}</div>
              </div>
              <div className="gameAnswers">
                <Carousel
                  showArrows={false}
                  showStatus={false}
                  showIndicators={true}
                  showThumbs={false}
                >
                  <Slide
                    questions={data.getGameRoom.questions.slice(0, 5)}
                    userAnswers={data.getGameRoom.answers[
                      1 - partnerIndex
                    ].answers.slice(0, 5)}
                    partnerAnswers={data.getGameRoom.answers[
                      partnerIndex
                    ].answers.slice(0, 5)}
                    isSame={isSame.slice(0, 5)}
                  />
                  <Slide
                    questions={data.getGameRoom.questions.slice(5, 10)}
                    userAnswers={data.getGameRoom.answers[
                      1 - partnerIndex
                    ].answers.slice(5, 10)}
                    partnerAnswers={data.getGameRoom.answers[
                      partnerIndex
                    ].answers.slice(5, 10)}
                    isSame={isSame.slice(5, 10)}
                  />
                </Carousel>
              </div>
            </div>
            <div className="mx-5 mt-3 mb-5">
              <div className="w-[40px] float-right ">
                <img
                  className="cursor-pointer"
                  src={ExitIcon}
                  alt="exit icon"
                  onClick={() => setShowGameResults(false)}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameResult;
