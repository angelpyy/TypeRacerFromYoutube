import React, { useEffect, useState } from "react";
import socket from "../socketConfig";

export default function StartButton({ player, gameID }) {
	const [showStartButton, setShowStartButton] = useState(true);
	const isPartyLeader = player.isPartyLeader;

	// so jank and trash
	useEffect(() => {
		if (isPartyLeader) setShowStartButton(true);
	}, [isPartyLeader]);

	const onClick = () => {
		console.log(
			`clicked start game, emitting:\nplayer._id: ${player._id}\ngameID; ${gameID}`
		);
		socket.emit("timer", { playerID: player._id, gameID });
		setShowStartButton(false);
	};

	return isPartyLeader && showStartButton ? (
		<button type="button"  className="btn btn-primary mr-3" onClick={onClick}>
			Start Game
		</button>
	) : null;
}
