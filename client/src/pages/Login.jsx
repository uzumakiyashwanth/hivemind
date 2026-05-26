import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

import { motion } from "framer-motion";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    try {
  
      const data = await loginUser(formData);
                    

      
  
      console.log(data);


      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );
      navigate("/dashboard");
  
      alert("Login Successful 🔥");
  
    } catch (error) {
  
      console.log(error);
  
      alert("Invalid Credentials");
  
    }
  
  };

  return (
    <div className="min-h-screen text-white">
      <Navbar />

      <div className="pt-24 px-4 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-[420px] bg-black/70 border border-white/10 p-10 rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        >
          <h1 className="text-4xl font-bold bg-linear-to-r from-cyan-200 via-cyan-300 to-cyan-400 bg-clip-text text-transparent text-center">
            Welcome Back
          </h1>

          <p className="text-slate-300/80 text-center mt-3">
            Login to continue
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <input
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="bg-black/60 p-4 rounded-2xl outline-none border border-white/10 focus:border-cyan-300/60 transition-all"
            />

            <input
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="bg-black/60 p-4 rounded-2xl outline-none border border-white/10 focus:border-cyan-300/60 transition-all"
            />

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              className="bg-black/60 border border-cyan-300/40 text-cyan-100 p-4 rounded-2xl font-bold transition-all hover:bg-cyan-300/10 hover:border-cyan-300/60"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;