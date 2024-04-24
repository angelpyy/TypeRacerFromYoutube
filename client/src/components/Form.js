import React, { useState, useRef, useEffect } from "react";
import socket from "../socketConfig";

export default function Form({ gameID, isOpen, isOver }) {
	const [userInput, setUserInput] = useState("");
	const inputRef = useRef(null);

	useEffect(() => {
		console.log(`gameID: ${gameID} isOpen: ${isOpen} isOver: ${isOver}`);
	});

	// okay so basically it never updates the isOpen to false
	// so it never calls the useEffect below
	// and it also never satisifies the condition for enabling inputRef.current.focus()
	// so i need to figure something else out
	useEffect(() => {
		if (!isOpen) {
			inputRef.current?.focus();
		}
	}, [isOpen]);

	const resetForm = () => {
		setUserInput("");
	};

	const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    socket.emit("userInput", { userInput, gameID });
    resetForm();
  };

	const onChange = (e) => {
		// xconsole.log(`gameID: ${gameID} isOpen: ${isOpen} isOver: ${isOver}`);
		let value = e.target.value;
		let lastChar = value.charAt(value.length - 1);
		if (lastChar === " ") {
			socket.emit("userInput", { userInput, gameID });
			resetForm();
		} else {
			setUserInput(e.target.value);
		}
	};

	return (
		<div className="row my-3">
			<div className="col-sm"></div>
			<div className="col-sm-4">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<input
							readOnly={isOpen || isOver}
							value={userInput}
							onChange={onChange}
							className="form-control"
							ref={inputRef}
						/>
					</div>
				</form>
			</div>
			<div className="col-sm"></div>
		</div>
	);
}
