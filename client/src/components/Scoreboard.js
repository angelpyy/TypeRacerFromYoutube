import React from "react";

const getScoreboard = (players) => {
	const scoreboard = players.filter((player) => player.WPM !== -1);
	return scoreboard.sort((a, b) =>
		a.WPM > b.WPM ? -1 : b.WPM > a.WPM ? 1 : 0
	);
};

export default function Scoreboard({ players }) {
	const scoreboard = getScoreboard(players);
	if (scoreboard.length === 0) {
		return null;
	}
	return (
		<table className="table table-striped my-3">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">User</th>
					<th scope="col">WPM</th>
				</tr>
			</thead>
			<tbody>
				{scoreboard.map((player, index) => {
					return (
						<tr key={index}>
							<th scope="row">{index + 1}</th>
							<td>{player.nickname}</td>
							<td>{player.WPM}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
