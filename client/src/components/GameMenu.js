import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function GameMenu() {
  let navigate = useNavigate();

  return (
    <div className="text-center">
      <Navbar />
      <h1>Welcome to Type Racer Clone</h1>
      <div className="d-flex justify-content-center mb-3"> {/* Add d-flex class to create a flex container */}
        <button
          type="button"
          className="btn btn-primary mr-3"
          onClick={() => navigate("/game/create")}
        >
          Create Game
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/game/join")}
        >
          Join Game
        </button>
      </div>
    </div>
  );
};
