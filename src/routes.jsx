import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RulesScreen from "./pages/CitizenAssembly/RulesScreen";
import GameScreen from "./pages/CitizenAssembly/GameScreen";
import SummaryScreen from "./pages/CitizenAssembly/SummaryScreen";
import RulesScreenBudget from "./pages/ParticipatoryBudget/RulesScreenBudget";
import GameScreenBudget from "./pages/ParticipatoryBudget/GameScreenBudget";
import SummaryScreenBudget from "./pages/ParticipatoryBudget/SummaryScreenBudget";
import RulesScreenPetitions from "./pages/e-petitions/RulesScreenPetitions";
import GameScreenPetitions from "./pages/e-petitions/GameScreenPetitions";
import SummaryScreenPetitions from "./pages/e-petitions/SummaryScreenPetitions";
import About from "./pages/About";

import { GameProvider } from "./context/GameProvider";
import { GameProviderBudget } from "./context/GameProviderBudget";
import { GameProviderPetitions } from "./context/GameProviderPetitions";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/citizen-assembly/rules" element={<RulesScreen />} />
    <Route path="/citizen-assembly/summary" element={<GameProvider><SummaryScreen /></GameProvider>} />
    <Route path="/participatory-budget/rules" element={<RulesScreenBudget />} />
    <Route path="/participatory-budget/summary" element={<GameProviderBudget><SummaryScreenBudget /></GameProviderBudget>} />
    <Route path="/participatory-budget/play" element={<GameProviderBudget><GameScreenBudget /></GameProviderBudget>}/>
    <Route path="/e-petitions/play" element={<GameProviderPetitions><GameScreenPetitions /></GameProviderPetitions>}/>
    <Route path="/e-petitions/rules" element={<RulesScreenPetitions />} />
    <Route path="/e-petitions/summary" element={<GameProviderPetitions><SummaryScreenPetitions /></GameProviderPetitions>} />
    <Route path="/citizen-assembly/play" element={<GameProvider><GameScreen /></GameProvider>}/>
  </Routes>
);