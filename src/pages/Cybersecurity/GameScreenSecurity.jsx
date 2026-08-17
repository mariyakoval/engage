import { useContext, useState } from "react";
import { GameContextSecurity } from "../../context/GameProviderSecurity";
import Button from "../../components/Button";
import ProgressDots from "../../components/Dots";
import SummaryScreenSecurity from "./SummaryScreenSecurity";
import NewsModal from "../../components/NewsModal";
import "../../styles/security-theme.css";

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
          <Button variant="security" onClick={onClose}><span className="text">Close</span></Button>
        </div>
      </div>
    </div>
  );
}

export default function GameScreen() {

  const { scenarios, index, next, previousSummaries } = useContext(GameContextSecurity);
  if (index >= scenarios.length) {
    return <SummaryScreenSecurity />;
  }

  const imageMap = {
    news1, news2, news3, news4, news5, news6, news7,
    news8, news9, news10, news11
  };

  const s = scenarios[index];

  const [showPrevious, setShowPrevious] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newsToShow, setNewsToShow] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const threatLevelClass =
    s.type === "crisis" ? "level-crisis" :
    s.type === "advantage" ? "level-advisory" : "level-routine";
  const threatLevelLabel =
    s.type === "crisis" ? "ELEVATED" :
    s.type === "advantage" ? "ADVISORY" : "ROUTINE";

  return (
    <div className="theme-security h-full flex">
      {/* Left static panel */}
      <aside className="sidebar-security hidden md:block w-72 p-6 space-y-8">

        { !showPrevious ? (
          <>
           <div className="mb-10">
          <span className="console-tag">Channel · Ops Command</span>
          <h2 className="font-semibold text-2xl mb-2 mt-4">Your mission</h2>
          <p className="prose-security text-base">
            Lead your country's response to information warfare and cyber
            incidents. Stay effective, transparent, and resilient under
            sustained pressure.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-2xl mb-2">What to consider?</h3>
          <p className="prose-security text-base"><strong className="text-[var(--ops-green)]">Response Quality</strong><br/>Is the action sound and proportionate?</p>
          <p className="prose-security text-base mt-2"><strong className="text-[var(--ops-green)]">Public Trust</strong><br/>Does it stay transparent and avoid panic?</p>
          <p className="prose-security text-base mt-2"><strong className="text-[var(--ops-green)]">National Resilience</strong><br/>Does it strengthen deterrence long-term?</p>
        </div>
        </>
        ) : (
        <div>
          <span className="console-tag">Log</span>
          <h3 className="font-semibold text-2xl mb-2 mt-4">Your answers to previous questions</h3>
           {previousSummaries.length === 0 ? (
            <p className="prose-security text-base">No previous answers yet.</p>
          ) : (
            <>
          {previousSummaries[0] && (
            <p className="prose-security text-base"><strong>Answer 1: </strong>{previousSummaries[0]}</p>
          )}
          {previousSummaries[1] && (
            <p className="prose-security text-base mt-4"><strong>Answer 2: </strong>{previousSummaries[1]}</p>
          )}
            </>
          )}
          </div>
        )}

        <Button variant="security" className="w-full justify-center text-center font-normal mt-4"
        onClick={() => setShowPrevious(!showPrevious)}>
          <span className="text">{showPrevious ? "Hide Previous Answers" : "Show Previous Answers"}</span>
        </Button>

      </aside>

      {/* Main question area */}
      <main className="flex-1 mt-8 md:mt-16 px-4 sm:px-10 lg:ml-10">
        <ProgressDots total={8} current={index} currentType={s.type} theme="security" />

        <div className={`threat-level ${threatLevelClass} mb-4`}>
          <span className="threat-dot" />
          THREAT LEVEL: {threatLevelLabel}
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold mb-2">{s.title}</h1>
        <p className="prose-security text-base sm:text-lg mb-4 sm:mb-6 max-w-3xl">{s.scenario}</p>

      <div className="flex flex-col lg:flex-row items-start sm:space-x-2 mb-6">
        <p className="prose-security text-lg sm:text-xl font-medium m-0">{s.question}</p>
          {s.learnMore && (
            <button
              onClick={() => setModalOpen(true)}
              className="underline hover:text-[var(--ops-amber)] focus:outline-none focus:ring-1 focus:ring-[var(--ops-green)]"
              aria-label="Learn more about this question"
              type="button"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: 'var(--ops-green)' }}
            >Learn More 🔍
            </button>
          )}
        </div>

        <div className="space-y-3 max-w-2xl text-base pb-10">
          {s.options.map((opt, i) => (
            <Button
            key={i}
            variant="security"
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
            bannerLabel={s.type === "crisis" ? "🔴 SITREP:" : "🟠 ADVISORY:"}
            bannerClass={s.type === "crisis" ? "banner-sitrep" : "banner-advisory"}
            modalClass="bg-[var(--ops-panel)] border border-[var(--ops-line)] text-[#D6DCE3]"
            buttonVariant="security"
            breakingNews={
              s.type === "crisis"
                ? "Incident escalated • response teams activated"
                : "Situation stabilizing • lessons being logged"
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