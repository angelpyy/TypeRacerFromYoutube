import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
	const redirectToHomepage = () => {
		window.location.href = "/";
	};

	return (
		<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="container">
				{/* Clickable "Type Racer" title that redirects to the homepage */}
				<button className="navbar-brand btn" onClick={redirectToHomepage}>
					Type Racer
				</button>
			</div>
		</nav>
	);
}
