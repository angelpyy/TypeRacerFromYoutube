import React, { useState } from "react";
import socket from "../socketConfig";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CreateGame() {
	const [userInput, setUserInput] = useState({ gameID: "", nickname: "" });
	const onChange = (e) => {
		setUserInput({ ...userInput, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		// console.log('Submitted nickname:', nickname);
		socket.emit("join game", userInput);
	};

	return (
		<>
		<Navbar />
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-sm-6">
					<h1 className="text-center">Join Game</h1>
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<label htmlFor="nickname">Enter Nickname</label>
							<input
								className="form-control"
								type="text"
								name="nickname"
								value={userInput.nickname}
								onChange={onChange}
								placeholder="Enter Nickname"
							/>
							<label>Enter Game ID</label>
							<input
								className="form-control"
								type="text"
								name="gameID"
								value={userInput.gameID}
								onChange={onChange}
								placeholder="Enter Game ID"
							/>
							<button className="btn btn-primary mt-3" type="submit">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		</>
	);
}
