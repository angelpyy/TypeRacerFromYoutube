import React, { useState, useRef } from "react";

export default function DisplayGameCode({ gameID }) {
	const [copiedCode, setCopiedCode] = useState(false);
	const inputRef = useRef(null);

	const copytoClipboard = () => {
		inputRef.current.select();
		document.execCommand("copy");
		setCopiedCode(true);
		setTimeout(() => {
			setCopiedCode(false);
		}, 2000);
	};

	return (
		<div className="row my-3">
			<div className="col-sm"></div>
			<div className="col-sm-8">
				<h4>Share this code to have friends join!</h4>
				<div className="input-group mb-3">
					<input
						ref={inputRef}
						value={gameID}
						readOnly={true}
						className="form-control"
					></input>
					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							onClick={copytoClipboard}
							type="button"
						>
							Copy Game Code
						</button>
					</div>
				</div>
				{copiedCode ? <div className="alert alert-success" role="alert">Copied!</div> : null}
			</div>
			<div className="col-sm"></div>
		</div>
	);
}
