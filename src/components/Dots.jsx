import React from "react";

export default function ProgressDots({ total, current, currentType, theme }) {
  if (theme === "ai") {
    return (
      <div className="flex items-center gap-2 mb-6 font-mono-docket text-xs text-[var(--slate)]">
        <span className="docket-tag">AI-REG · CASE FILE</span>
        <div className="flex gap-2 ml-3">
          {Array.from({ length: total }).map((_, i) => {
            let state = "";
            if (i < current) state = "completed";
            else if (i === current) state = currentType === "phase" ? "current" : "event";
            return <span key={i} className={`docket-tick ${state}`} />;
          })}
        </div>
      </div>
    );
  }

  if (theme === "security") {
    return (
      <div className="flex items-center gap-2 mb-6 text-xs text-[var(--ops-grey)]">
        <span className="console-tag">SEC-OPS · CHANNEL</span>
        <div className="flex gap-2 ml-3">
          {Array.from({ length: total }).map((_, i) => {
            let state = "";
            if (i < current) state = "completed";
            else if (i === current) state = currentType === "phase" ? "current" : "event";
            return <span key={i} className={`status-light ${state}`} />;
          })}
        </div>
      </div>
    );
  }

  if (theme === "democracy") {
    return (
      <div className="flex items-center gap-2 mb-6 text-xs text-[var(--civic-muted)]">
        <span className="civic-tag">Ballot Progress</span>
        <div className="flex gap-2 ml-3">
          {Array.from({ length: total }).map((_, i) => {
            let state = "";
            if (i < current) state = "completed";
            else if (i === current) state = currentType === "phase" ? "current" : "event";
            return <span key={i} className={`ballot-dot ${state}`} />;
          })}
        </div>
      </div>
    );
  }

  // default (unchanged) rendering for other games
  return (
    <div className="flex gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${i === current ? "bg-blue-800" : "bg-gray-300"}`}
        />
      ))}
    </div>
  );
}