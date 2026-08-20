import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { runDiagnosis, clearCurrent } from "../store/diagnosisSlice";

// useDispatch lets this component send actions to the Redux store
// useSelector lets this component read data from the Redux store
// — same hooks you used in your Trello clone

export default function UploadZone() {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.diagnosis);

    // This is LOCAL state — just for the image preview
    // It doesn't need to live in Redux because nothing else in the app needs it
    const [preview, setPreview] = useState(null);
    const [imageData, setImageData] = useState(null); // { base64, mimeType }
    const [dragActive, setDragActive] = useState(false);

    const fileInputRef = useRef(null);

    // When a file is selected, we do two things:
    // 1. Create a preview URL so the user can see their photo
    // 2. Convert it to base64 so Gemini can read it (APIs can't accept raw files)
    function handleFile(file) {
        if (!file || !file.type.startsWith("image/")) return;

        setPreview(URL.createObjectURL(file));

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Draw the image onto a canvas and export as JPEG
                // This converts any format (webp, heic, png) into something all models accept
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                // toDataURL gives us "data:image/jpeg;base64,/9j/..."
                // we split on the comma to get just the base64 part
                const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.85);
                const base64 = jpegDataUrl.split(",")[1];

                console.log(
                    "Converted to JPEG, new base64 length:",
                    base64.length,
                );
                setImageData({ base64, mimeType: "image/jpeg" });
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function handleDrop(e) {
        e.preventDefault();
        setDragActive(false);
        handleFile(e.dataTransfer.files[0]);
    }

    function handleDiagnose() {
        if (!imageData) return;
        console.log("Image data check:", {
            hasBase64: !!imageData.base64,
            mimeType: imageData.mimeType,
            base64Length: imageData.base64?.length,
        });
        // Make sure the property names match exactly what the slice expects
        // base64Image and mimeType — not base64 and mimeType
        dispatch(
            runDiagnosis({
                base64Image: imageData.base64,
                mimeType: imageData.mimeType,
            }),
        );
    }

    function handleReset() {
        setPreview(null);
        setImageData(null);
        dispatch(clearCurrent());
    }

    return (
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "2rem 1rem" }}>
            <h1 style={{ fontSize: 24, marginBottom: 8 }}>🍇 VineDoctor</h1>
            <p style={{ color: "#666", marginBottom: 24 }}>
                Take a photo of a sick vine. Get an instant diagnosis.<br />
                Please take screenshot of any errors and send to Joshua.
            </p>

            {/* Show the dropzone only if no photo has been selected yet */}
            {!preview && (
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                    style={{
                        border: `2px dashed ${dragActive ? "#3B6D11" : "#ccc"}`,
                        borderRadius: 12,
                        padding: "3rem 1rem",
                        textAlign: "center",
                        cursor: "pointer",
                        background: dragActive ? "#f0f7e8" : "#fafafa",
                    }}
                >
                    <p style={{ fontSize: 32 }}>📷</p>
                    <p style={{ fontWeight: 500 }}>
                        Drop a photo here or click to browse
                    </p>
                    <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
                        A clear close-up of the affected leaf or stem works best
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => handleFile(e.target.files[0])}
                    />
                </div>
            )}

            {/* Once a photo is selected, show the preview and the diagnose button */}
            {preview && (
                <div>
                    <img
                        src={preview}
                        alt="Selected vine"
                        style={{
                            width: "100%",
                            borderRadius: 12,
                            marginBottom: 12,
                        }}
                    />

                    {/* Only show the button if we haven't run a diagnosis yet */}
                    {status !== "done" && (
                        <button
                            onClick={handleDiagnose}
                            disabled={status === "loading"}
                            style={{
                                width: "100%",
                                padding: "12px",
                                background: "#3B6D11",
                                color: "#fff",
                                border: "none",
                                borderRadius: 8,
                                fontSize: 15,
                                fontWeight: 600,
                                cursor:
                                    status === "loading"
                                        ? "not-allowed"
                                        : "pointer",
                                opacity: status === "loading" ? 0.7 : 1,
                            }}
                        >
                            {status === "loading"
                                ? "Analysing your vine..."
                                : "Diagnose this vine"}
                        </button>
                    )}

                    {/* Error state — something went wrong with the API call */}
                    {status === "error" && (
                        <p style={{ color: "red", marginTop: 8, fontSize: 13 }}>
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleReset}
                        style={{
                            width: "100%",
                            marginTop: 8,
                            padding: "10px",
                            background: "transparent",
                            border: "1px solid #ccc",
                            borderRadius: 8,
                            fontSize: 14,
                            cursor: "pointer",
                        }}
                    >
                        Use a different photo
                    </button>
                </div>
            )}
        </div>
    );
}
