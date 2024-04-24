const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const app = express();
app.use(cors());


const Game = require("./models/Game");
const QuotableAPI = require("./models/QuotableAPI");

const expressServer = app.listen(3001);
const io = socketio(expressServer);

// connect to mongodb
const connectionString =
	"mongodb+srv://angel:SXnWn1BKH44bzk9r@i-am-trying.3o3ilyl.mongodb.net/?retryWrites=true&w=majority";

// check connection and such
mongoose.connect(connectionString).catch((err) => console.log(err));

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(8080, () => {
		console.log(`Server started on port 8080`);
	});
});

io.on("connection", (socket) => {
	socket.on("create game", async (nickname) => {
		console.log(`Socket ${socket.id} created game`);
		try {
			const quotableData = await QuotableAPI();
			let game = new Game();
			game.words = quotableData;

			let player = {
				socketID: socket.id,
				isPartyLeader: true,
				nickname: nickname,
			};
			game.players.push(player);
			game = await game.save();

			const gameID = game._id.toString();
			socket.join(gameID);
			io.to(gameID).emit("updateGame", game);
		} catch (err) {
			console.log(err);
		}
	});

	socket.on("join game", async ({ gameID: _id, nickname }) => {
		try {
			console.log(`Socket ${socket.id} joined game`);
			let game = await Game.findById(_id);
			if (game.isOpen) {
				const gameID = game._id.toString();
				socket.join(gameID);
				let player = {
					socketID: socket.id,
					isPartyLeader: false,
					nickname: nickname,
				};
				game.players.push(player);
				game = await game.save();
				io.to(gameID).emit("updateGame", game);
			}
		} catch {
			console.log(err);
		}
	});

	socket.on("timer", async ({ gameID, playerID }) => {
		let countDown = 5;
		let game = await Game.findById(gameID);
		let player = game.players.id(playerID);
		if (player.isPartyLeader) {
			let timerID = setInterval(async () => {
				if (countDown >= 0) {
					io.to(gameID).emit("timer", {
						countdown: countDown,
						msg: "Game starting soon...",
					});
					countDown--;
				} else {
					game.isOpen = false;
					game = await game.save();
					io.to(gameID).emit("updateGame", game);
					startGameClock(gameID);
					clearInterval(timerID);
				}
			}, 1000);
		}
	});

	socket.on("userInput", async ({ userInput, gameID }) => {
		try {
			let game = await Game.findById(gameID);
			if(!game.isOpen && !game.isOver) {
				let player = game.players.find((player) => player.socketID === socket.id);
				let word = game.words[player.currentWordIndex];
				if (word === userInput) {
					player.currentWordIndex++;
					if (player.currentWordIndex !== game.words.length) {
						game = await game.save();
						io.to(gameID).emit("updateGame", game);
					} else {
						let endTime = new Date().getTime();
						let { startTime } = game;
						player.WPM = calculateWPM(endTime, startTime, player);
						game = await game.save();
						io.to(gameID).emit("updateGame", game);
						socket.emit("done", game);
					}
				}
			}
		} catch (err) {
			console.log(err);
		}
	});
});


// util functions
const startGameClock = async (gameID) => {
	let game = await Game.findById(gameID);
	game.startTime = new Date().getTime();
	game = await game.save();
	let time = 30;
	let timerID = setInterval(gameIntervalFunc = () => {
		console.log("time: ", time);
		if (time >= 0) {
			const formatTime = calculateTime(time);
			io.to(gameID).emit("timer", {
				countdown: formatTime,
				msg: "Game in progress...",
			});
			time--;
		} else {
			(async () => {
				let endTime = new Date().getTime();
				let game = await Game.findById(gameID);
				let { startTime } = game;
				game.isOver = true;
				game.players.forEach((player, index) => {
					if (player.WPM === -1) {
						game.players[index].WPM = calculateWPM(endTime, startTime, player);
					}
				});
				game = await game.save();
				io.to(gameID).emit("updateGame", game);
				clearInterval(timerID);
			})();
		}

		return gameIntervalFunc;
	}, 1000);
};

const calculateTime = (time) => {
	let minutes = Math.floor(time / 60);
	let seconds = time % 60;
	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const calculateWPM = (endTime, startTime, player) => {
	// console.log("player: ", player, "endTime: ", endTime, "startTime: ", startTime, "player.currentWordIndex: ", player.currentWordIndex);
	let numWords = player.currentWordIndex;
	const timeSeconds = (endTime - startTime) / 1000;
	const timeMin = timeSeconds / 60;
	const wpm = Math.floor(numWords / timeMin);
	return wpm;
};