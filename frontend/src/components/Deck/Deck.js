import React from "react";
import ProfileCard from "../ProfileCard/ProfileCard";

const Deck = (props) => {
  const deck = props.cards.map(
    (val, index, array) => array[array.length - 1 - index]
  );

  if (deck.length === 0) {
    return (
      <div className="italic place-self-center my-auto">
        We couldn't find any matches for you at the moment, please try again
        later
      </div>
    );
  }

  return deck.map((card, index) => (
    <ProfileCard
      i={deck.length - index}
      cardID={`${card.id}-${index}`}
      avatar={card.avatar}
      firstName={card.firstName}
      age={card.age}
      sex={card.sex}
      distance={card.distance}
      hobbies={card.hobbies}
      bio={card.bio}
      handleReport={props.handleReport}
      reportedUserID={props.getReportedUserID(card.id)}
      userID={card.id}
    />
  ));
};

export default Deck;
