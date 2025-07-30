import { useContext, useState } from "react";
import { GameContextPetitions } from "../../context/GameProviderPetitions";
import Button from "../../components/Button";
import ProgressDots from "../../components/Dots";
import SummaryScreen from "./SummaryScreenPetitions";
import NewsModal from "../../components/NewsModal";

import news1 from "../../assets/news/news1.jpg";
import news2 from "../../assets/news/news2.jpg";
import news3 from "../../assets/news/news3.jpg";
import news4 from "../../assets/news/news4.jpg";
import news5 from "../../assets/news/news5.jpg";
import news6 from "../../assets/news/news6.jpg";
import news7 from "../../assets/news/news7.jpg";
import news12 from "../../assets/news/news12.jpg"; 
import news13 from "../../assets/news/news13.jpg"; 
import news14 from "../../assets/news/news14.jpg"; 



{ /* Modal component to show additional information */}
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

  const { scenarios, index, next, previousSummaries } = useContext(GameContextPetitions);
  if (index >= scenarios.length) {
    return <SummaryScreen />;
  }

  const imageMap = {
  news1,
  news2,
  news3,
  news4,
  news5,
  news6,
  news7,
  news12,
  news13,
  news14
};

  const s = scenarios[index];

  { /* Determine the dot index based on the current scenario index */ }
  // If the current scenario is an event, we don't show a dot index
  // If the current scenario is a phase, we show the index of the last phase seen
  let dotIndex = null;
  const eventIndexes = [2, 5];
  if (!eventIndexes.includes(index)) {
    const phasesSeen = scenarios
      .slice(0, index + 1)
      .filter(q => q.type === "phase").length - 1;
    dotIndex = phasesSeen;
  }

  // State to manage showing previous answers and modal visibility
  const [showPrevious, setShowPrevious] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newsToShow, setNewsToShow] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="h-full flex">
      {/* Left static panel */}
      <aside className="hidden md:block w-72 bg-[#2C5696] text-white p-6 space-y-8">

        { !showPrevious ? (
          <>
           <div className="mb-10">
          <h2 className="font-semibold text-2xl mb-2 mt-16">Your mission</h2>
          <p className="text-base">
            Create an E-Petitions platform that results in high‑quality proposals
            adopted by Parliament, while keeping the process inclusive,
            legitimate, and engaging.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-2xl mb-2">What to consider?</h3>
          <p className="text-base"><strong>Policy Quality</strong><br/>Are proposals evidence‑based?<br/>feasible, and well-informed? </p>
          <p className="text-base mt-2"><strong>Engagement &amp; Inclusion</strong><br/>Are voices heard?</p>
          <p className="text-base mt-2"><strong>Political Uptake</strong><br/>Will this survive the road to Parliament?</p>
        </div>
        </>
        ) : (
        <div>

          { /* Show previous answers if available */ }
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
        onClick={() => setShowPrevious(!showPrevious)}>
          <span className="text !text-white">{showPrevious ? "Hide Previous Answers" : "Show Previous Answers"}</span>
        </Button>

      </aside>

      {/* Main question area */}
      <main className="flex-1 mt-8 md:mt-16 px-4 sm:px-10 lg:ml-10">
        {/* top bar with dots */}
        <ProgressDots total={8} current={index} currentType={s.type} />
        <h1 className="text-2xl sm:text-4xl font-bold mb-2">{s.title}</h1>
        <p className="text-base sm:text-lg mb-4 sm:mb-6 max-w-3xl">{s.scenario}</p>
        
        {/*Learn more button*/}
      <div className="flex flex-col lg:flex-row items-start sm:space-x-2 mb-6">
        <p className="text-lg sm:text-xl font-medium m-0">{s.question}</p>
          {s.learnMore && (
            <button
              onClick={() => setModalOpen(true)}
              className="underline hover:text-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
              aria-label="Learn more about this question"
              type="button"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: '#1A3A6D' }}
            >Learn More 🔍 
            </button>
          )}
        </div>

        {/* Options for the current scenario */}
        <div className="space-y-3 max-w-2xl text-base pb-10">
          {s.options.map((opt, i) => (
            <Button
            key={i}
            className="w-full !justify-start !text-left !font-normal"
            onClick={() => {
              // If the option has news, show the news modal
              if (opt.news) {
                const selectedNews = {
                ...opt.news,
                image: imageMap[opt.news.image] 
              };

              setNewsToShow(selectedNews);
              setSelectedOption(opt);
              } else { 
                // Otherwise, just proceed to the next scenario
                next(opt.effects, opt.summary, s.question, opt.text);
              }
            }}
          >
            <span className="text !text-white">{opt.text}</span>
          </Button>
         ))}
        </div>

        {/* Modal for additional information */}       
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-2xl font-semibold mb-4">Learn More</h2>
          <p>{s.learnMore}</p>
        </Modal>

        {/* News modal to show news related to the selected option */}
        {newsToShow && selectedOption && (
          <NewsModal
            news={newsToShow}
            breakingNews={"E-Petitions platform launched • Citizens' voices amplified • Parliament to respond soon!"}
            onClose={() => {
              next(
                selectedOption.effects,
                selectedOption.summary,
                s.question,
                selectedOption.text
              );
              setNewsToShow(null);
              setSelectedOption(null);
            }}
          />
        )}
      </main>
    </div>
  );
}