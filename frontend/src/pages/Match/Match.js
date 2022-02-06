import React, { useState, useEffect } from "react";
import CircleButton from "../../components/Buttons/CircleButton";
import Heart from "../../assets/heart.svg";
import Reject from "../../assets/reject.svg";
import Navbar from "../../components/Navbar";
import Deck from "../../components/Deck/Deck";
import "./Match.css";

const cards = [
	{
		id: "61e75f2bfc13ae336b000000",
		avatar:
			"https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=383&q=80",
		firstName: "Lily",
		age: 27,
		sex: "Female",
		distance: "1.3 km",
		hobbies: "Jigsaw puzzles, Meditation",
		bio: "innovate open-source convergence",
	},
	{
		id: "61e8baa11488897675062212",
		avatar: "https://pbs.twimg.com/media/FKl2BW7VUAgD1QN?format=jpg&name=small",
		firstName: "Doyle",
		age: 26,
		sex: "Male",
		distance: "4.3 km",
		hobbies: "Slot car, Proverbs, Rail transport modeling",
		bio: "iterate bricks-and-clicks e-services",
	},
	{
		id: "61e75f2cfc13ae336b000009",
		avatar:
			"https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80",
		firstName: "Wilfred",
		age: 28,
		sex: "Male",
		distance: "2.3 km",
		hobbies: "Surfing, Dancing, Golf",
		bio: "Don't follow your dream, follow me~~",
	},
	{
		id: "61e8baa11488897675062218",
		avatar:
			"https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
		firstName: "John",
		age: 22,
		sex: "Male",
		distance: "15 km",
		hobbies: "Fashion design, practical jokes, feng shui decorating",
		bio: "maximize viral mindshare",
	},
];

const cards2 = [
	{
		id: "61e75f2bfc13ae336b00000nlkn",
		avatar:
			"https://images.unsplash.com/photo-1448376561459-dbe8868fa34c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
		firstName: "Lily",
		age: 27,
		sex: "Female",
		distance: "1.3 km",
		hobbies: "Jigsaw puzzles, Meditation",
		bio: "innovate open-source convergence",
	},
	{
		id: "61e8baa1148889767506221ihgoih",
		avatar:
			"https://images.unsplash.com/photo-1567784177951-6fa58317e16b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
		firstName: "Doyle",
		age: 26,
		sex: "Male",
		distance: "4.3 km",
		hobbies: "Slot car, Proverbs, Rail transport modeling",
		bio: "iterate bricks-and-clicks e-services",
	},
	{
		id: "61e75f2cfc13ae336b00000mmm",
		avatar:
			"https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fHNwb3J0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
		firstName: "Wilfred",
		age: 28,
		sex: "Male",
		distance: "2.3 km",
		hobbies: "Surfing, Dancing, Golf",
		bio: "Don't follow your dream, follow me~~",
	},
	{
		id: "61e8baa1148889767506221kguk",
		avatar:
			"https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Z2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
		firstName: "Riley",
		age: 22,
		sex: "Female",
		distance: "15 km",
		hobbies: "Fashion design, practical jokes, feng shui decorating",
		bio: "maximize viral mindshare",
	},
];

const Match = () => {
	const [profiles, setProfiles] = useState(cards);

	//   if (loading) return "Loading...";
	//   if (error) return `Error! ${error.message}`;

	const handleLike = () => {
		handleSelect(true);
	};

	const handleReject = () => {
		handleSelect(false);
	};

	const handleSelect = (isLiked) => {
		const animation = isLiked ? "flyRight" : "flyLeft";
		const topProfile = profiles[0];
		const topCard = document.getElementById(topProfile.id);

		topCard.classList.add(animation);

		setTimeout(() => {
			setProfiles(profiles.filter((item) => item !== topProfile));
		}, 600);
		console.log(topCard.classList);
	};

	useEffect(() => {
		if (profiles.length === 0) {
			setProfiles(cards2);
		}
	}, [profiles]);

	return (
		<div className="matchPage">
			<Navbar />
			<div className="deckContainer h-1/2 flex items-center justify-center">
				<Deck cards={profiles} />
			</div>
			<div className="container flex space-x-24 max-w-sm h-1/5 mx-auto px-20 py-[2%]">
				<CircleButton
					icon={Reject}
					onClick={handleReject}
					bgColor="secondary"
				/>
				<CircleButton icon={Heart} onClick={handleLike} bgColor="primary" />
			</div>
		</div>
	);
};

export default Match;
