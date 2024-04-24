import React from "react";
import Countdown from './Countdown';
import StartButton from './StartButton';
import DisplayWords from './DisplayWords';
import Form from './Form';
import ProgressBar from './ProgressBar';
import Scoreboard from './Scoreboard';
import DisplayGameCode from "./DisplayGameCode";
import socket from "../socketConfig";
import Navbar from "./Navbar";

const findPlayer = (players) => {
	let huh = players.find((player) => player.socketID === socket.id);
	return huh
};

export default function TypeRacer({ gameState }) {
	const { _id, players, words, isOpen, isOver } = gameState;
	const player = findPlayer(players);

	if (_id === "") {
		return <redirect to="/" />;
	}

	return (
		<>
		<Navbar	/>
		<div className="container">
			<div className="text-center">
				<DisplayWords player={player} words={words} />
				<ProgressBar player={player} players={players} wordsLength={words.length} />
				<Form gameID={_id} isOpen={isOpen} isOver={isOver} />
				<Countdown />
				<StartButton player={player} gameID={_id} />
				<Scoreboard players={players}/>
				<DisplayGameCode gameID={_id} />
			</div>
		</div>
		</>
	);
}