import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BottomNav.css";

const tabs = [
  { icon: "🏠", label: "홈", path: "/chat" },
  { icon: "📚", label: "도감", path: "/collection" },
  { icon: "📅", label: "캘린더", path: "/history" },
  { icon: "👤", label: "마이페이지", path: "/settings" },
];

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <div
          key={tab.path}
          className={`tab-item ${
            location.pathname === tab.path ? "active" : ""
          }`}
          onClick={() => navigate(tab.path)}
        >
          <div className="tab-icon">{tab.icon}</div>
          <div className="tab-text">{tab.label}</div>
        </div>
      ))}
    </nav>
  );
}

export default BottomNav;
