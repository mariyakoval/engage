import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "../styles/Home.css";

const games = [
  {
    key: "ai",
    eyebrow: "Module 1 · Digital Governance",
    title: "AI & Digital Governance Regulator",
    description:
      "Draft AI rules, classify risk, and decide what gets built — and what gets banned.",
    cta: "Open the Case File",
    route: "/ai-governance/rules",
  },
  {
    key: "security",
    eyebrow: "Module 2 · Digital Security",
    title: "Cybersecurity & Hybrid Warfare Official",
    description:
      "Detect information operations, manage live cyber incidents, and protect public trust under pressure.",
    cta: "Enter the Ops Room",
    route: "/cybersecurity/rules",
  },
  {
    key: "democracy",
    eyebrow: "Module 3 · Digital Democracy",
    title: "Digital Democracy Tool Designer",
    description:
      "Design petitions, assemblies, and participatory systems that citizens actually trust and use.",
    cta: "Cast the First Move",
    route: "/digital-democracy/rules",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0342A1 0%, #245BB5 45%, #487DCB 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-150px] left-[-100px] h-[400px] w-[400px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-[10%] right-[-150px] h-[450px] w-[450px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-200px] left-[20%] h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="relative px-6 sm:px-10 lg:px-24 pt-24 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-sm font-medium mb-8">
            Interactive Learning Experience
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-8">
            Welcome to
            <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              ENGAGE
            </span>
          </h1>

          <p className="max-w-4xl mx-auto text-lg sm:text-xl text-white/85 leading-relaxed mb-1">
            Explore the challenges shaping our digital future through
            interactive simulations in governance, cybersecurity, and
            democracy. Learn by making decisions, not just reading about them.
          </p>
        </div>
      </section>

      {/* GAMES */}
      <section className="relative px-6 sm:px-10 lg:px-16 pb-20">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
        Choose Your Role
      </h2>

      <p className="text-white/75 max-w-2xl mx-auto">
        Step into a different role and experience the decisions shaping our
        digital future.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
      {games.map((game) => (
        <div
          key={game.key}
          className="
            group
            rounded-3xl
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            overflow-hidden
            flex flex-col
            h-[310px]
            transition-all
            duration-300
            hover:-translate-y-2
            hover:bg-white/15
            hover:border-white/30
            hover:shadow-2xl
            hover:shadow-blue-900/20
          "
        >
          {/* Accent line */}
          <div className="h-1 w-full bg-white/40 shrink-0" />

          {/* Card content */}
          <div className="p-7 flex flex-col flex-1">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-blue-100/75 font-semibold mb-4">
                {game.eyebrow}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                {game.title}
              </h3>

              <p className="text-white/75 text-sm leading-relaxed">
                {game.description}
              </p>
            </div>

            {/* Button always sits at the same level */}
            <div className="mt-auto pt-6">
              <Button
                variant={game.variant}
                className="w-full justify-center"
                onClick={() => navigate(game.route)}
              >
                <span className="text">{game.cta}</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
}