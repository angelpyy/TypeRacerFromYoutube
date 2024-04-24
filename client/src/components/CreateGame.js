import React, { useState } from "react";
import socket from "../socketConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

function GameForm({ nickname, onChange, onSubmit }) {
	return (
		<form onSubmit={onSubmit}>
			<div className="form-group">
				<label htmlFor="nickname">Enter Nickname</label>
				<input
					className="form-control"
					type="text"
					name="nickname"
					value={nickname}
					onChange={onChange}
					placeholder="Enter Nickname"
				/>
				<button className="btn btn-primary mt-3" type="submit">
					Submit
				</button>
			</div>
		</form>
	);
}

export default function CreateGame() {
	const [nickname, setNickname] = useState("");

	const onChange = (e) => {
		setNickname(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		socket.emit("create game", nickname);
	};

	return (
		<>
			<Navbar />
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-sm-6">
						<h1 className="text-center">Create Game</h1>
						<GameForm
							nickname={nickname}
							onChange={onChange}
							onSubmit={onSubmit}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
