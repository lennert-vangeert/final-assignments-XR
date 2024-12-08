import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  //   env
  const url = import.meta.env.API_URL;
  console.log(url);

  useEffect(() => {
    fetch("https://whiskerwingsleaderboard.onrender.com/")
      .then((res) => res.json())
      .then((data) => {
        setLeaderBoard(data);
      });
  }, []);

  return (
    <div className="leaderboard_container">
      <div className="leaderboard_item">
        <span className="leaderboard_rank">1</span>
        <span className="leaderboard_name">John Doe</span>
        <span className="leaderboard_score">120</span>
      </div>
      <div className="leaderboard_item">
        <span className="leaderboard_rank">2</span>
        <span className="leaderboard_name">Jane Doe</span>
        <span className="leaderboard_score">100</span>
      </div>
      <div className="leaderboard_item">
        <span className="leaderboard_rank">3</span>
        <span className="leaderboard_name">Foo Bar</span>
        <span className="leaderboard_score">80</span>
      </div>
      <div className="leaderboard_item">
        <span className="leaderboard_rank">4</span>
        <span className="leaderboard_name">Foo Bar</span>
        <span className="leaderboard_score">80</span>
      </div>
      <div className="leaderboard_item">
        <span className="leaderboard_rank">5</span>
        <span className="leaderboard_name">Foo Bar</span>
        <span className="leaderboard_score">80</span>
      </div>
      <div className="leaderboard_item">
        <span className="leaderboard_rank">6</span>
        <span className="leaderboard_name">Foo Bar</span>
        <span className="leaderboard_score">80</span>
      </div>
      <div className="leaderboard_item">
        <span className="leaderboard_rank">7</span>
        <span className="leaderboard_name">Foo Bar</span>
        <span className="leaderboard_score">80</span>
      </div>
      <div className="leaderboard_item">
        <span className="leaderboard_rank">8</span>
        <span className="leaderboard_name">Foo Bar</span>
        <span className="leaderboard_score">80</span>
      </div>
      <div className="leaderboard_item">
        <span className="leaderboard_rank">9</span>
        <span className="leaderboard_name">Foo Bar</span>
        <span className="leaderboard_score">80</span>
      </div>
      <div className="leaderboard_item">
        <span className="leaderboard_rank">10</span>
        <span className="leaderboard_name">Foo Bar</span>
        <span className="leaderboard_score">80</span>
      </div>
    </div>
  );
};

export default Leaderboard;
