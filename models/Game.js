const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
	currentWordIndex : {
		type : Number,
		default : 0,
	},
	socketID : {
		type : String,
	},
	isPartyLeader : {
		type : Boolean,
		default : false,
	},
	WPM : {
		type : Number,
		default : -1,
	},
	nickname : {
		type : String,
		default : "NPC",
	},
});

const GameSchema = new mongoose.Schema({
	words : [{
		type : String,
	}],
	isOpen : {
		type : Boolean,
		default : true,
	},
	isOver : {
		type : Boolean,
		default : false,
	},
	startTime : {
		type : Number
	},
	players : [PlayerSchema],
});

module.exports = mongoose.model("Game", GameSchema);
