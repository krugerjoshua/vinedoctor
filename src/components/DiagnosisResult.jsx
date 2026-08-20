import { useSelector, useDispatch } from "react-redux";
import { clearCurrent } from "../store/diagnosisSlice";

// A lookup object that maps severity levels to colours
// Much cleaner than writing if/else every time a colour is needed
const SEVERITY = {
    high: { bg: "#FCEBEB", color: "#A32D2D", border: "#F5C0C0", label: "High" },
    medium: {
        bg: "#FAEEDA",
        color: "#854F0B",
        border: "#F0C070",
        label: "Medium",
    },
    low: { bg: "#EAF3DE", color: "#27500A", border: "#C0DD97", label: "Low" },
};

export default function DiagnosisResult() {
    const dispatch = useDispatch();
    const { current, history } = useSelector((state) => state.diagnosis);

    // If there's no result yet, render nothing
    // This is called an "early return" — a clean way to handle empty states
    if (!current) return null;

    const sev = SEVERITY[current.severity] || SEVERITY.medium;

    return (
        <div
            style={{
                maxWidth: 600,
                margin: "0 auto",
                padding: "1.5rem 1rem 3rem",
            }}
        >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ fontSize: 32 }}>🍇</div>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>VineDoctor</h1>
                <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
                    Field diagnosis report
                </p>
            </div>

            {/* Main card */}
            <div
                style={{
                    background: "#fff",
                    border: "1px solid #D3D1C7",
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    marginBottom: 16,
                }}
            >
                {/* Green top bar */}
                <div
                    style={{
                        background: "#3B6D11",
                        padding: "14px 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 8,
                    }}
                >
                    <span
                        style={{
                            color: "#EAF3DE",
                            fontSize: 12,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                        }}
                    >
                        Field Report
                    </span>
                    <span
                        style={{
                            background: "rgba(255,255,255,0.15)",
                            color: "#EAF3DE",
                            fontSize: 11,
                            padding: "3px 10px",
                            borderRadius: 99,
                        }}
                    >
                        {sev.label} Severity
                    </span>
                </div>

                {/* Card body */}
                
                                {/* Card body */}
                <div style={{ padding: "20px" }}>

                    {/* Overall summary */}
                    <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7, marginBottom: 16 }}>
                        {current.summary}
                    </p>

                    {/* One card per condition detected */}
                    {current.conditions?.map((c, i) => {
                        const condSev = SEVERITY[c.severity] || SEVERITY.medium;
                        return (
                            <div key={i} style={{
                                background: "#F6F4EF",
                                border: `1px solid ${condSev.border}`,
                                borderLeft: `3px solid ${condSev.color}`,
                                borderRadius: 8,
                                padding: "12px 14px",
                                marginBottom: 10,
                            }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    gap: 6,
                                    marginBottom: 6,
                                }}>
                                    <span style={{ fontWeight: 700, fontSize: 14 }}>
                                        {c.condition}
                                    </span>
                                    <div style={{ display: "flex", gap: 5 }}>
                                        <span style={{
                                            fontSize: 10,
                                            fontWeight: 600,
                                            background: "#F6F4EF",
                                            border: "1px solid #D3D1C7",
                                            color: "#5F5E5A",
                                            padding: "2px 8px",
                                            borderRadius: 4,
                                        }}>
                                            {c.category}
                                        </span>
                                        <span style={{
                                            fontSize: 10,
                                            fontWeight: 600,
                                            background: condSev.bg,
                                            color: condSev.color,
                                            border: `1px solid ${condSev.border}`,
                                            padding: "2px 8px",
                                            borderRadius: 4,
                                        }}>
                                            {condSev.label}
                                        </span>
                                    </div>
                                </div>
                                <p style={{ fontSize: 13, color: "#555", margin: 0, lineHeight: 1.55 }}>
                                    {c.description}
                                </p>
                            </div>
                        );
                    })}

                <div style={{ padding: "20px" }}>
                    {/* Condition name + severity badge */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: 12,
                            marginBottom: 12,
                        }}
                    >    
                        <span
                            style={{
                                background: sev.bg,
                                color: sev.color,
                                border: `1px solid ${sev.border}`,
                                fontSize: 12,
                                fontWeight: 600,
                                padding: "4px 12px",
                                borderRadius: 99,
                                whiteSpace: "nowrap",
                            }}
                        >
                            {sev.label}
                        </span>
                    </div>

                    {/* Symptoms */}
                    {current.symptoms?.length > 0 && (
                        <div style={{ marginBottom: 20 }}>
                            <Label>Symptoms observed</Label>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 6,
                                }}
                            >
                                {current.symptoms.map((symptom, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            fontSize: 12,
                                            background: "#F6F4EF",
                                            border: "1px solid #D3D1C7",
                                            borderRadius: 99,
                                            padding: "4px 12px",
                                            color: "#444",
                                        }}
                                    >
                                        {symptom}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Treatments */}
                    {current.treatments?.length > 0 && (
                        <div style={{ marginBottom: 20 }}>
                            <Label>Recommended treatments</Label>
                            {current.treatments.map((t, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: "#F6F4EF",
                                        border: "1px solid #D3D1C7",
                                        borderRadius: 10,
                                        padding: "14px",
                                        marginBottom: 10,
                                    }}
                                >
                                    {/* Product name and type badge */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                            gap: 6,
                                            marginBottom: 6,
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontWeight: 700,
                                                fontSize: 14,
                                            }}
                                        >
                                            {t.product}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 10,
                                                fontWeight: 600,
                                                background: "#E0EDD5",
                                                color: "#3B6D11",
                                                padding: "2px 8px",
                                                borderRadius: 4,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.04em",
                                            }}
                                        >
                                            {t.type}
                                        </span>
                                    </div>

                                    {/* Usage instructions */}
                                    <p
                                        style={{
                                            fontSize: 13,
                                            color: "#555",
                                            margin: "0 0 10px",
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {t.usage}
                                    </p>

                                    {/* Where to buy tags */}
                                    {t.where_to_buy?.length > 0 && (
                                        <div>
                                            <div
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    color: "#888",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.05em",
                                                    marginBottom: 5,
                                                }}
                                            >
                                                Where to buy
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: 5,
                                                }}
                                            >
                                                {t.where_to_buy.map(
                                                    (retailer, j) => (
                                                        <span
                                                            key={j}
                                                            style={{
                                                                fontSize: 11,
                                                                background:
                                                                    "#E6F1FB",
                                                                color: "#0C447C",
                                                                borderRadius: 5,
                                                                padding:
                                                                    "3px 9px",
                                                            }}
                                                        >
                                                            {retailer}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Action steps */}
                    {current.action_steps?.length > 0 && (
                        <div style={{ marginBottom: 20 }}>
                            <Label>Action steps</Label>
                            <ol style={{ margin: 0, paddingLeft: 20 }}>
                                {current.action_steps.map((step, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            fontSize: 13,
                                            color: "#444",
                                            lineHeight: 1.65,
                                            marginBottom: 8,
                                            paddingLeft: 4,
                                        }}
                                    >
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}

                    {/* Precautions */}
                    {current.precautions && (
                        <div
                            style={{
                                background: "#FAEEDA",
                                border: "1px solid #F0C070",
                                borderRadius: 8,
                                padding: "12px 14px",
                                fontSize: 13,
                                color: "#633806",
                                lineHeight: 1.6,
                                marginBottom: 20,
                            }}
                        >
                            ⚠️ {current.precautions}
                        </div>
                    )}

                    {/* Reset button */}
                    <button
                        onClick={() => dispatch(clearCurrent())}
                        style={{
                            width: "100%",
                            padding: "13px",
                            background: "#3B6D11",
                            color: "#fff",
                            border: "none",
                            borderRadius: 9,
                            fontSize: 15,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Diagnose another vine
                    </button>
                </div>
            </div>

            {/* Session history — only shows if more than one scan done */}
            {history.length > 1 && (
                <div>
                    <Label>Previous scans this session</Label>
                    {history.slice(1).map((item) => (
                        <div
                            key={item.id}
                            style={{
                                background: "#fff",
                                border: "1px solid #D3D1C7",
                                borderRadius: 9,
                                padding: "12px 16px",
                                marginBottom: 8,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>
                                    {item.result.condition}
                                </div>
                                <div
                                    style={{
                                        fontSize: 11,
                                        color: "#888",
                                        marginTop: 2,
                                    }}
                                >
                                    {item.timestamp}
                                </div>
                            </div>
                            <span
                                style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    padding: "3px 10px",
                                    borderRadius: 99,
                                    whiteSpace: "nowrap",
                                    background: (
                                        SEVERITY[item.result.severity] ||
                                        SEVERITY.medium
                                    ).bg,
                                    color: (
                                        SEVERITY[item.result.severity] ||
                                        SEVERITY.medium
                                    ).color,
                                    border: `1px solid ${(SEVERITY[item.result.severity] || SEVERITY.medium).border}`,
                                }}
                            >
                                {item.result.severity}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Reusable section label — used throughout the card for consistent styling
// Defining it once here means if you want to change the label style later
// you only change it in one place
function Label({ children }) {
    return (
        <div
            style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#888",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                marginBottom: 8,
            }}
        >
            {children}
        </div>
    );
}
