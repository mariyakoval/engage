import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import Navbar from "./components/Navbar/Navbar";
import React, { useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"

function App() {

  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'dark');

  return (
    <Router>
         <div className={`app-root ${theme}`} style={{ minHeight: "100vh", height: "100vh", display: "flex", flexDirection: "column"}}>
        <Navbar theme={theme} setTheme={setTheme}/>
        
      <AppRoutes />
       </div>
    </Router>
  );
}

export default App;
