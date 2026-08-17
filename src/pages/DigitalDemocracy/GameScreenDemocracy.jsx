import { useContext, useState } from "react";
import { GameContextDemocracy } from "../../context/GameProviderDemocracy";
import Button from "../../components/Button";
import ProgressDots from "../../components/Dots";
import SummaryScreen from "./SummaryScreenDemocracy";
import NewsModal from "../../components/NewsModal";
import "../../styles/democracy-theme.css";

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
          <Button variant="democracy" onClick={onClose}><span className="text">Close</span></Button>
        </div>
      </div>
    </div>
  );
}

export default function GameScreen() {

  const { scenarios, index, next, previousSummaries } = useContext(GameContextDemocracy);
  if (index >= scenarios.length) {
    return <SummaryScreen />;
  }

  const imageMap = {
    news1, news2, news3, news4, news5, news6, news7,
    news12, news13, news14
  };

  const s = scenarios[index];

  const [showPrevious, setShowPrevious] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newsToShow, setNewsToShow] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="theme-democracy h-full flex">
      {/* Left static panel */}
      <aside className="sidebar-democracy hidden md:block w-72 p-6 space-y-8">

        { !showPrevious ? (
          <>
           <div className="mb-10">
          <span className="civic-tag">Your Role</span>
          <div className="flex items-center gap-3 mt-2 mb-4">
            <span className="ballot-stamp">✓</span>
            <h2 className="font-semibold text-2xl">Your mission</h2>
          </div>
          <p className="text-base">
            Design and run a digital democracy tool — petition, assembly,
            or participatory budgeting — that results in real policy impact,
            while keeping the process inclusive, trusted, and legitimate.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-2xl mb-2">What to consider?</h3>
          <p className="text-base"><strong>Design Quality</strong><br/>Is the tool well-built, secure, and legitimate?</p>
          <p className="text-base mt-2"><strong>Participation &amp; Inclusion</strong><br/>Are diverse voices genuinely reached?</p>
          <p className="text-base mt-2"><strong>Institutional Impact</strong><br/>Will decision-makers actually act on the outcome?</p>
        </div>
        </>
        ) : (
        <div>
          <span className="civic-tag">Your Record</span>
          <h3 className="font-semibold text-2xl mb-2 mt-2">Your answers to previous questions</h3>
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

        <Button variant="democracy" className="w-full justify-center text-center font-normal mt-4"
        onClick={() => setShowPrevious(!showPrevious)}>
          <span className="text">{showPrevious ? "Hide Previous Answers" : "Show Previous Answers"}</span>
        </Button>

      </aside>

      {/* Main question area */}
      <main className="flex-1 mt-8 md:mt-16 px-4 sm:px-10 lg:ml-10">
        <ProgressDots total={8} current={index} currentType={s.type} theme="democracy" />
        <h1 className="text-2xl sm:text-4xl font-bold mb-2">{s.title}</h1>
        <p className="text-base sm:text-lg mb-4 sm:mb-6 max-w-3xl text-[var(--civic-ink)]">{s.scenario}</p>

      <div className="flex flex-col lg:flex-row items-start sm:space-x-2 mb-6">
        <p className="text-lg sm:text-xl font-medium m-0">{s.question}</p>
          {s.learnMore && (
            <button
              onClick={() => setModalOpen(true)}
              className="underline hover:text-[var(--civic-terracotta)] focus:outline-none focus:ring-1 focus:ring-[var(--civic-teal)]"
              aria-label="Learn more about this question"
              type="button"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: 'var(--civic-teal)' }}
            >Learn More 🔍
            </button>
          )}
        </div>

        <div className="space-y-3 max-w-2xl text-base pb-10">
          {s.options.map((opt, i) => (
            <Button
            key={i}
            variant="democracy"
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
            <span className="text">{opt.text}</span>
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
            bannerLabel={s.type === "crisis" ? "⚠️ Community Alert:" : "📣 Civic Update:"}
            bannerClass={s.type === "crisis" ? "banner-community-alert" : "banner-civic-update"}
            modalClass="bg-white border border-[var(--civic-line)]"
            buttonVariant="democracy"
            breakingNews={
              s.type === "crisis"
                ? "Process under scrutiny • organisers respond"
                : "Milestone reached • momentum builds"
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