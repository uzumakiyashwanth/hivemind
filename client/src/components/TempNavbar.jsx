import { Link } from "react-router-dom";
import Navbar from "./TempNavbar";

function Navbar() {
  return (
    <div className="fixed top-4 inset-x-0 z-30 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-6 rounded-full border border-white/10 bg-black/75 px-4 py-2.5 sm:px-6 sm:py-3 shadow-[0_10px_35px_rgba(0,0,0,0.35)] max-w-3xl w-[94%] sm:w-auto">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_0_rgba(0,0,0,0)]" />
          <span className="text-[1.45rem] font-semibold tracking-tight text-cyan-200">
            HiveMind
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-100">
          <Link
            to="/"
            className="rounded-full px-3.5 py-1.5 sm:px-4 sm:py-1.5 border border-white/10 bg-white/0 hover:bg-white/5 hover:text-cyan-200 hover:border-cyan-300/30 transition-colors duration-200"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="rounded-full px-3.5 py-1.5 sm:px-4 sm:py-1.5 border border-white/10 bg-white/0 hover:bg-white/5 hover:text-cyan-200 hover:border-cyan-300/30 transition-colors duration-200"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-full px-3.5 py-1.5 sm:px-4 sm:py-1.5 border border-white/10 bg-white/0 hover:bg-white/5 hover:text-cyan-200 hover:border-cyan-300/30 transition-colors duration-200"
          >
            Register
          </Link>

          <Link
            to="/dashboard"
            className="rounded-full px-3.5 py-1.5 sm:px-4 sm:py-1.5 bg-cyan-400/10 border border-cyan-300/30 text-cyan-100 font-semibold hover:bg-cyan-400/15 transition-colors duration-200"
          >
            Dashboard
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;