import { useSelector } from "react-redux";
import UploadZone from "./components/UploadZone";
import DiagnosisResult from "./components/DiagnosisResult";

export default function App() {
    const { status } = useSelector((state) => state.diagnosis);
    return (
        <div style={{ minHeight: "100vh", background: "#F6F4EF" }}>
            {status !== "done" && <UploadZone />}
            {status === "done" && <DiagnosisResult />}
        </div>
    );
}
