import React, { useState } from "react";
import rule1 from "../../assets/ai_rule1.svg";
import rule2 from "../../assets/ai_rule2.svg";
import rule3 from "../../assets/ai_rule3.svg";
import rule4 from "../../assets/ai_rule4.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import "../../styles/ai-theme.css";

const rules = [
  {
    tag: "ONBOARDING · 01/04",
    text: (
      <>
        In each phase of AI &amp; digital governance regulation — from framing <br className="hidden md:block" />
        the mandate to earning public trust — you’ll face tough choices. <br className="hidden md:block" />
        Select one option per scenario to move forward.
      </>
    ),
    image: rule1,
    width: 250,
    height: 400,
    buttonLabel: "Next"
  },
  {
    tag: "ONBOARDING · 02/04",
    text: (
      <>
        <strong>Every decision affects three guiding values:</strong><br />
        Regulatory Quality – is the rule legally sound and workable? <br />
        Stakeholder Engagement – are citizens and industry heard? <br />
        Compliance & Adoption – will it actually be followed and used?
      </>
    ),
    image: rule2,
    width: 300,
    height: 400,
    buttonLabel: "Next",
    buttonBack: "Back"
  },
  {
    tag: "ONBOARDING · 03/04",
    text: (
      <>
        Each choice has trade-offs. Some may help with one <br className="hidden md:block" />
        goal but hurt another. Use your judgment based on <br className="hidden md:block" />
        context — like in real life policymaking.
      </>
    ),
    image: rule3,
    width: 400,
    height: 200,
    buttonLabel: "Next",
    buttonBack: "Back"
  },
  {
    tag: "ONBOARDING · 04/04",
    text: (
      <>
        Guide the regulator's office to produce sound, legitimate <br className="hidden md:block" /> rules that are adopted and complied with — <br className="hidden md:block" /> while keeping the process open, engaged, and trusted.
      </>
    ),
    image: rule4,
    width: 400,
    height: 200,
    buttonLabel: "Open the case file",
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
      navigate("/ai-governance/play");
    }
  };

  const handleBack = () => {
    if (step < rules.length) {
      setStep(prev => prev - 1);
    }
  };

  const current = rules[step];

  return (
    <div className="theme-ai flex flex-col items-center justify-center px-6 centered-container">
     <div className="p-8 w-[900px] h-[450px] max-w-full text-center flex flex-col items-center justify-center rounded-md bg-[var(--paper)] border border-[var(--docket-line)]">
        <span className="docket-tag">{current.tag}</span>
        <img src={current.image}
        alt={`Rule ${step + 1}`}
        style={{
        width: `${current.width}px`,
        height: `${current.height}px`,
        objectFit: "contain"
  }} className="mx-auto mb-3 mt-4" />
        <p className="text-base sm:text-lg text-[var(--ink-navy)] mb-6">{current.text}</p>

      </div>

      {/* Docket tick indicators */}
      <div className="flex mt-6 space-x-2 p-6">
        {rules.map((_, index) => (
          <span
            key={index}
            onClick={() => setStep(index)}
            className={`docket-tick cursor-pointer ${index === step ? "current" : ""} ${index < step ? "completed" : ""}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
        <div className="flex justify-center gap-3 mt-4">
            {step > 0 && (
                <Button variant="ai" onClick={handleBack}>
                  <span className="text">{current.buttonBack || "Back"}</span>
                </Button>
            )}
            <Button variant="ai" onClick={handleNext}><span className="text">{current.buttonLabel}</span></Button>
        </div>
    </div>
  );
};

export default RulesScreen;