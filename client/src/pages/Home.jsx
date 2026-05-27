import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";

import { io } from "socket.io-client";

import { motion } from "framer-motion";

const socket = io("https://hivemind-5sav.onrender.com");

function Home() {

  const [username] = useState(() => {
    const userInfoRaw = localStorage.getItem("userInfo");
    const userInfo = userInfoRaw ? JSON.parse(userInfoRaw) : null;
    return userInfo?.username ?? "";
  });

  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState(0);

  const [votes, setVotes] = useState({
    optionA: 0,
    optionB: 0,
  });

  useEffect(() => {

    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    if (userInfo) {
      // username is initialized from localStorage via the useState initializer
    }

    socket.on("receive_message", (data) => {

      setMessages((prev) => [...prev, data]);

    });

    socket.on("online_users", (count) => {

      setOnlineUsers(count);

    });

    socket.on("vote_update", (data) => {

      setVotes(data);

    });

    return () => {

      socket.off("receive_message");

      socket.off("online_users");

      socket.off("vote_update");

    };

  }, []);

  const joinRoom = () => {

    if (room !== "") {

      socket.emit("join_room", room);

      alert(`Joined Room ${room} 🔥`);

    }

  };

  const sendMessage = () => {

    if (message !== "" && room !== "") {

      const messageData = {
        room,
        username,
        message,
        time:
          new Date().getHours() +
          ":" +
          new Date().getMinutes(),
      };

      socket.emit(
        "send_message",
        messageData
      );

      setMessage("");

    }

  };

  const vote = (option) => {

    socket.emit("vote", option);

  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-44 -left-28 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.35)_0%,transparent_65%)]" />
        <div className="absolute top-44 -right-28 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.20)_0%,transparent_65%)]" />
        <div className="absolute bottom-[-140px] left-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.12)_0%,transparent_65%)]" />
      </div>

      <Navbar />

      <div className="flex flex-col items-center justify-center pt-16 pb-24 px-4">
        <div className="relative w-full max-w-4xl">
          <div className="absolute -inset-px rounded-[28px] bg-linear-to-r from-cyan-400/35 via-cyan-400/25 to-cyan-200/15 opacity-40" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative bg-black/70 border border-white/10 p-10 rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold bg-linear-to-r from-cyan-200 via-cyan-300 to-cyan-200 bg-clip-text text-transparent tracking-tight">
                  HiveMind Live Rooms
                </h1>
                <p className="mt-3 text-slate-200/90 text-base md:text-lg max-w-xl">
                  Coordinate decisions in real time with dashboards, ambient presence, and live sentiment voting.
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="rounded-2xl bg-slate-900/60 border border-cyan-400/40 px-4 py-2 text-sm font-semibold text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.6)]">
                  Online: {onlineUsers}
                </div>
                <div className="text-xs text-slate-300/80">
                  <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 mr-1 animate-pulse" />
                  Synced to Hive cluster
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/55 border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-cyan-300 flex items-center gap-2">
                  AI Insight
                  <span className="text-lg">🤖</span>
                </h2>

                <p className="mt-4 text-slate-200/90 text-sm md:text-base">
                  {votes.optionA > votes.optionB
                    ? "Current signal leans toward Option A. Momentum is building in that direction."
                    : votes.optionB > votes.optionA
                    ? "Current signal leans toward Option B. The hive is converging there."
                    : "The hive is balanced. Both options are equally preferred right now."}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => vote("A")}
                    className="group relative overflow-hidden rounded-2xl bg-black/60 border border-white/10 px-4 py-4 text-left font-semibold transition-all hover:border-cyan-300/30"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.35),transparent_55%)]" />
                    <div className="relative">
                      <div className="text-sm uppercase tracking-wide opacity-80">
                        Option A
                      </div>
                      <div className="mt-2 text-2xl leading-none text-cyan-200">
                        {votes.optionA}
                      </div>
                      <div className="mt-1 text-xs opacity-70">
                        Supporters
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => vote("B")}
                    className="group relative overflow-hidden rounded-2xl bg-black/60 border border-white/10 px-4 py-4 text-left font-semibold transition-all hover:border-cyan-300/30"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_80%_25%,rgba(34,211,238,0.28),transparent_58%)]" />
                    <div className="relative">
                      <div className="text-sm uppercase tracking-wide opacity-80">
                        Option B
                      </div>
                      <div className="mt-2 text-2xl leading-none text-cyan-200">
                        {votes.optionB}
                      </div>
                      <div className="mt-1 text-xs opacity-70">
                        Supporters
                      </div>
                    </div>
                  </motion.button>
                </div>
              </div>

              <div className="space-y-6">
              <div className="bg-black/55 border border-white/10 rounded-2xl p-5">
                  <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase mb-3">
                    Room Access
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter Room ID"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className="flex-1 bg-slate-950/60 rounded-xl outline-none border border-slate-700/80 focus:border-cyan-400/70 px-4 py-3 text-sm placeholder:text-slate-500 transition-all"
                    />

                    <button
                      onClick={joinRoom}
                      className="rounded-xl bg-linear-to-r from-cyan-300 via-cyan-400 to-white/20 px-5 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(56,189,248,0.65)] hover:shadow-[0_0_45px_rgba(56,189,248,0.85)] transition-all transform-gpu hover:-translate-y-px"
                    >
                      Join
                    </button>
                  </div>
                </div>

              <div className="bg-black/55 border border-white/10 rounded-2xl p-5">
                  <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase mb-3">
                    Live Chat
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Type message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 bg-slate-950/60 rounded-xl outline-none border border-slate-700/80 focus:border-cyan-400/70 px-4 py-3 text-sm placeholder:text-slate-500 transition-all"
                    />

                    <button
                      onClick={sendMessage}
                      className="rounded-xl bg-linear-to-r from-cyan-300 via-cyan-400 to-white/20 px-5 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(56,189,248,0.55)] hover:shadow-[0_0_45px_rgba(56,189,248,0.8)] transition-all transform-gpu hover:-translate-y-px"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.12) }}
                  whileHover={{ y: -1 }}
                  className="group bg-black/55 border border-white/10 hover:border-cyan-300/30 rounded-2xl p-4 transition-colors duration-150"
                >
                  <div className="flex justify-between items-center gap-3">
                    <p className="text-cyan-200 font-semibold text-sm">
                      {msg.username}
                    </p>

                    <p className="text-slate-400 text-xs">
                      {msg.time}
                    </p>
                  </div>

                  <p className="mt-2 text-sm text-slate-100/95">
                    {msg.message}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;