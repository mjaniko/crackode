import { useState } from "react";
import { TOKEN_COLORS, highlightLine } from "../utils/highlighter.js";

const LANG_META = {
  python: { label: "Python", icon: "🐍", accent: "#3572A5" },
  java: { label: "Java", icon: "☕", accent: "#B07219" },
  go: { label: "Go", icon: "🔷", accent: "#00ADD8" },
};

export default function CodeBlock({ codes }) {
  const langs = Object.keys(codes);
  const [lang, setLang] = useState(langs[0]);
  const [copied, setCopied] = useState(false);
  const code = codes[lang] || "";

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = code.split("\n");
  const gutterWidth = String(lines.length).length * 10 + 16;

  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #21262D", background: "#0D1117" }}>
      {/* lang tabs */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #21262D", background: "#161B22", padding: "0 4px" }}>
        <div style={{ display: "flex", gap: 0 }}>
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding: "8px 14px",
                background: "none",
                border: "none",
                borderBottom: lang === l ? `2px solid ${LANG_META[l].accent}` : "2px solid transparent",
                color: lang === l ? "#E6EDF3" : "#484F58",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                display: "flex",
                alignItems: "center",
                gap: 5,
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 13 }}>{LANG_META[l].icon}</span>
              {LANG_META[l].label}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          style={{
            background: copied ? "#238636" : "#21262D",
            color: copied ? "#fff" : "#8B949E",
            border: "1px solid #30363D",
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 11,
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
            transition: "all 0.2s",
            marginRight: 4,
          }}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      {/* code area */}
      <div style={{ overflowX: "auto", fontSize: 13, lineHeight: 1.7, fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} style={{ background: idx % 2 === 0 ? "transparent" : "#0D1117" }}>
                <td
                  style={{
                    width: gutterWidth,
                    minWidth: gutterWidth,
                    textAlign: "right",
                    padding: "0 12px 0 12px",
                    color: "#30363D",
                    userSelect: "none",
                    fontSize: 12,
                    borderRight: "1px solid #21262D",
                    background: "#0C0F14",
                    fontVariantNumeric: "tabular-nums",
                    verticalAlign: "top",
                  }}
                >
                  {idx + 1}
                </td>
                <td style={{ padding: "0 16px", whiteSpace: "pre", verticalAlign: "top" }}>
                  {highlightLine(line, lang).map((tok, ti) => (
                    <span key={ti} style={{ color: TOKEN_COLORS[tok.type] || TOKEN_COLORS.default }}>
                      {tok.text}
                    </span>
                  ))}
                  {line === "" && "\u200B"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
