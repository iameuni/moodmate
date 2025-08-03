import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "./History.css";

function History() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const [recordedDates, setRecordedDates] = useState({});
  const [today, setToday] = useState(new Date());

  const emojiMap = {
    기쁨: "😄",
    슬픔: "😢",
    분노: "😡",
    공포: "😱",
    놀람: "😲",
    혐오: "🤢",
  };

  useEffect(() => {
    const data = {};
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("chat_")) {
        const date = key.replace("chat_", "");
        const chats = JSON.parse(localStorage.getItem(key));
        const lastBotMsg = chats
          .slice()
          .reverse()
          .find((msg) => msg.type === "bot" && msg.text.includes("분석"));
        if (lastBotMsg) {
          const emotion = Object.keys(emojiMap).find((em) =>
            lastBotMsg.text.includes(em)
          );
          if (emotion) {
            data[date] = emojiMap[emotion];
          }
        }
      }
    });
    setRecordedDates(data);
  }, []);

  const formatDate = (date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  return (
    <div className="history-container">
      <h2>📅 감정 기록</h2>
      <Calendar
        onClickDay={(date) => navigate(`/history/${formatDate(date)}`)}
        value={value}
        locale="ko-KR"
        calendarType="iso8601"
        formatDay={(_, date) => date.getDate()}
        tileContent={({ date }) => {
          const d = formatDate(date);
          return recordedDates[d] ? (
            <div className="tile-inner">
              <div className="emoji-indicator">{recordedDates[d]}</div>
            </div>
          ) : null;
        }}
        tileClassName={({ date, view }) => {
          const classes = [];
          const d = formatDate(date);
          if (date.toDateString() === today.toDateString()) {
            classes.push("today");
          }
          if (view === "month" && date.getMonth() !== value.getMonth()) {
            classes.push("other-month");
          }
          return classes.join(" ");
        }}
      />
    </div>
  );
}

export default History;
