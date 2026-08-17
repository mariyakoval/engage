import React, { useState } from "react";
import rule1 from "../../assets/rule1.svg";
import rule2 from "../../assets/rule2.svg";
import rule3 from "../../assets/rule3.svg";
import rule4 from "../../assets/rule4.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const rules = [
  {
    text: (
      <>
        In each phase of the citizens’ assembly — from planning to <br className="hidden md:block" />
        parliamentary engagement — you’ll face tough choices. <br className="hidden md:block" />
        Select one option per scenario to move forward.
      </>
    ),
    image: rule1,
    width: 600,
    height: 400,
    buttonLabel: "Next"
  },
  {
    text: (
      <>
        <strong>Every decision affects three guiding values:</strong><br />
        Policy Quality – are the proposals informed and sound? <br  />
        Inclusion & Engagement – is the process fair? <br  />
        Political Uptake – will Parliament adopt the outcomes?
      </>
    ),
    image: rule2,
    width: 300,
    height: 250,
    buttonLabel: "Next",
    buttonBack: "Back"
  },
  {
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
    text: (
      <>
        Guide the assembly to produce well-drafted,<br className="hidden md:block" /> legitimate proposals that are adopted as law — <br className="hidden md:block" />
        while keeping the process open, inclusive, and effective.
      </>
    ),
    image: rule4,
    width: 400,
    height: 200,
    buttonLabel: "Start the game",
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
      navigate("/citizen-assembly/play"); 
    }
  };

  const handleBack = () => {
    if (step < rules.length) {
      setStep(prev => prev - 1);
    }
  };

  const current = rules[step];

  return (
    <div className="bg-[#f7f7f7] flex flex-col items-center justify-center px-6 centered-container">
     <div className="p-8 w-[900px] h-[450px] max-w-full text-center flex flex-col items-center justify-center rounded-[50px] bg-[#f7f7f7] shadow-[inset_-10px_10px_20px_#dcdcdc,_inset_10px_-10px_20px_#ffffff]">
        <img src={current.image} 
        alt={`Rule ${step + 1}`} 
        style={{
        width: `${current.width}px`,
        height: `${current.height}px`,
        objectFit: "contain"
  }} className="mx-auto mb-3" />
        <p className="text-base sm:text-lg text-gray-800 mb-6">{current.text}</p>

      </div>

      {/* Dot Indicators */}
      <div className="flex mt-6 space-x-2 p-6">
        {rules.map((_, index) => (
          <span
            key={index}
            onClick={() => setStep(index)}
            className={`h-2 w-2 rounded-full ${
              index === step ? "bg-blue-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
        <div className="flex justify-center gap-3 mt-4">
            {step > 0 && (
                <Button onClick={handleBack}>
                  <span className="text">{current.buttonBack || "Back"}</span>
                </Button>
            )}
            <Button onClick={handleNext}><span className="text">{current.buttonLabel}</span></Button>
        </div>
    </div>
  );
};

export default RulesScreen;
