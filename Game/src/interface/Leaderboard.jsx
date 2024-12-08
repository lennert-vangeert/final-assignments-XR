import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  //   env
  const url = import.meta.env.API_URL;

  //   https://whiskerwingsleaderboard.onrender.com/leaderboard
  useEffect(() => {
    fetch("https://whiskerwingsleaderboard.onrender.com/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setLeaderBoard(data);
      });
  }, []);

  if (leaderBoard.length === 0) {
    return <div className="leaderboard_container">Loading...</div>;
  } else
    return (
      <div className="leaderboard_container">
        {leaderBoard.map((item, index) => (
          <div key={index} className="leaderboard_item">
            <span className="leaderboard_rank">{index + 1}</span>
            <span className="leaderboard_name">{item.userName}</span>
            <span className="leaderboard_score">{item.score}</span>
          </div>
        ))}
      </div>
    );
};

export default Leaderboard;
