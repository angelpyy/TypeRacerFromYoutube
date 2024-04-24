import React from "react";

export default function DisplayWords({ player, words }) {
	const typedCorrectlyStyle = {
		color: "#34ebc0",
	};
	const getTypedWords = (player, words) => {
		let typedWords = words.slice(0, player.currentWordIndex);
		typedWords = typedWords.join(" ");
		return <span style={typedCorrectlyStyle}>{typedWords} </span>;
	};

	const currentStyle = {
		textDecoration: "underline",
	};
	const getCurrentWord = (player, words) => {
		return <span style={currentStyle}>{words[player.currentWordIndex]}</span>;
	};

	const getWordstoType = (player, words) => {
		let wordsToType = words.slice(player.currentWordIndex + 1);
		wordsToType = wordsToType.join(" ");
		return <span> {wordsToType}</span>;
	};

	return (
		<div>
			{getTypedWords(player, words)}
			{getCurrentWord(player, words)}
			{getWordstoType(player, words)}
		</div>
	);
}
