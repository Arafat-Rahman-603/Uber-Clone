import React from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import { useUserStore } from "../../store/userStore";
import axios from "axios";

export default function UserSignup() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [hidepassword, setHidePassword] = useState(false);
  const [hideconfirmPassword, setHideConfirmPassword] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      fullName: {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
      },
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setFormData(data);
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/send-otp`,
        { email: data.email }
      );
      if (response.status === 200) {
        setShowOtpStep(true);
        setOtpSent(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        { ...formData, otp }
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        navigate("/home");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/send-otp`, {
        email: formData.email,
      });
      alert("OTP resent successfully!");
    } catch (error) {
      alert("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  if (showOtpStep) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Verify Your Email</h2>
            <p className="text-gray-500 mt-2">
              We sent a 6-digit code to <strong>{formData?.email}</strong>
            </p>
          </div>
          <form onSubmit={handleVerifyAndRegister}>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="border-2 border-gray-200 rounded-md p-2 w-full h-14 text-center text-2xl font-bold tracking-[0.5em] mx-auto"
              required
              placeholder="000000"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="bg-black px-4 flex justify-between items-center text-white w-full h-12 rounded-md mt-4 mx-auto font-semibold active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <p></p>
              <span className="text-xl">
                {loading ? "Verifying..." : "Verify & Sign Up"}
              </span>
              <FaArrowRight />
            </button>
          </form>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => {
                setShowOtpStep(false);
                setOtp("");
              }}
              className="text-gray-500 font-semibold cursor-pointer"
            >
              ← Go Back
            </button>
            <button
              onClick={handleResendOtp}
              disabled={loading}
              className="text-black font-semibold cursor-pointer disabled:opacity-50"
            >
              Resend Code
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-screen flex-col flex px-4 pt-8 pb-4 h-max ">
        <form onSubmit={handleSendOtp}>
          <div className="flex flex-col items-start">
            <p className="text-[1rem] font-bold">Book your first ride,</p>
            <p className="text-[1.5rem] font-bold leading-0">
              Enter your details below!
            </p>
          </div>
          <input
            type="text"
            className="border-2 border-gray-200 rounded-md p-2 w-full h-12 mt-2 mx-auto font-semibold"
            required
            placeholder="First Name"
            ref={firstNameRef}
          />
          <input
            type="text"
            className="border-2 border-gray-200 rounded-md p-2 w-full h-12 mt-2 mx-auto font-semibold"
            placeholder="Last Name"
            ref={lastNameRef}
          />
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
          <div className="relative">
            <input
              type={hideconfirmPassword ? "text" : "password"}
              className="border-2 border-gray-200 rounded-md p-2 w-full h-12 mt-2 mx-auto font-semibold"
              required
              placeholder="Confirm your password"
              ref={confirmPasswordRef}
            />
            <p onClick={() => setHideConfirmPassword(!hideconfirmPassword)}>
              {hideconfirmPassword ? (
                <FaRegEye className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
              ) : (
                <FaRegEyeSlash className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
              )}
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-black px-4 flex justify-between items-center text-white w-full h-12 rounded-md mt-4 mx-auto font-semibold active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-50"
          >
            <p className=""></p>
            <span className="text-xl">
              {loading ? "Sending Code..." : "Continue"}
            </span>
            <FaArrowRight className="" />
          </button>
        </form>
      </div>
      <div className="flex items-center gap-2 px-4 justify-center">
        <hr className="border-2 border-gray-200 w-1/2" />
        <p className="text-[1rem] pb-1 font-bold text-gray-400">or</p>
        <hr className="border-2 border-gray-200 w-1/2" />
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
