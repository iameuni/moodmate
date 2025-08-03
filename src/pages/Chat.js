import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import "./Chat.css";

// 기본 감정과 세부 감정
const emotionMap = {
  기쁨: ["설레는", "감사한", "만족스러운", "행복한", "사랑스러운"],
  슬픔: ["우울한", "외로운", "아픈", "미련한", "그리운"],
  분노: ["화난", "짜증나는", "분개하는", "격렬한", "좌절하는"],
  공포: ["두려운", "불안한", "떨리는", "경계하는", "궁금한"],
  놀람: ["놀라운", "반가운", "충격적인", "예상치 못한", "기대 이상인"],
  혐오: ["역겨운", "불쾌한", "혐오스러운", "불편한", "당혹스러운"],
};

// 레벨 계산
const calculateLevel = (count) => {
  if (count >= 30) return 5;
  if (count >= 15) return 4;
  if (count >= 7) return 3;
  if (count >= 3) return 2;
  return 1;
};

// 오늘 날짜 key
const getTodayKey = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `chat_${year}-${month}-${day}`;
};

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ✅ 초기 로딩: 오늘 채팅 불러오기
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(getTodayKey())) || [];
    if (saved.length === 0) {
      setMessages([{ type: "bot", text: "오늘 기분은 어땠나요?" }]);
    } else {
      setMessages(saved);
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    // 랜덤 감정 선택
    const baseEmotions = Object.keys(emotionMap);
    const base = baseEmotions[Math.floor(Math.random() * baseEmotions.length)];
    const detailList = emotionMap[base];
    const detail = detailList[Math.floor(Math.random() * detailList.length)];
    const characterName = `${detail} ${base}`;

    const userMessage = { type: "user", text: input };
    const botMessage = {
      type: "bot",
      text: `당신의 감정은 "${characterName}"으로 분석되었어요!`,
    };

    // 기존 도감 불러오기
    let collection =
      JSON.parse(localStorage.getItem("characterCollection")) || [];
    const existing = collection.find((c) => c.name === characterName);
    if (existing) {
      existing.count += 1;
      existing.level = calculateLevel(existing.count);
    } else {
      collection.push({
        name: characterName,
        baseEmotion: base,
        count: 1,
        level: 1,
      });
    }

    localStorage.setItem("characterCollection", JSON.stringify(collection));
    localStorage.setItem(
      "todayCharacter",
      JSON.stringify({ name: characterName })
    );

    // 메시지 갱신
    const newMessages = [...messages, userMessage, botMessage];
    setMessages(newMessages);
    localStorage.setItem(getTodayKey(), JSON.stringify(newMessages));
    setInput("");
  };

  return (
    <PageWrapper>
      <div className="chat-container">
        <h2>MoodMate</h2>
        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${msg.type === "user" ? "user" : "bot"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input-bar">
          <input
            type="text"
            placeholder="채팅을 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && handleSend()}
            inputMode="text"
          />
          <button onClick={handleSend}>전송</button>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Chat;
