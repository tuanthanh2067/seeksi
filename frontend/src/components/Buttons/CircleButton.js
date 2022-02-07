import React from "react";
import styles from "./CircleButton.module.css";

function CircleButton(props) {
	return (
		<button
			className={`shadow-card border-none rounded-full transition ease-in hover:scale-125 ${props.iconName} ${styles.iconContainer}`}
			onClick={props.onClick}
		>
			<img src={props.icon} alt="icon" className={`mx-auto w-1/2`} />
		</button>
	);
}

export default CircleButton;
