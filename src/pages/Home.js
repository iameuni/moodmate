import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // 홈 진입 시 탭바 숨기기
    document.body.classList.add("hide-tabbar");
    return () => {
      document.body.classList.remove("hide-tabbar");
    };
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>MoodMate</h1>
        <p>오늘의 감정을 기록해볼까요?</p>
        <button onClick={() => navigate("/chat")}>기분 기록하러 가기</button>
      </div>
    </div>
  );
}

export default Home;
