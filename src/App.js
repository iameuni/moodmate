import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Collection from "./pages/Collection";
import History from "./pages/History";
import HistoryDetailPage from "./pages/HistoryDetail";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";

// ⬇️ 탭바 조건부 렌더링을 위해 감싸는 컴포넌트 정의
function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <div style={{ paddingBottom: "60px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:date" element={<HistoryDetailPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      {!isHome && <BottomNav />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
