import { useState, useRef, useMemo } from "react";
import { SECTIONS } from "./data/index.js";
import { WEEK_PLAN } from "./data/weekPlan.js";
import TechniqueCard from "./components/TechniqueCard.jsx";

export default function AlgoTemplates() {
  const [activeSection, setActiveSection] = useState(0);
  const [search, setSearch] = useState("");
  const [expandAll, setExpandAll] = useState(false);
  const sectionRefs = useRef([]);

  const filteredSections = useMemo(() =>
    SECTIONS.map((section) => ({
      ...section,
      techniques: section.techniques.filter(
        (t) =>
          !search ||
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.usedFor.some((u) => u.toLowerCase().includes(search.toLowerCase()))
      ),
    })).filter((s) => s.techniques.length > 0),
    [search]
  );

  const totalTechniques = SECTIONS.reduce((sum, s) => sum + s.techniques.length, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#0D1117", color: "#E6EDF3", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ borderBottom: "1px solid #21262D", padding: "32px 24px 24px", background: "linear-gradient(180deg, #161B22 0%, #0D1117 100%)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 28 }}>⚡</span>
                <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, fontFamily: "'Space Mono', monospace", letterSpacing: "-0.03em", background: "linear-gradient(135deg, #00E5A0, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Algorithm Templates
                </h1>
              </div>
              <div style={{ fontSize: 11, color: "#484F58", fontFamily: "'Space Mono', monospace", paddingLeft: 38 }}>
                crackode.dev
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, paddingTop: 4 }}>
              <a
                href="https://github.com/mjaniko"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 6, border: "1px solid #21262D", background: "#161B22", color: "#8B949E", fontSize: 11, textDecoration: "none", fontFamily: "'Space Mono', monospace", transition: "border-color 0.2s, color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#30363D"; e.currentTarget.style.color = "#E6EDF3"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#21262D"; e.currentTarget.style.color = "#8B949E"; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
                mjaniko
              </a>
              <a
                href="https://buymeacoffee.com/mjaniko"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 6, border: "1px solid #FBBF2440", background: "#FBBF2410", color: "#FBBF24", fontSize: 11, textDecoration: "none", fontFamily: "'Space Mono', monospace", transition: "background 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FBBF2420"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#FBBF2410"; }}
              >
                ☕ buy me a coffee
              </a>
            </div>
          </div>
          <p style={{ color: "#8B949E", fontSize: 14, margin: "8px 0 20px", fontFamily: "'Space Mono', monospace" }}>
            {totalTechniques} patterns • Python / Java / Go • Recognize in &lt;30s
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, marginBottom: 20 }}>
            {WEEK_PLAN.map((w) => (
              <div key={w.week} style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 8, padding: "10px 12px", borderTop: `2px solid ${w.color}` }}>
                <div style={{ fontSize: 11, color: w.color, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>WEEK {w.week}</div>
                {w.topics.map((t, i) => (
                  <div key={i} style={{ fontSize: 12, color: "#8B949E", lineHeight: 1.5 }}>• {t}</div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#484F58", fontSize: 14 }}>🔍</span>
              <input
                type="text"
                placeholder="Search patterns, problems, templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: 8, border: "1px solid #30363D", background: "#0D1117", color: "#E6EDF3", fontSize: 14, fontFamily: "'Space Mono', monospace", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button onClick={() => setExpandAll(!expandAll)} style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #30363D", background: expandAll ? "#238636" : "#161B22", color: expandAll ? "#fff" : "#8B949E", fontSize: 12, cursor: "pointer", fontFamily: "'Space Mono', monospace", whiteSpace: "nowrap", transition: "all 0.2s" }}>
              {expandAll ? "▲ Collapse" : "▼ Expand All"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ borderBottom: "1px solid #21262D", padding: "10px 24px", overflowX: "auto", background: "#0D1117", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 6, flexWrap: "nowrap" }}>
          {SECTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveSection(i);
                sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: `1px solid ${activeSection === i ? s.color + "50" : "#21262D"}`,
                background: activeSection === i ? s.color + "15" : "transparent",
                color: activeSection === i ? s.color : "#8B949E",
                fontSize: 12,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "'Space Mono', monospace",
                transition: "all 0.2s",
              }}
            >
              {s.icon} {s.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 80px" }}>
        {filteredSections.map((section) => {
          const origIdx = SECTIONS.findIndex((s) => s.title === section.title);
          return (
            <div key={section.title} ref={(el) => (sectionRefs.current[origIdx] = el)} style={{ marginBottom: 40, scrollMarginTop: 60 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 22 }}>{section.icon}</span>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, fontFamily: "'Space Mono', monospace", color: section.color }}>
                  {section.title}
                </h2>
                <span style={{ fontSize: 12, color: "#484F58", fontFamily: "'Space Mono', monospace" }}>
                  {section.techniques.length} patterns
                </span>
              </div>
              {section.techniques.map((tech, tIdx) => (
                <TechniqueCard key={tIdx} technique={tech} accentColor={section.color} forceOpen={expandAll} />
              ))}
            </div>
          );
        })}
        {filteredSections.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#484F58" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14 }}>No patterns match "{search}"</div>
          </div>
        )}
      </div>
    </div>
  );
}
