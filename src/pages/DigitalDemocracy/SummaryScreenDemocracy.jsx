import { useState, useContext } from "react";
import { GameContextDemocracy } from "../../context/GameProviderDemocracy";
import Button from "../../components/Button";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import "../../styles/democracy-theme.css";

export default function SummaryScreenDemocracy() {
  const { scores, scoreHistory, scenarios } = useContext(GameContextDemocracy);
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
    if (total >= 35) return "A Model Democratic Process!";
    if (total >= 25) return "Solid Turnout — Room to Grow";
    return "Your Process Faced Challenges";
  };

  const stageLabels = [
    "Start",
    "Choosing the Tool & Legitimacy",
    "Platform & Access Design",
    "Crisis",
    "Mobilization & Participation",
    "Deliberation, Trust & Verification",
    "Good news",
    "Institutional Uptake",
    "Sustainability & Sovereignty"
  ];

  return (
    <div className="theme-democracy min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-8 overflow-y-auto">
      <span className="civic-tag">Final Tally</span>
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center mt-2">{getHeadline()}</h1>
      <p className="text-sm text-[var(--civic-muted)] mb-8 text-center">
        Note: Maximum scores in all categories may not be achievable due to random question selection.
      </p>

    {currentView === "review" && (
    <div className="min-h-screen flex flex-col items-center p-8 overflow-y-auto">
    <h2 className="text-2xl sm:text-4xl font-bold mb-8 mt-6">Review Your Decisions</h2>
    <p className="text-m text-[var(--civic-muted)] text-center">This list shows questions with assigned points that you had to answer. <br className="hidden md:block" />Questions with maximum total points across three categories are marked in green, <br className="hidden md:block" /> the minimum total points are marked with red, and those in between appear amber. <br className="hidden md:block" /> The question you selected has a mark (✅) at the end.</p>
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
              className="bg-white border border-[var(--civic-line)] rounded-xl py-6 px-8 w-full max-w-4xl mt-6"
            >
              <p className="text-lg sm:text-2xl font-semibold mb-4 text-left">
                <span className="civic-tag mb-0">Step {index + 1}</span><br/>
                {scenario.question}
              </p>
              <p className="text-sm text-[var(--civic-muted)] mb-4">
                {scenario.scenario}
              </p>
              <ul className="space-y-1 flex flex-col items-center">
                {scenario.options.map((opt, i) => {
                  const total = getTotal(opt);
                  let textColor = "text-amber-700";
                  if (total === max) textColor = "text-[var(--civic-teal)]";
                  else if (total === min) textColor = "text-[var(--civic-terracotta)]";

                  const isSelected = selectedAnswer === opt.text;
                  const borderStyle = isSelected ? "border-2" : "border";

                  return (
                    <li
                      key={i}
                      className={`w-full rounded ${borderStyle} border-[var(--civic-line)] ${isSelected ? "font-semibold" : "font-normal"} ${textColor} text-sm text-left`}
                    >
                      <div className="px-3 py-2">
                        {opt.text}
                        {isSelected && " ✅"}
                        <div className="text-xs text-[var(--civic-muted)] mt-1">
                          🛠️ {opt.effects.quality ?? 0}, 🤲 {opt.effects.engagement ?? 0}, 🏛️ {opt.effects.uptake ?? 0}
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
        <div className="bg-white border border-[var(--civic-line)] rounded-xl p-6 w-full max-w-xl space-y-4">
          <ScoreRow label="🛠️ Design Quality" value={quality} />
          <ScoreRow label="🤲 Participation & Inclusion" value={engagement} />
          <ScoreRow label="🏛️ Institutional Impact" value={uptake} />
        </div>
      )}

      {currentView === "trajectory" && (
        <div className="bg-white border border-[var(--civic-line)] rounded-xl px-4 py-6 w-full max-w-4xl sm:px-6">
          <h2 className="text-2xl font-semibold mb-4">Score Trajectory</h2>
          <p className="text-m text-[var(--civic-muted)]">This graph shows how your scores evolved over the course of the process. <br></br>Click on any point to see details about that step.</p>

          <div className="overflow-x-auto">
            <div style={{ width: Math.max(chartData.length * 60, 600), minWidth: '100%' }}>
            <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 400 : 300}>
            <LineChart data={chartData} margin={{ top: 20, right: 50, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--civic-line)" />
              <XAxis
                dataKey="step"
                tickFormatter={(step) => stageLabels[step]}
                interval={0}
                tick={{ fontSize: 10, angle: -15, textAnchor: 'end' }}
              />
              <YAxis
                domain={[1, 16]}
                ticks={[0, 1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 16]}
                interval={1}
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
                  stroke={["#1F6F6E", "#D9622B", "#24303B"][i]}
                  name={["Design Quality", "Participation", "Institutional Impact"][i]}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
          </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row flex gap-3 mt-4">
        <Button variant="democracy" onClick={() => window.location.reload()}>
          <span className="text">Play Again</span>
        </Button>

        {currentView !== "trajectory" && (
          <Button variant="democracy" onClick={() => setCurrentView("trajectory")}>
            <span className="text">Show Score Trajectory</span>
          </Button>
        )}
        {currentView === "trajectory" && (
          <Button variant="democracy" onClick={() => setCurrentView("summary")}>
            <span className="text">Show Score Bars</span>
          </Button>
        )}

        {currentView !== "review" && (
          <Button variant="democracy" onClick={() => setCurrentView("review")}>
            <span className="text">Review Answers</span>
          </Button>
        )}
        {currentView === "review" && (
          <Button variant="democracy" onClick={() => setCurrentView("summary")}>
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
      <div className="flex justify-between text-sm font-medium text-[var(--civic-ink)]">
        <span>{label}</span>
        <span>{value} / 16</span>
      </div>
      <div className="w-full bg-[var(--civic-line)] h-3 rounded-full mt-1">
        <div
          className="h-full bg-[var(--civic-teal)] rounded-full"
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
    <div className="bg-white p-3 rounded shadow border border-[var(--civic-line)] max-w-md">
      <p className="text-sm font-semibold mb-1">Step {data.step}</p>
      <p className="text-sm"><strong>🛠️ Design Quality:</strong> {data.quality}</p>
      <p className="text-sm"><strong>🤲 Participation:</strong> {data.engagement}</p>
      <p className="text-sm"><strong>🏛️ Institutional Impact:</strong> {data.uptake}</p>
      {data.question && (
        <>
          <p className="mt-2 text-sm text-[var(--civic-muted)]"><strong>Question:</strong> {data.question}</p>
          <p className="text-sm text-[var(--civic-muted)]"><strong>Answer:</strong> {data.answer}</p>
        </>
      )}
    </div>
  );
};
