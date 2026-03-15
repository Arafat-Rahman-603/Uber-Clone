import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useRiderStore } from "../../store/riderStore";

export default function RiderLogin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [hidepassword, setHidePassword] = useState(false);
  const navigate = useNavigate();
  const setRider = useRiderStore((state) => state.setRider);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const riderLoginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/riders/login`,
      riderLoginData,
    );
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      setRider(response.data.rider);
      localStorage.setItem("rider", JSON.stringify(response.data.rider));
      navigate("/rider/home");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex-col flex px-4 pt-8 pb-4 h-max ">
        <form onSubmit={handleSubmit}>
          <p className="text-[1.5rem] font-bold">Welcome Back, Rider!</p>
          <input
            type="email"
            className="border-2 border-gray-200 rounded-md p-2 w-full h-12 mt-2 mx-auto font-semibold"
            required
            placeholder="Enter your email"
            ref={emailRef}
          />
          <div className="relative">
            <input
              type={hidepassword ? "text" : "password"}
              className="border-2 border-gray-200 rounded-md p-2 w-full h-12 mt-2 mx-auto font-semibold"
              required
              placeholder="Enter your password"
              ref={passwordRef}
            />
            <p onClick={() => setHidePassword(!hidepassword)}>
              {hidepassword ? (
                <FaRegEye className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
              ) : (
                <FaRegEyeSlash className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
              )}
            </p>
          </div>
          <button
            type="submit"
            className="bg-black px-4 flex justify-between items-center text-white w-full h-12 rounded-md mt-4 mx-auto font-semibold active:scale-95  transition-all duration-300 cursor-pointer"
          >
            <p className=""></p>
            <span className="text-xl">Continue</span>
            <FaArrowRight className="" />
          </button>
        </form>
      </div>
      <div className="absolute bottom-4 w-full p-4">
        <Link
          to="/"
          className="bg-[#F6BE00] text-black px-4 flex justify-between items-center text-white w-full h-12 rounded-md mt-4 mx-auto font-semibold active:scale-95  transition-all duration-300 cursor-pointer"
        >
          <p className=""></p>
          <span className="text-xl">Go Home</span>
          <FaArrowRight className="" />
        </Link>
      </div>
    </>
  );
}
