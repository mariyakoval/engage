import { useState, useContext } from "react";
import { GameContextSecurity } from "../../context/GameProviderSecurity";
import Button from "../../components/Button";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import "../../styles/security-theme.css";

export default function SummaryScreenSecurity() {
  const { scores, scoreHistory, scenarios } = useContext(GameContextSecurity);
  const { quality, engagement, uptake } = scores;
  const [currentView, setCurrentView] = useState("summary");
  const chartData = [
    { step: 0, quality: 0, engagement: 0, uptake: 0 },
    ...scoreHistory.map((d, i) => ({
      ...d,
      step: i + 1,
    }))
  ];

  const total = quality + engagement + uptake;

  const getHeadline = () => {
    if (total >= 35) return "🏆 Threat Neutralized: Exemplary Response";
    if (total >= 25) return "✅ Contained — Room for a Stronger Posture";
    return "⚠️ Incident Left Lasting Damage";
  };

  const stageLabels = [
    "Start",
    "Threat Recognition & Attribution",
    "Institutional Coordination",
    "Crisis",
    "Countering Narratives",
    "Public Communication",
    "Advisory",
    "Crisis Response",
    "Resilience & Deterrence"
  ];

  return (
    <div className="theme-security min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-8 overflow-y-auto">
      <span className="console-tag">SEC-OPS · AFTER-ACTION REPORT</span>
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center mt-4">{getHeadline()}</h1>
      <p className="prose-security text-sm mb-8 text-center">
        Note: Maximum scores in all categories may not be achievable due to random question selection.
      </p>

     {currentView === "review" && (
    <div className="min-h-screen flex flex-col items-center p-8 overflow-y-auto">
    <h2 className="text-2xl sm:text-4xl font-bold mb-8 mt-6">Review Your Decisions</h2>
    <p className="prose-security text-m text-center">This list shows questions with assigned points that you had to answer. <br className="hidden md:block" />Questions with maximum total points across three categories are marked in green, <br className="hidden md:block" /> the minimum total points are marked with red, and those in between appear amber. <br className="hidden md:block" /> The question you selected has a mark (✅) at the end.</p>
    <div className="space-y-6">
      {scenarios.map((scenario, index) => {
        const selectedAnswer = scoreHistory[index]?.answer;
        if (!selectedAnswer) return null;

        const getTotal = (opt) =>
          (opt.effects.quality ?? 0) + (opt.effects.engagement ?? 0) + (opt.effects.uptake ?? 0);

        const totals = scenario.options.map(getTotal);
        const max = Math.max(...totals);
        const min = Math.min(...totals);

        return (
            <div
              key={index}
              className="bg-[var(--ops-panel)] border border-[var(--ops-line)] rounded-md py-6 px-8 w-full max-w-4xl mt-6"
            >
              <p className="text-lg sm:text-2xl font-semibold mb-4 text-left">
                <span className="console-tag mb-0">Step {index + 1}</span><br/>
                {scenario.question}
              </p>
              <p className="prose-security text-sm mb-4">
                {scenario.scenario}
              </p>
              <ul className="space-y-1 flex flex-col items-center">
                {scenario.options.map((opt, i) => {
                  const total = getTotal(opt);
                  let textColor = "text-[var(--ops-amber)]";
                  if (total === max) textColor = "text-[var(--ops-green)]";
                  else if (total === min) textColor = "text-[var(--ops-red)]";

                  const isSelected = selectedAnswer === opt.text;
                  const borderStyle = isSelected ? "border-2" : "border";

                  return (
                    <li
                      key={i}
                      className={`w-full rounded ${borderStyle} border-[var(--ops-line)] ${isSelected ? "font-semibold" : "font-normal"} ${textColor} text-sm text-left`}
                    >
                      <div className="px-3 py-2">
                        {opt.text}
                        {isSelected && " ✅"}
                        <div className="text-xs text-[var(--ops-grey)] mt-1">
                          🛡️ {opt.effects.quality ?? 0}, 🔍 {opt.effects.engagement ?? 0}, 🏰 {opt.effects.uptake ?? 0}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            );
          })}
        </div>
      </div> )}

      {currentView === "summary" && (
        <div className="bg-[var(--ops-panel)] border border-[var(--ops-line)] rounded-md p-6 w-full max-w-xl space-y-4">
          <ScoreRow label="🛡️ Response Quality" value={quality} />
          <ScoreRow label="🔍 Public Trust" value={engagement} />
          <ScoreRow label="🏰 National Resilience" value={uptake} />
        </div>
      )}

      {currentView === "trajectory" && (
        <div className="bg-[var(--ops-panel)] border border-[var(--ops-line)] rounded-md px-4 py-6 w-full max-w-4xl sm:px-6">
          <h2 className="text-2xl font-semibold mb-4">Score Trajectory</h2>
          <p className="prose-security text-m">This graph shows how your scores evolved over the course of the response. <br></br>Click on any point to see details about that step.</p>

          <div className="overflow-x-auto">
            <div style={{ width: Math.max(chartData.length * 60, 600), minWidth: '100%' }}>
            <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 400 : 300}>
            <LineChart data={chartData} margin={{ top: 20, right: 50, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--ops-line)" />
              <XAxis
                dataKey="step"
                tickFormatter={(step) => stageLabels[step]}
                interval={0}
                tick={{ fontSize: 10, angle: -15, textAnchor: 'end', fill: '#D6DCE3' }}
              />
              <YAxis
                domain={[1, 16]}
                ticks={[0, 1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 16]}
                interval={1}
                tick={{ fill: '#D6DCE3' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
              layout="horizontal"
              verticalAlign="top"
              align="center"
            />
              {["quality", "engagement", "uptake"].map((key, i) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={["#3DDC84", "#E8A93B", "#E5484D"][i]}
                  name={["Response Quality", "Public Trust", "National Resilience"][i]}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
          </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row flex gap-3 mt-4">
        <Button variant="security" onClick={() => window.location.reload()}>
          <span className="text">Play Again</span>
        </Button>

        {currentView !== "trajectory" && (
          <Button variant="security" onClick={() => setCurrentView("trajectory")}>
            <span className="text">Show Score Trajectory</span>
          </Button>
        )}
        {currentView === "trajectory" && (
          <Button variant="security" onClick={() => setCurrentView("summary")}>
            <span className="text">Show Score Bars</span>
          </Button>
        )}

        {currentView !== "review" && (
          <Button variant="security" onClick={() => setCurrentView("review")}>
            <span className="text">Review Answers</span>
          </Button>
        )}
        {currentView === "review" && (
          <Button variant="security" onClick={() => setCurrentView("summary")}>
            <span className="text">Back to Summary Screen</span>
          </Button>
        )}
      </div>
      </div>
  );
}

function ScoreRow({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-sm font-medium text-[var(--ops-green)]">
        <span>{label}</span>
        <span>{value} / 16</span>
      </div>
      <div className="w-full bg-[var(--ops-line)] h-3 rounded-full mt-1">
        <div
          className="h-full bg-[var(--ops-green)] rounded-full"
          style={{ width: `${(value / 16) * 100}%` }}
        />
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload}) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-[var(--ops-panel)] p-3 rounded shadow border border-[var(--ops-line)] max-w-md text-[#D6DCE3]">
      <p className="text-sm font-semibold mb-1">Step {data.step}</p>
      <p className="text-sm"><strong>🛡️ Response Quality:</strong> {data.quality}</p>
      <p className="text-sm"><strong>🔍 Public Trust:</strong> {data.engagement}</p>
      <p className="text-sm"><strong>🏰 Resilience:</strong> {data.uptake}</p>
      {data.question && (
        <>
          <p className="mt-2 text-sm"><strong>Question:</strong> {data.question}</p>
          <p className="text-sm"><strong>Answer:</strong> {data.answer}</p>
        </>
      )}
    </div>
  );
};