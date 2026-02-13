import { Navigate, Route, Routes } from "react-router-dom";
import Opening from "./components/Opening.jsx";
import DateConfirmedPage from "./components/DateConfirmedPage.jsx";
import SunbeamSnapshotsPage from "./components/SunbeamSnapshotsPage.jsx";
import LoveFoundPage from "./components/LoveFoundPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Opening />} />
      <Route
        path="/date-request-sent"
        element={<Navigate to="/date-confirmed" replace />}
      />
      <Route path="/date-confirmed" element={<DateConfirmedPage />} />
      <Route path="/sunbeam-snapshots" element={<SunbeamSnapshotsPage />} />
      <Route path="/404-love-found" element={<LoveFoundPage />} />
      <Route path="/oops-sour" element={<LoveFoundPage />} />
      <Route path="*" element={<Navigate to="/404-love-found" replace />} />
    </Routes>
  );
}

export default App;
