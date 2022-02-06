import React from "react";
import ProfileCard from "../ProfileCard/ProfileCard";

const Deck = (props) => {
	const deck = props.cards.map(
		(val, index, array) => array[array.length - 1 - index]
	);
	return deck.map((card, index) => (
		<ProfileCard
			i={deck.length - index}
			cardID={card.id}
			avatar={card.avatar}
			firstName={card.firstName}
			age={card.age}
			sex={card.sex}
			distance={card.distance}
			hobbies={card.hobbies}
			bio={card.bio}
		/>
	));
};

export default Deck;
