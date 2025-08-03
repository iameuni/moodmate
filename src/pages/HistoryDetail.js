import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import "./HistoryDetail.css";

function HistoryDetail() {
  const { date } = useParams();
  const navigate = useNavigate();
  const [chatLog, setChatLog] = useState([]);
  const [lastEmotion, setLastEmotion] = useState(null);

  // 날짜 포맷: 2025-04-06 → 2025년 4월 6일
  const formatKoreanDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${year}년 ${Number(month)}월 ${Number(day)}일`;
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`chat_${date}`)) || [];
    setChatLog(stored);

    // 마지막 감정 메시지 찾아서 대표 캐릭터 설정
    const reversed = [...stored].reverse();
    const last = reversed.find(
      (msg) => msg.type === "bot" && msg.text.includes("분석되었어요")
    );
    if (last) {
      const match = last.text.match(/"(.+?)"/);
      if (match && match[1]) {
        setLastEmotion(match[1]);
      }
    }
  }, [date]);

  return (
    <PageWrapper>
      <div className="history-detail-container">
        <div className="history-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            &lt;
          </button>
          <h2 className="date-title">{formatKoreanDate(date)}</h2>
        </div>

        {/* 대표 캐릭터 이미지 */}
        {lastEmotion && (
          <div className="history-character-image">
            <img
              src={`/images/characters/${
                lastEmotion.split(" ")[1] || lastEmotion
              }.png`}
              alt={lastEmotion}
            />
            <div className="history-character-name">{lastEmotion}</div>
          </div>
        )}

        {/* 채팅 기록 */}
        <div className="chat-log">
          {chatLog.length === 0 ? (
            <p className="no-record">기록 없음</p>
          ) : (
            chatLog.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${
                  msg.type === "user" ? "user" : "bot"
                }`}
              >
                {msg.text}
              </div>
            ))
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

export default HistoryDetail;
