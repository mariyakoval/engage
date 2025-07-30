import { createContext, useState, useMemo } from "react";
import scenariosRaw from "../data/participatoryBudgetScenarios.json";

export const GameContextBudget = createContext();

export const GameProviderBudget = ({ children }) => {

  const resetGame = () => {
  setScores({ quality: 0, engagement: 0, uptake: 0 });
  setScoreHistory([]);
  setIndex(0);
  setSequence(generateSequence(phases));
};

const phases = useMemo(() => {
    const byPhase = Array.from({ length: 6 }, () => []);
    const crisis   = [];
    const benefit  = [];

    scenariosRaw.forEach(sc => {
      if (sc.type === "crisis")      crisis.push(sc);
      else if (sc.type === "advantage") benefit.push(sc);
      else {
        // phase is 1‑6 in the json
        byPhase[Number(sc.phase) - 1].push(sc);
      }
    });
    return { byPhase, crisis, benefit };
  }, []);

  const [sequence, setSequence] = useState(() => generateSequence(phases));

function generateSequence(phases) {
    const rand = arr => arr[Math.floor(Math.random() * arr.length)];

    const six = phases.byPhase.map(rand);

    const crisisQ   = rand(phases.crisis);
    const benefitQ  = rand(phases.benefit);

    return [
      six[0],
      six[1],
      crisisQ,
      six[2],
      six[3],
      benefitQ,
      six[4],
      six[5]
    ];
  }

  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState({ quality: 0, engagement: 0, uptake: 0 });
  const [scoreHistory, setScoreHistory] = useState([ ]);

  const [previousSummaries, setPreviousSummaries] = useState([]);


  const next = (effects, summary, questionText, answerText) => {

     if (summary) {
    setPreviousSummaries(prev => [summary, ...prev].slice(0, 2));
  }

    setScores(prev => {
      const newScores = {
      quality:    prev.quality    + (effects.quality    ?? 0),
      engagement: prev.engagement + (effects.engagement ?? 0),
      uptake:     prev.uptake     + (effects.uptake     ?? 0)
    };
      setScoreHistory(prevHistory => {
  const newEntry = {
    step: prevHistory.length, 
    ...newScores,
    question: questionText,
    answer: answerText
  };
  return [...prevHistory, newEntry];
});

        return newScores;
      });
    setIndex(i => i + 1);
  };

  return (
    <GameContextBudget.Provider
      value={{
        scenarios: sequence, 
        index,
        next,
        scores,
        previousSummaries,
        scoreHistory,
        resetGame
      }}
    >
      {children}
    </GameContextBudget.Provider>
  );
};
