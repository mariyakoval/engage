import { useState, useContext } from "react";
import { GameContextPetitions } from "../../context/GameProviderPetitions";
import Button from "../../components/Button";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function SummaryScreenPetitions() {
  const { scores, scoreHistory, scenarios } = useContext(GameContextPetitions);
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
    if (total >= 35) return "🏆 Excellent Assembly Leadership!";
    if (total >= 25) return "✅ Solid Result with Room to Grow";
    return "⚠️ Your Assembly Faced Challenges";
  };

  const stageLabels = [
    "Start",
    "Initiation and legitimacy",
    "Design and engagement",
    "Crisis",
    "Participation and Outreach",
    "Deliberation and drafting",
    "Good news",
    "Communication and advocacy",
    "Getting to the Parliament"
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-8 overflow-y-auto">
      <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-center mt-2">{getHeadline()}</h1>
      <p className="text-sm text-gray-700 mb-8 text-center">
        Note: Maximum scores in all categories may not be achievable due to random question selection.
      </p>

    {/* Question, scenario, and answer summary */}
     {currentView === "review" && (
    <div className="min-h-screen flex flex-col items-center p-8 overflow-y-auto">
    <h2 className="text-2xl sm:text-4xl font-bold mb-8 mt-6">Review Your Decisions</h2>
    <p className="text-m text-gray-600 text-center">This list shows questions with assigned points that you had to answer. <br className="hidden md:block" />Questions with maximum total points across three categories are marked in green, <br className="hidden md:block" /> the minimum total points are marked with red, and thos in between appear yellow. <br className="hidden md:block" /> The question you selected has a mark (✅) at the end.</p>
    <div className="space-y-6">
      {scenarios.map((scenario, index) => {
        const selectedAnswer = scoreHistory[index]?.answer; // Get the answer selected for this scenario
        if (!selectedAnswer) return null;

        const getTotal = (opt) =>
          (opt.effects.quality ?? 0) + (opt.effects.engagement ?? 0) + (opt.effects.uptake ?? 0); // Calculate total points for the option

        const totals = scenario.options.map(getTotal); // Get totals for all options
        const max = Math.max(...totals); // Find the maximum total points
        const min = Math.min(...totals); // Find the minimum total points

        return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg py-6 px-8 w-full max-w-4xl mt-6"
            >
              <p className="text-lg sm:text-2xl font-semibold mb-4 text-left">
                <span className="text-gray-500">Step {index + 1}:</span> {scenario.question}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {scenario.scenario}
              </p>
              <ul className="space-y-1 flex flex-col items-center">
                {scenario.options.map((opt, i) => {
                  const total = getTotal(opt);
                  let textColor = "text-yellow-600"; // default yellow
                  if (total === max) textColor = "text-green-600"; // answer with max points is green
                  else if (total === min) textColor = "text-red-600"; // answer with min points is red

                  const isSelected = selectedAnswer === opt.text; 
                  const borderStyle = isSelected ? "border-2" : "border"; // selected answer has a thicker border

                  return (
                    <li
                      key={i}
                      className={`w-full rounded ${borderStyle} border-gray-300 ${isSelected ? "font-semibold" : "font-normal"} ${textColor} text-sm text-left`}
                    >
                      <div className="px-3 py-2">
                        {opt.text}
                        {isSelected && " ✅"}
                        <div className="text-xs text-gray-500 mt-1">
                          🧠 {opt.effects.quality ?? 0}, 🗳️ {opt.effects.engagement ?? 0}, 🏛️ {opt.effects.uptake ?? 0}
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

      {/* Summary view with progress bars */}
      {currentView === "summary" && (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl space-y-4">
          <ScoreRow label="🧠 Policy Quality" value={quality} />
          <ScoreRow label="🗳️ Engagement & Inclusion" value={engagement} />
          <ScoreRow label="🏛️ Political Uptake" value={uptake} />
        </div>
      )}
      
      {/* Trajectory chart view  with tooltips */}
      {currentView === "trajectory" && (
        <div className="bg-white rounded-xl shadow-lg px-4 py-6 w-full max-w-4xl sm:px-6">
          <h2 className="text-2xl font-semibold mb-4">Score Trajectory</h2>
          <p className="text-m text-gray-600">This graph shows how your scores evolved over the course of the Assembly. <br></br>Click on any point to see details about that step.</p>

          <div className="overflow-x-auto">
            <div style={{ width: Math.max(chartData.length * 60, 600), minWidth: '100%' }}>
            <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 400 : 300}>
            <LineChart data={chartData} margin={{ top: 20, right: 50, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
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
                  stroke={["#1d4ed8", "#059669", "#f59e0b"][i]}
                  name={["Quality", "Engagement", "Uptake"][i]}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
          </div>
          </div>
        </div>
      )}

      {/* Action buttons for navigation and toggling views */}
          <div className="flex flex-col sm:flex-row flex gap-3 mt-4">
             {/* Always visible */}
            <Button onClick={() => window.location.reload()}>
              <span className="text">Play Again</span>
            </Button>

            {/* Toggle between Score Bars and Trajectory */}
            {currentView !== "trajectory" && (
              <Button onClick={() => setCurrentView("trajectory")}>
                <span className="text">Show Score Trajectory</span>
              </Button>
            )}
            {currentView === "trajectory" && (
              <Button onClick={() => setCurrentView("summary")}>
                <span className="text">Show Score Bars</span>
              </Button>
            )}

            {/* Toggle between Summary and Review */}
            {currentView !== "review" && (
              <Button onClick={() => setCurrentView("review")}>
                <span className="text">Review Answers</span>
              </Button>
            )}
            {currentView === "review" && (
              <Button onClick={() => setCurrentView("summary")}>
                <span className="text">Back to Summary Screen</span>
              </Button>
            )}
          </div>
      </div>    
  );
}

{/* helper for result screen with progress bars */}
function ScoreRow({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <span>{label}</span>
        <span>{value} / 16</span>
      </div>
      <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
        <div
          className="h-full bg-blue-600 rounded-full"
          style={{ width: `${(value / 16) * 100}%` }}
        />
      </div>
    </div>
  );
}

{/* Custom tooltip for the iteractive chart */}
const CustomTooltip = ({ active, payload}) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white p-3 rounded shadow border border-gray-200 max-w-md">
      <p className="text-sm font-semibold mb-1">Step {data.step}</p>
      <p className="text-sm"><strong>🧠 Quality:</strong> {data.quality}</p>
      <p className="text-sm"><strong>🗳️ Engagement:</strong> {data.engagement}</p>
      <p className="text-sm"><strong>🏛️ Uptake:</strong> {data.uptake}</p>
      {data.question && (
        <>
          <p className="mt-2 text-sm text-gray-700"><strong>Question:</strong> {data.question}</p>
          <p className="text-sm text-gray-700"><strong>Answer:</strong> {data.answer}</p>
        </>
      )}
    </div>
  );
};
