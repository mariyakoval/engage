import React, { useState } from "react";
import rule6 from "../../assets/rule6.svg";
import rule5 from "../../assets/rule5.svg";
import rule3 from "../../assets/rule3.svg";
import rule4 from "../../assets/rule4.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const rules = [
  {
    text: (
      <>
        In each phase of the participatory budgeting cycle — <br className="hidden md:block" />
        from launch to project implementation — you’ll face critical decisions. <br className="hidden md:block" />
        Select one option per scenario to continue.
      </>
    ),
    image: rule6,
    width: 600,
    height: 400,
    buttonLabel: "Next"
  },
  {
    text: (
      <>
        <strong> Every choice affects three key goals:</strong><br />
        <strong>Proposal Quality</strong> – <br className="block md:hidden" /> are the projects useful and well-prepared? <br  />
       <strong> Inclusion & Engagement</strong> – <br className="block md:hidden" />were voices diverse? <br  />
        <strong>Implementation</strong> – <br className="block md:hidden" />can the selected projects be delivered by the city?
      </>
    ),
    image: rule5,
    width: 300,
    height: 250,
    buttonLabel: "Next",
    buttonBack: "Back"
  },
  {
    text: (
      <>
       Each option comes with trade-offs. <br className="hidden md:block" /> 
        Some may boost one goal but risk another. Just like in real cities, <br className="hidden md:block" /> 
        you’ll need to weigh competing priorities and respond to local context.
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
        <strong className="text-2xl">Your mission:</strong> <br /> 
        Design and run a participatory budget process that’s inclusive, transparent, <br className="hidden md:block" /> 
        and results in feasible, impactful projects — with strong community buy-in.
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
      navigate("/participatory-budget/play"); 
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
                <Button onClick={handleBack}><span className="text">{current.buttonBack || "Back"}</span></Button>
            )}
            <Button onClick={handleNext}><span className="text">{current.buttonLabel}</span></Button>
        </div>
    </div>
  );
};

export default RulesScreen;
