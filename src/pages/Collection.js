import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import "./Collection.css";

const emotions = ["전체", "기쁨", "슬픔", "분노", "공포", "놀람", "혐오"];

function Collection() {
  const [selectedEmotion, setSelectedEmotion] = useState("전체");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterCollection, setCharacterCollection] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("characterCollection")) || [];
    setCharacterCollection(saved);
  }, []);

  // 필터: 전체 또는 baseEmotion 일치
  const filteredCharacters =
    selectedEmotion === "전체"
      ? characterCollection
      : characterCollection.filter(
          (char) => char.baseEmotion === selectedEmotion
        );

  const showCharacter = selectedCharacter;

  return (
    <PageWrapper>
      <div className="collection-container">
        <h2>📁 감정 도감</h2>

        {/* 대표 캐릭터 영역 */}
        <div className="main-character-area">
          {showCharacter ? (
            <>
              <div className="main-character-header">
                <span className="main-character-level">
                  Lv.{showCharacter.level}
                </span>
                <span className="main-character-name">
                  {showCharacter.name}
                </span>
              </div>
              <div className="main-character-image">
                <img
                  src={`/images/characters/${showCharacter.baseEmotion}.png`}
                  alt={showCharacter.name}
                />
              </div>
            </>
          ) : (
            <div className="character-image-empty" />
          )}
        </div>

        {/* 감정 필터 버튼 */}
        <div className="emotion-filter">
          {emotions.map((em, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedEmotion(em);
                setSelectedCharacter(null);
              }}
              className={em === selectedEmotion ? "active" : ""}
            >
              {em}
            </button>
          ))}
        </div>

        {/* 도감 캐릭터 리스트 */}
        <div className="collection-scroll-area">
          <div className="collection-list">
            {filteredCharacters.map((char, idx) => (
              <div
                key={idx}
                className="collection-card"
                onClick={() => setSelectedCharacter(char)}
              >
                <img
                  src={`/images/characters/${char.baseEmotion}.png`}
                  alt={char.name}
                  className="character-icon"
                />
                <div className="name-level-inline">
                  <span className="level-text">Lv.{char.level}</span>
                  <span>{char.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Collection;
