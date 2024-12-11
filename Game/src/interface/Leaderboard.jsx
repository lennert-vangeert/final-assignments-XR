import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  //   env
  const liveUrl = "https://whiskerwingsleaderboard.onrender.com/leaderboard";
  const localUrl = "http://localhost:5000/leaderboard";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/leaderboard`)
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data
          .filter((item) => !isNaN(parseFloat(item.score))) // Remove invalid scores
          .sort((a, b) => parseFloat(a.score) - parseFloat(b.score)); // Sort by score (ascending)
        setLeaderBoard(sortedData);
      });
  }, []);

  if (leaderBoard.length === 0) {
    return <div className="right_container">Loading...</div>;
  } else
    return (
      <div className="right_container">
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
