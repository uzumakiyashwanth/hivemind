import Navbar from "../components/Navbar";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {

    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      navigate("/login");
    }

  }, [navigate]);

  return (
    <div className="min-h-screen text-white">
      <Navbar />

      <div className="pt-28 px-4 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-3xl bg-black/70 border border-white/10 rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.6)] p-8 sm:p-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-semibold bg-linear-to-r from-cyan-200 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-slate-300/80 mt-3 max-w-xl">
                Your AI workspace—room intelligence, real-time signals, and premium space UI.
              </p>
            </div>

            <div className="rounded-2xl bg-black/60 border border-white/10 px-4 py-3 text-sm">
              <div className="text-slate-300/80">Status</div>
              <div className="mt-1 inline-flex items-center gap-2 font-semibold text-cyan-200">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.6)]" />
                Connected
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-black/60 border border-white/10 rounded-3xl p-6">
              <div className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
                Rooms
              </div>
              <div className="mt-2 text-3xl font-bold text-cyan-200">Realtime</div>
              <p className="mt-2 text-slate-300/80 text-sm">
                Create and join rooms instantly. Voting + chat updates stay synchronized.
              </p>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-3xl p-6">
              <div className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
                Voting
              </div>
              <div className="mt-2 text-3xl font-bold text-cyan-200">Signals</div>
              <p className="mt-2 text-slate-300/80 text-sm">
                Let the hive converge with transparent option momentum.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;