import React from "react";
import { useNavigate } from "react-router-dom";
import imageabout from "../assets/about.svg";

export default function About() {
    return(

<div className="flex flex-col xl:flex-row items-center justify-between w-full bg-gradient-to-bl from-blue-50 to-teal-50 min-h-screen p-20 text-center xl:text-left overflow-auto">
    <div className="md:z-0 lg:z-10 w-full">
<h1 className="text-3xl font-bold mb-4">About Engage</h1>
<p className="text-lg mb-4 max-w-2xl items-center mx-auto xl:mx-0">
  Engage is a platform designed to teach the students the basics of policymaking, decision-making process, and project management skills. Through the set of scenarios divided by planning and implementation stages, the player can build a unique tree of decisions and assess their performance. 
</p>
<p className="text-lg mb-4 max-w-2xl mx-auto xl:mx-0">
  The platform includes Citizens' Assembly, Participatory Budget, and E-Petitions modules, each built to simulate real-world civic processes and encourage active participation. Participants are welcome to explore these games individually or in teams. 
</p>
<h1 className="text-3xl font-bold mb-4 mt-6">About the author</h1>
<p className="text-lg mb-4 max-w-2xl mx-auto xl:mx-0">
    Engage was created by Mariia Koval, a student at Amherst College, Massachusetts, USA, during her internship at the University of Tartu Ukraine Centre, Estonia. The project was developed under the supervision of Dr. Dmytro Khutkyy, with a focus on improving student engagement through interactive learning tools.
</p>
</div>
<div className="hidden md:flex w-full md:w-1/3 justify-center relative z-0 overflow-visible">
    <img
      src={imageabout}
      alt="Engage Illustration"
      className="md:w-full xl:w-[180%] max-w-none xl:translate-x-[-20%]"
    />
  </div>


</div>
)
}