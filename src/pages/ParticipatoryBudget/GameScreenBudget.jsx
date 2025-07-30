import { useContext, useState } from "react";
import { GameContextBudget } from "../../context/GameProviderBudget";
import Button from "../../components/Button";
import ProgressDots from "../../components/Dots";
import SummaryScreenBudget from "./SummaryScreenBudget";

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm sm:max-w-lg mx-4 sm:mx-auto max-h-[80vh] overflow-auto"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside content
      >
        {children}
        <div className="mt-4 text-right">
          <Button onClick={onClose}><span className="text">Close</span></Button>
        </div>
      </div>
    </div>
  );
}

export default function GameScreen() {

  const { scenarios, index, next, scores, previousSummaries } = useContext(GameContextBudget);
  if (index >= scenarios.length) {
    return <SummaryScreenBudget />;
  }
  const s = scenarios[index];

  let dotIndex = null;
  const eventIndexes = [2, 5];
  if (!eventIndexes.includes(index)) {
    const phasesSeen = scenarios
      .slice(0, index + 1)
      .filter(q => q.type === "phase").length - 1;
    dotIndex = phasesSeen;
  }

  const [showPrevious, setShowPrevious] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="h-full flex">
      {/* Left static panel */}
      <aside className="hidden md:block w-72 bg-[#2C5696] text-white p-6 space-y-8">
        { !showPrevious ? (
          <>
           <div className="mb-10">
          <h2 className="font-semibold text-2xl mb-2 mt-16">Your mission</h2>
          <p className="text-base">
           Lead a participatory budgeting process that results in impactful, feasible projects adopted by the city, while keeping the process inclusive, transparent, and community-driven.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-2xl mb-2">What to consider?</h3>
          <p className="text-base"><strong>Project Quality</strong><br/>Are proposals realistic and aligned with community needs?</p>
          <p className="text-base mt-2"><strong>Engagement &amp; Inclusion</strong><br/>Were diverse voices meaningfully involved?</p>
          <p className="text-base mt-2"><strong>Implementation Feasibility</strong><br/>Is implementation realistic?</p>
        </div>
        </>
        ) : (
        <div>
          {/* Previus answers button */}
          <h3 className="font-semibold text-2xl mb-2 mt-16">Your answers to previous questions</h3>
           {previousSummaries.length === 0 ? (
            <p className="text-base">No previous answers yet.</p>
          ) : (
            <>
          {previousSummaries[0] && (
            <p className="text-base"><strong>Answer 1: </strong>{previousSummaries[0]}</p>
          )}
          {previousSummaries[1] && (
            <p className="text-base mt-4"><strong>Answer 2: </strong>{previousSummaries[1]}</p>
          )}
            </>
          )}
          </div>
        )}
        <Button className="w-full justify-center text-center font-normal mt-4"
        style={{ backgroundColor: '#1A3A6D' }}
        onClick={() => setShowPrevious(!showPrevious)}>
          <span className="text">{showPrevious ? "Hide Previous Answers" : "Show Previous Answers"}</span>
        </Button>

      </aside>

      {/* Main question area */}
      <main className="flex-1 mt-8 md:mt-16 px-4 sm:px-10 lg:ml-10">
        {/* top bar with dots */}
        <ProgressDots total={8} current={index} currentType={s.type} />
        <h1 className="text-2xl sm:text-4xl font-bold mb-2">{s.title}</h1>
        <p className="text-base sm:text-lg mb-4 sm:mb-6 max-w-3xl">{s.scenario}</p>
        
      <div className="flex flex-col lg:flex-row items-start sm:space-x-2 mb-6">
        <p className="text-lg sm:text-xl font-medium m-0">{s.question}</p>

        {/* Learn more button */}
        {s.learnMore && (
          <button
            onClick={() => setModalOpen(true)}
            className="underline hover:text-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            aria-label="Learn more about this question"
            type="button"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: '#1A3A6D' }}
          >
            Learn More 🔍
          </button>
        )}
      </div>

        {/* Options buttons */}
        <div className="space-y-3 max-w-2xl text-base pb-10">
          {s.options.map((opt, i) => (
            <Button
              key={i}
              className="w-full !justify-start !text-left !font-normal"
              onClick={() => next(opt.effects, opt.summary, s.question, opt.text)}
            >
              <span className="text !text-white">{opt.text}</span>
              
            </Button>
          ))}
        </div>
        
        {/* Learn more modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-2xl font-semibold mb-4">Learn More</h2>
          <p>{s.learnMore}</p>
        </Modal>
      </main>
    </div>
  );
}