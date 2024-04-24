import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import socket from "./socketConfig";
import GameMenu from "./components/GameMenu";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import TypeRacer from "./components/TypeRacer";
import { useNavigate } from "react-router-dom";


function App() {
  let navigate = useNavigate();
	const [gameState, setGameState] = useState({
		_id: "",
		isOpen: true,
		players: [],
		words: [],
	});
	useEffect(() => {
		socket.on("updateGame", (game) => {
			console.log(`Game Data: ${game._id},${game.isOpen}, ${game.isOver},${game.players}}`);
			setGameState(game);
		});
    return () => {
      socket.removeAllListeners();
    }
	}, []);

	useEffect(() => {
		if (gameState._id !== "") { 
      navigate(`/game/${gameState._id}`);
    }
	}, [gameState, navigate]);

	return (
		<div>
			<Routes>
				<Route exact path="/" element={<GameMenu />} />
        <Route path="/game/create" element={<CreateGame />} />
				<Route path="/game/join" element={<JoinGame />} />
				<Route path="/game/:gameID" element={<TypeRacer gameState={gameState} />} />
			</Routes>
		</div>
	);
}

export default App;
