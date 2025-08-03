import React from "react";
import PageWrapper from "../components/PageWrapper";
import "./Settings.css";

function Settings() {
  // 추후 백엔드 연동 시 받아올 정보
  const nickname = "하은";
  const email = "haeun@example.com";

  return (
    <PageWrapper>
      <div className="settings-profile">
        <img
          src="/images/profile-placeholder.png"
          alt="프로필"
          className="profile-img"
        />
        <div>
          <p className="nickname">{nickname}</p>
          <p className="email">{email}</p>
        </div>
      </div>

      <div className="settings-section">
        <h3>📊 이번주 감정 분포</h3>
        <div className="emotion-graph">
          <p>(여기에 감정 그래프 들어갈 예정)</p>
        </div>
      </div>

      <div className="settings-section">
        <h3>💡 MoodMate</h3>
        <p>
          무드메이트는 당신의 감정을 캐릭터로 표현하고 수집하는 감정 기록
          서비스입니다.
        </p>
      </div>
    </PageWrapper>
  );
}

export default Settings;
