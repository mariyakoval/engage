import React, { useState } from "react";
import rule1 from "../../assets/democracy_rule1.svg";
import rule2 from "../../assets/democracy_rule2.svg";
import rule3 from "../../assets/democracy_rule3.svg";
import rule4 from "../../assets/democracy_rule4.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import "../../styles/democracy-theme.css";

const rules = [
  {
    tag: "GETTING STARTED · 01/04",
    text: (
      <>
        In each stage of designing a digital democracy tool — <br className="hidden md:block" />
        from choosing an approach to sustaining it long-term — <br className="hidden md:block" />
        you’ll face scenarios that shape the whole process. Select one option per scenario to move forward.
      </>
    ),
    image: rule1,
    width: 600,
    height: 200,
    buttonLabel: "Next"
  },
  {
    tag: "GETTING STARTED · 02/04",
    text: (
      <>
        <strong>Every decision affects three guiding values:</strong><br />
        Design Quality – Is the tool well-built, secure, and legitimate? <br />
        Participation & Inclusion – Are diverse voices genuinely reached? <br />
        Institutional Impact – Will decision-makers actually act on the outcome?
      </>
    ),
    image: rule2,
    width: 300,
    height: 250,
    buttonLabel: "Next",
    buttonBack: "Back"
  },
  {
    tag: "GETTING STARTED · 03/04",
    text: (
      <>
        Each choice has trade-offs. Some may help with one <br className="hidden md:block" />
        goal but hurt another. Use your judgment based on <br className="hidden md:block" />
        context — just like in real civic-tech projects.
      </>
    ),
    image: rule3,
    width: 400,
    height: 200,
    buttonLabel: "Next",
    buttonBack: "Back"
  },
  {
    tag: "GETTING STARTED · 04/04",
    text: (
      <>
        <strong className="text-2xl">Your mission:</strong> <br />
        Design and run a digital democracy tool — petition, assembly, or <br className="hidden md:block" />
        participatory budgeting — that's inclusive, trusted, and actually shapes policy.
      </>
    ),
    image: rule4,
    width: 400,
    height: 200,
    buttonLabel: "Cast the first move",
    buttonBack: "Back"
  }
];

const RulesScreen = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < rules.length - 1) {
      setStep(prev => prev + 1);
    } else {
      navigate("/digital-democracy/play");
    }
  };

  const handleBack = () => {
    if (step < rules.length) {
      setStep(prev => prev - 1);
    }
  };

  const current = rules[step];

  return (
    <div className="theme-democracy flex flex-col items-center justify-center px-6 centered-container">
     <div className="p-8 w-[900px] h-[450px] max-w-full text-center flex flex-col items-center justify-center rounded-[40px] bg-white border border-[var(--civic-line)]">
        <span className="civic-tag">{current.tag}</span>
        <img src={current.image}
        alt={`Rule ${step + 1}`}
        style={{
        width: `${current.width}px`,
        height: `${current.height}px`,
        objectFit: "contain"
  }} className="mx-auto mb-3 mt-2" />
        <p className="text-base sm:text-lg text-[var(--civic-ink)] mb-6">{current.text}</p>

      </div>

      {/* Ballot dot indicators */}
      <div className="flex mt-6 space-x-2 p-6">
        {rules.map((_, index) => (
          <span
            key={index}
            onClick={() => setStep(index)}
            className={`ballot-dot cursor-pointer ${index === step ? "current" : ""} ${index < step ? "completed" : ""}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
        <div className="flex justify-center gap-3 mt-4">
            {step > 0 && (
                <Button variant="democracy" onClick={handleBack}>
                  <span className="text">{current.buttonBack || "Back"}</span>
                </Button>
            )}
            <Button variant="democracy" onClick={handleNext}><span className="text">{current.buttonLabel}</span></Button>
        </div>
    </div>
  );
};

export default RulesScreen;