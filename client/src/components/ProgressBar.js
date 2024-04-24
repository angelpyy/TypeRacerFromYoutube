import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

// This function calculates the percentage
const calculatePercentage = (player, wordsLength) => {
  if (player.currentWordIndex !== 0) {
    return ((player.currentWordIndex / wordsLength) * 100).toFixed(2) + "%";
  }
  return 0;
};

// ProgressBar component
const ProgressComponent = ({player, wordLength}) => {
  const percentage = calculatePercentage(player, wordLength);
  return (
    <>
      <h5 className="text-left">{player.nickname}</h5>
      <div className="progress my-1" key={player._id}>
        <div className="progress-bar" role="progressbar" style={{ width: percentage }}>
          {percentage}
        </div>
      </div>
    </>
  );
}

// Parent component
export default function ProgressBar({ player, players, wordsLength }) {
  return (
    <div>
      <ProgressComponent player={player} wordLength={wordsLength} /> {/* render the current player bar */}
        {players.map(p =>  
          p._id !== player._id && <ProgressComponent player={p} wordLength={wordsLength} key={p}/> /* renders the bars for other players */
        )}
    </div>
  );
}
