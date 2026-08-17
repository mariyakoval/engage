import { useContext, useState } from "react";
import { GameContext } from "../../context/GameProviderAI";
import Button from "../../components/Button";
import ProgressDots from "../../components/Dots";
import SummaryScreen from "./SummaryScreenAI";
import NewsModal from "../../components/NewsModal";
import "../../styles/ai-theme.css";

import news1 from "../../assets/news/news1.jpg";
import news2 from "../../assets/news/news2.jpg";
import news3 from "../../assets/news/news3.jpg";
import news4 from "../../assets/news/news4.jpg";
import news5 from "../../assets/news/news5.jpg";
import news6 from "../../assets/news/news6.jpg";
import news7 from "../../assets/news/news7.jpg";
import news8 from "../../assets/news/news8.jpg";
import news9 from "../../assets/news/news9.jpg";
import news10 from "../../assets/news/news10.jpg";
import news11 from "../../assets/news/news11.jpg";
import news12 from "../../assets/news/news12.jpg"; 
import news13 from "../../assets/news/news13.jpg"; 
import news14 from "../../assets/news/news14.jpg"; 

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm sm:max-w-lg mx-4 sm:mx-auto max-h-[80vh] overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        {children}
        <div className="mt-4 text-right">
          <Button variant="ai" onClick={onClose}><span className="text">Close</span></Button>
        </div>
      </div>
    </div>
  );
}

export default function GameScreen() {

  const { scenarios, index, next, previousSummaries } = useContext(GameContext);
  if (index >= scenarios.length) {
    return <SummaryScreen />;
  }

  const imageMap = {
    news1, news2, news3, news4, news5, news6, news7,
    news8, news9, news10, news11, news12, news13
  };

  const s = scenarios[index];

  const [showPrevious, setShowPrevious] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newsToShow, setNewsToShow] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="theme-ai h-full flex">
      {/* Left static panel */}
     <aside className="sidebar-ai hidden md:block w-72 p-6 space-y-8">

        { !showPrevious ? (
          <>
           <div className="mb-10">
          <span className="docket-tag">Docket · Regulator's Office</span>
          <h2 className="font-semibold text-2xl mb-2 mt-4">Your mission</h2>
          <p className="text-base">
            Serve as national AI &amp; digital governance regulator. Build rules
            and systems that are legally sound, keep citizens and industry
            engaged, and are actually adopted and complied with in practice.
          </p>
        </div>
        <div className="sidebar-rule" />
        <div>
          <h3 className="font-semibold text-2xl mb-2">What to consider?</h3>
          <p className="text-base"><strong>Regulatory Quality</strong><br/>Is the rule legally sound, proportionate, and technically workable?</p>
          <p className="text-base mt-2"><strong>Stakeholder Engagement</strong><br/>Are citizens, civil society, and industry heard?</p>
          <p className="text-base mt-2"><strong>Compliance &amp; Adoption</strong><br/>Will providers, deployers, and institutions actually comply and use it?</p>
        </div>
        </>
        ) : (
        <div>
          <span className="docket-tag">Case Log</span>
          <h3 className="font-semibold text-2xl mb-2 mt-4">Your answers to previous questions</h3>
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

        <Button variant="ai" className="w-full justify-center text-center font-normal mt-4"
        onClick={() => setShowPrevious(!showPrevious)}>
          <span className="text !text-white">{showPrevious ? "Hide Previous Answers" : "Show Previous Answers"}</span>
        </Button>

      </aside>

      {/* Main question area */}
      <main className="flex-1 mt-8 md:mt-16 px-4 sm:px-10 lg:ml-10">
        <ProgressDots total={8} current={index} currentType={s.type} theme="ai" />
        <h1 className="text-2xl sm:text-4xl font-bold mb-2">{s.title}</h1>
        <p className="text-base sm:text-lg mb-4 sm:mb-6 max-w-3xl text-[var(--slate)]">{s.scenario}</p>

      <div className="flex flex-col lg:flex-row items-start sm:space-x-2 mb-6">
        <p className="text-lg sm:text-xl font-medium m-0">{s.question}</p>
          {s.learnMore && (
            <button
              onClick={() => setModalOpen(true)}
              className="underline hover:text-[var(--amber-flag)] focus:outline-none focus:ring-1 focus:ring-[var(--seal-blue)]"
              aria-label="Learn more about this question"
              type="button"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: '#1D3B6D' }}
            >Learn More 🔍
            </button>
          )}
        </div>

        <div className="space-y-3 max-w-2xl text-base pb-10">
          {s.options.map((opt, i) => (
            <Button
            key={i}
            variant="ai"
            className="w-full !justify-start !text-left !font-normal"
            onClick={() => {
              if (opt.news) {
                const selectedNews = {
                ...opt.news,
                image: imageMap[opt.news.image]
              };

              setNewsToShow(selectedNews);
              setSelectedOption(opt);
              } else {
                next(opt.effects, opt.summary, s.question, opt.text);
              }
            }}
          >
            <span className="text !text-white">{opt.text}</span>
          </Button>
         ))}
        </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-2xl font-semibold mb-4">Learn More</h2>
          <p>{s.learnMore}</p>
        </Modal>

        {newsToShow && selectedOption && (
          <NewsModal
            news={newsToShow}
            bannerLabel={s.type === "crisis" ? "REGULATORY ALERT" : "COMPLIANCE UPDATE"}
            bannerClass={s.type === "crisis" ? "banner-alert" : "banner-update"}
            breakingNews={
              s.type === "crisis"
                ? "Regulatory alert: enforcement action opened • agencies notified"
                : "Compliance update: framework adopted • stakeholders briefed"
            }
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