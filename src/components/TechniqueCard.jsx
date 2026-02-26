import { useState } from "react";
import CodeBlock from "./CodeBlock.jsx";

export default function TechniqueCard({ technique, accentColor, forceOpen }) {
  const [open, setOpen] = useState(false);
  const isOpen = forceOpen || open;

  return (
    <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 12, overflow: "hidden", marginBottom: 12, borderLeft: `3px solid ${accentColor}`, transition: "box-shadow 0.2s", boxShadow: isOpen ? `0 0 20px ${accentColor}08` : "none" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "none", border: "none", color: "#E6EDF3", cursor: "pointer", textAlign: "left", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, fontFamily: "'Space Mono', monospace", letterSpacing: "-0.02em" }}>{technique.name}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
            {technique.usedFor.slice(0, isOpen ? undefined : 3).map((use, i) => (
              <span key={i} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30`, fontFamily: "'Space Mono', monospace" }}>{use}</span>
            ))}
            {!isOpen && technique.usedFor.length > 3 && (
              <span style={{ fontSize: 11, padding: "2px 8px", color: "#8B949E" }}>+{technique.usedFor.length - 3} more</span>
            )}
          </div>
        </div>
        <span style={{ fontSize: 18, color: "#8B949E", transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }}>▾</span>
      </button>
      {isOpen && (
        <div style={{ padding: "0 18px 16px" }}>
          <CodeBlock codes={technique.codes} />
          <div style={{ marginTop: 10, padding: "10px 14px", background: `${accentColor}08`, borderRadius: 8, border: `1px solid ${accentColor}20`, fontSize: 13, color: "#8B949E", fontFamily: "'Space Mono', monospace", lineHeight: 1.5 }}>
            💡 {technique.tip}
          </div>
        </div>
      )}
    </div>
  );
}
