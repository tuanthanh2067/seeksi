import React, { useState, useEffect } from "react";
import Pineapple from "../../assets/confused.png";
import Yes from "../../assets/yes.png";
import No from "../../assets/no.png";
import Exit from "../../assets/exit.png";
import Clock from "../../assets/stopwatch.png";
import Confirmation from "./Confirmation";
import toast from "react-hot-toast";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { GET_GAME_ROOM } from "../../graphql/queries/Game";
import { SUBMIT_GAME_ANSWER, FINISH_GAME } from "../../graphql/mutations/Game";
import { useQuery, useMutation } from "@apollo/client";

const Game = (props) => {
  const { data } = useQuery(GET_GAME_ROOM, {
    variables: { gameRoomId: props.gameRoomId },
  });
  const [submitAnswers] = useMutation(SUBMIT_GAME_ANSWER);
  const [finishPlayingGames] = useMutation(FINISH_GAME);

  const [answers, setAnswers] = useState([]);
  const [curQuestion, setCurQuestion] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleYes = () => {
    let idx = curQuestion;
    let newAnswers = answers;
    newAnswers[idx] = "yes";
    setAnswers(newAnswers);
  };

  const handleNo = () => {
    let idx = curQuestion;
    let newAnswers = answers;
    newAnswers[idx] = "no";
    setAnswers(newAnswers);
  };

  const handleChange = (selectedQuestion) => {
    setCurQuestion(selectedQuestion);
  };

  const submitData = () => {
    for (let i = 0; i < 10; i++) {
      if (answers[i] === undefined) {
        answers[i] = "not_answered";
      }
    }
    submitAnswers({
      variables: {
        gameRoomId: props.gameRoomId,
        answers: answers,
        isFinal: true,
      },
      onError: (error) => {
        console.log(error);
      },
      onCompleted: (data) => {
        toast.success(data.submitAnswers.message);
        props.handleClose(false);
        finishPlayingGames({
          variables: {},
          onError: (error) => {
            console.log(error);
          },
          onCompleted: (data) => {},
        });
      },
    });
  };

  const confirmExit = () => {
    setShowConfirmation(false);
    if (answers.length < 10) {
      toast.error("Please answer all questions!");
    } else if (answers.length === 10) {
      let complete = true;
      for (let i = 0; i < 10; i++) {
        if (answers[i] === undefined) {
          toast.error("Please answer all questions!");
          complete = false;
        }
      }
      if (complete) {
        submitData();
      }
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          submitData();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  const handleExit = () => {
    setShowConfirmation(true);
  };

  return (
    <>
      {data && (
        <div
          className={`bg-black bg-opacity-50 inset-0 fixed z-50 flex justify-center items-center h-screen`}
        >
          <div className="px-8 bg-purple w-5/6 h-4/5 lg:w-1/3 md:max-w-3xl rounded-md relative">
            <div className="flex items-center w-4/5 m-auto pt-5">
              <div className="w-[20%] h-14">
                <img src={`${Pineapple}`} alt="emoji" className="float-right" />
              </div>
              <div className="w-[80%]">
                <h3 className="text-orange font-medium text-3xl text-center">
                  Never have I ever...
                </h3>
              </div>
            </div>

            <div className="mt-10">
              <Carousel
                showArrows={true}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                onChange={handleChange}
              >
                {data.getGameRoom.questions.map((question, key) => (
                  <div
                    className="flex h-40 justify-center items-stretch my-1 gap-x-2"
                    key={key}
                  >
                    <label className="flex block h-full text-center w-full bg-white border-black border-[1px] rounded-lg text-s text-black py-1 px-12">
                      <div className="m-auto">{question.question}</div>
                    </label>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="my-5 grid grid-cols-4 gap-4">
              <div></div>
              <div className=" justify-self-center w-12 h-12">
                <button onClick={handleYes}>
                  <img src={`${Yes}`} alt="yes" />
                </button>
              </div>

              <div className="justify-self-center w-12 h-12">
                <button onClick={handleNo}>
                  <img src={`${No}`} alt="no" />
                </button>
              </div>
              <div></div>
            </div>

            <h3 className="text-center text-white mt-5 mb-2">Your answer: </h3>
            <div className="grid">
              {answers[curQuestion] && (
                <div className=" justify-self-center w-11 h-11">
                  <img
                    src={answers[curQuestion] === "yes" ? Yes : No}
                    alt={answers[curQuestion]}
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 pb-10 absolute bottom-0 left-0 w-full ">
              <div className="justify-self-start">
                <div className="flex flex-row">
                  <div className="w-12 h-12 ml-5">
                    <img src={`${Clock}`} alt="clock" />
                  </div>
                  <div className="w-20 h-12 text-center">
                    <div className="text-bold text-white m-auto pt-3">
                      {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                    </div>
                  </div>
                </div>
              </div>
              <div className="justify-self-end w-12 h-12 mr-5">
                <button onClick={handleExit}>
                  <img src={`${Exit}`} alt="exit" />
                </button>
              </div>

              {showConfirmation && (
                <Confirmation
                  title="Exit Game Room"
                  content={`All answers will be saved and submitted. Are you sure to exit?`}
                  handleCancel={() => setShowConfirmation(false)}
                  handleConfirm={confirmExit}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
