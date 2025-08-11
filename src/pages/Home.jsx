import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  Button from "../components/Button";
import "../styles/Home.css"; 
import imagemain from "../assets/mainscreen.svg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full bg-gradient-to-br from-[#0342A1] to-[#487DCB] min-h-screen overflow-hidden">
      
      {/* Main Content */}
      <div className="md:z-0 lg:z-10 w-full
             px-4 sm:px-6 md:px-10 lg:px-40
            text-center lg:text-left 
            items-center lg:items-start 
            flex flex-col mt-40 md:mt-20 lg:mt-0">
      <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 text-white max-w-3xl">WELCOME TO ENGAGE!</h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-10 text-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[24ch]">
          Can citizens shape policy that becomes law? 
          <br className="hidden md:block" /> Step into the role of a civic leader and find out.
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center md:justify-start">
          <Button onClick={() => navigate("/citizen-assembly/rules")}>
            <span className="text !text-white">Citizen Assembly</span>
          </Button>
          <Button onClick={() => navigate("/participatory-budget/rules")}>
            <span className="text !text-white">Participatory Budget</span>
          </Button>
          <Button onClick={() => navigate("/e-petitions/rules")}>
            <span className="text !text-white">E-Petition</span>
          </Button>
        </div>
      </div>

      {/* Main Image */}
     <div className="hidden md:flex w-full md:w-1/2 justify-center relative z-0 overflow-visible">
    <img
      src={imagemain}
      alt="Engage Illustration"
      className="md:w-[0%] lg:w-[280%] max-w-none transform translate-x-1 translate-y-[+8%]"
    />
  </div>
    </div>
  );
}

