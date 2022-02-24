import React, { useState, useEffect } from "react";
import CircleButton from "../../components/Buttons/CircleButton";
import Heart from "../../assets/heart.svg";
import Reject from "../../assets/reject.svg";
import Navbar from "../../components/Navbar";
import Deck from "../../components/Deck/Deck";
import Report from "../../pages/Modal/Report";
import MatchConfirm from "../../components/MatchConfirm/MatchConfirm";
import Spinner from "../../components/Spinner/Spinner";
import { useMutation, useQuery } from "@apollo/client";
import {
  SEND_MATCH_REQUEST,
  SEND_REJECT_REQUEST,
} from "../../graphql/mutations/Match";
import { GET_POTENTIAL_PARTNERS } from "../../graphql/queries/Match";
import "./Match.css";

const Match = () => {
  const [page, setPage] = useState(1);

  const [isMatched, setIsMatched] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [reportedUserID, setReportedUserID] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [sendMatchRequest] = useMutation(SEND_MATCH_REQUEST);
  const [sendRejectRequest] = useMutation(SEND_REJECT_REQUEST);
  const { loading, error, data, refetch } = useQuery(GET_POTENTIAL_PARTNERS, {
    variables: { page: page },
  });

  const [topCardIndex, setTopCardIndex] = useState(0);
  const handleError = () => {
    setIsError(true);
    setMessage("An error occurs, please try again later");
    setTimeout(() => {
      setIsError(false);
    }, 1500);
  };

  const handleLike = () => {
    sendMatchRequest({
      variables: {
        id: data.getPotentialPartners[topCardIndex].id,
      },
      onError: (error) => {
        handleError();
      },
      onCompleted: (data) => {
        if (data.success === false) {
          handleError();
        }

        if (data.message === "Matched") {
          setIsMatched(true);
          setMessage("it's a match!");
          setTimeout(() => {
            handleSelect(true);
            setIsMatched(false);
          }, 2400);
        }

        handleSelect(true);
      },
    });
  };

  const handleReject = () => {
    sendRejectRequest({
      variables: {
        id: data.getPotentialPartners[topCardIndex].id,
      },
      onError: (error) => {
        handleError();
      },
      onCompleted: (data) => {
        if (data.success === false) {
          handleError();
        }

        handleSelect(false);
      },
    });
  };

  const handleSelect = (isLiked) => {
    const animation = isLiked ? "flyRight" : "flyLeft";
    const cardId = data.getPotentialPartners.length - 1 - topCardIndex;
    const topCard = document.getElementById(
      `${data.getPotentialPartners[topCardIndex].id}-${cardId}`
    );
    topCard.classList.add(animation);
    setTimeout(() => {
      topCard.classList.add("hiddenCard");
      if (topCardIndex < data.getPotentialPartners.length - 1) {
        setTopCardIndex(topCardIndex + 1);
      } else {
        const nextPage = page + 1;
        setTopCardIndex(0);
        setPage(nextPage);
        refetch({ page: nextPage });
      }
    }, 800);
  };

  return (
    <div className="matchPage">
      <Navbar />

      <div className="deckContainer h-1/2 flex items-center justify-center">
        {loading && <Spinner />}
        {!loading && !data && (
          <div className="italic place-self-center my-auto">
            An error occurs, please try again later!
          </div>
        )}
        {!loading && data && (
          <Deck
            cards={data.getPotentialPartners}
            handleReport={() => setShowReport(true)}
            getReportedUserID={setReportedUserID}
          />
        )}
      </div>
      {(isMatched || isError) && <MatchConfirm message={message} />}

      <div className="container flex space-x-24 max-w-sm h-1/5 mx-auto px-20 py-[2%]">
        <CircleButton
          icon={Reject}
          onClick={handleReject}
          bgColor="secondary"
        />
        <CircleButton icon={Heart} onClick={handleLike} bgColor="primary" />
      </div>

      {showReport && (
        <div
          onClick={(e) => {
            if (e.currentTarget.firstChild === e.target) {
              setShowReport(false);
            }
          }}
        >
          <Report
            handleSend={() => setShowReport(false)}
            reportedUserID={reportedUserID}
          />
        </div>
      )}
    </div>
  );
};

export default Match;
