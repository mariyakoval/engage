import React, { useState } from "react";
import rule6 from "../../assets/security_rule1.svg";
import rule5 from "../../assets/security_rule2.svg";
import rule3 from "../../assets/security_rule3.svg";
import rule4 from "../../assets/security_rule4.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import "../../styles/security-theme.css";

const rules = [
  {
    tag: "BRIEFING · 01/04",
    text: (
      <>
        In each phase of a national security response — <br className="hidden md:block" />
        from threat recognition to long-term resilience — you’ll face critical calls. <br className="hidden md:block" />
        Select one option per scenario to continue.
      </>
    ),
    image: rule6,
    width: 400,
    height: 200,
    buttonLabel: "Next"
  },
  {
    tag: "BRIEFING · 02/04",
    text: (
      <>
        <strong>Every decision affects three key metrics:</strong><br />
        <strong>Response Quality</strong> – <br className="block md:hidden" />is the action sound and proportionate? <br />
        <strong>Public Trust</strong> – <br className="block md:hidden" />does it stay transparent and avoid panic? <br />
        <strong>National Resilience</strong> – <br className="block md:hidden" />does it strengthen deterrence long-term?
      </>
    ),
    image: rule5,
    width: 400,
    height: 200,
    buttonLabel: "Next",
    buttonBack: "Back"
  },
  {
    tag: "BRIEFING · 03/04",
    text: (
      <>
        Every option carries trade-offs. <br className="hidden md:block" />
        Some may buy security but cost trust, or vice versa. <br className="hidden md:block" />
        Real security officials weigh these calls under pressure — so will you.
      </>
    ),
    image: rule3,
    width: 400,
    height: 200,
    buttonLabel: "Next",
    buttonBack: "Back"
  },
  {
    tag: "BRIEFING · 04/04",
    text: (
      <>
        <strong className="text-2xl">Your mission:</strong> <br />
        Lead your country's response to information warfare and cyber incidents — <br className="hidden md:block" />
        staying effective, transparent, and resilient under sustained pressure.
      </>
    ),
    image: rule4,
    width: 400,
    height: 200,
    buttonLabel: "Enter the ops room",
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
      navigate("/cybersecurity/play");
    }
  };

  const handleBack = () => {
    if (step < rules.length) {
      setStep(prev => prev - 1);
    }
  };

  const current = rules[step];

  return (
   <div className="theme-security flex flex-col items-center justify-center px-6 centered-container">
     <div className="p-8 w-[900px] h-[450px] max-w-full text-center flex flex-col items-center justify-center rounded-md bg-[var(--ops-panel)] border border-[var(--ops-line)]">
        <span className="console-tag">{current.tag}</span>
        <img src={current.image}
        alt={`Rule ${step + 1}`}
        style={{
        width: `${current.width}px`,
        height: `${current.height}px`,
        objectFit: "contain"
  }} className="mx-auto mb-3 mt-4" />
        <p className="prose-security text-base sm:text-lg mb-6">{current.text}</p>

      </div>

      {/* Status-light indicators */}
      <div className="flex mt-6 space-x-2 p-6">
        {rules.map((_, index) => (
          <span
            key={index}
            onClick={() => setStep(index)}
            className={`status-light cursor-pointer ${index === step ? "current" : ""} ${index < step ? "completed" : ""}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
        <div className="flex justify-center gap-3 mt-4">
            {step > 0 && (
                <Button variant="security" onClick={handleBack}><span className="text">{current.buttonBack || "Back"}</span></Button>
            )}
            <Button variant="security" onClick={handleNext}><span className="text">{current.buttonLabel}</span></Button>
        </div>
    </div>
  );
};

export default RulesScreen;