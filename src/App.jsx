import { useSelector } from "react-redux";
import { useState } from 'react';
import UploadZone from "./components/UploadZone";
import DiagnosisResult from "./components/DiagnosisResult";
import Disclaimer from './components/Disclaimer';

export default function App() {
    const { status } = useSelector((state) => state.diagnosis);
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    if (showDisclaimer) {
    return (
      <Disclaimer onAccept={() => {
        localStorage.setItem('vd_accepted', 'true');
        setShowDisclaimer(false);
      }} />
    );
  }
    return (
        <div style={{ minHeight: "100vh", background: "#F6F4EF" }}>
            {status !== "done" && <UploadZone />}
            {status === "done" && <DiagnosisResult />}
        </div>
    );
}
