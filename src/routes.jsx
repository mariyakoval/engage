import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RulesScreenAI from "./pages/AIGovernance/RulesScreenAI";
import GameScreenAI from "./pages/AIGovernance/GameScreenAI";
import SummaryScreenAI from "./pages/AIGovernance/SummaryScreenAI";
import RulesScreenSecurity from "./pages/Cybersecurity/RulesScreenSecurity";
import GameScreenSecurity from "./pages/Cybersecurity/GameScreenSecurity";
import SummaryScreenSecurity from "./pages/Cybersecurity/SummaryScreenSecurity";
import RulesScreenDemocracy from "./pages/DigitalDemocracy/RulesScreenDemocracy";
import GameScreenDemocracy from "./pages/DigitalDemocracy/GameScreenDemocracy";
import SummaryScreenDemocracy from "./pages/DigitalDemocracy/SummaryScreenDemocracy";
import About from "./pages/About";

import { GameProviderAI } from "./context/GameProviderAI";
import { GameProviderSecurity } from "./context/GameProviderSecurity";
import { GameProviderDemocracy } from "./context/GameProviderDemocracy";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/ai-governance/rules" element={<RulesScreenAI />} />
    <Route path="/ai-governance/summary" element={<SummaryScreenAI />} />
    <Route path="/ai-governance/play" element={<GameProviderAI><GameScreenAI /></GameProviderAI>}/>
    <Route path="/cybersecurity/rules" element={<RulesScreenSecurity />} />
    <Route path="/cybersecurity/summary" element={<SummaryScreenSecurity />} />
    <Route path="/cybersecurity/play" element={<GameProviderSecurity><GameScreenSecurity /></GameProviderSecurity>}/>
    <Route path="/digital-democracy/rules" element={<RulesScreenDemocracy />} />
    <Route path="/digital-democracy/summary" element={<SummaryScreenDemocracy />} />
    <Route path="/digital-democracy/play" element={<GameProviderDemocracy><GameScreenDemocracy /></GameProviderDemocracy>}/>
  </Routes>
);