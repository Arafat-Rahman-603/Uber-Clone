import React, { useState } from "react";
import {
  FaRegEye,
  FaRegEyeSlash,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRiderStore } from "../../store/riderStore";

export default function RiderSignup() {
  const setRider = useRiderStore((state) => state.setRider);
  const [step, setStep] = useState(1);
  const [hidepassword, setHidePassword] = useState(false);
  const [hideconfirmPassword, setHideConfirmPassword] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    vehicleNumber: "",
    vehicleType: "",
    vehicleColor: "",
    vehicleCapacity: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/riders/send-otp`,
        { email: formData.email }
      );
      if (response.status === 200) {
        setShowOtpStep(true);
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

    const riderSignupData = {
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      email: formData.email,
      password: formData.password,
      vehicle: {
        vehicleNumber: formData.vehicleNumber,
        vehicleType: formData.vehicleType,
        color: formData.vehicleColor,
        capacity: Number(formData.vehicleCapacity),
      },
      otp,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/riders/register`,
        riderSignupData
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        setRider(response.data.rider);
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
      await axios.post(`${import.meta.env.VITE_API_URL}/riders/send-otp`, {
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
              We sent a 6-digit code to <strong>{formData.email}</strong>
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
      <div className="w-full h-[80vh] flex flex-col px-4 pt-8 pb-4">
        <form onSubmit={handleSendOtp} className="gap-2">
          <div className="flex flex-col items-start">
            <p className="text-[1rem] font-bold">Welcome Rider,</p>
            <p className="text-[1.5rem] font-bold leading-0">
              Enter your details below!
            </p>
          </div>

          {step === 1 && (
            <>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input"
                required
                placeholder="First Name"
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input"
                placeholder="Last Name"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
                placeholder="Enter your email"
              />
            </>
          )}

          {step === 2 && (
            <>
              <input
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                className="input"
                placeholder="Vehicle Number"
              />

              <p className="font-semibold mt-2">Vehicle Type</p>
              <div className="grid grid-cols-3 gap-2">
                {["car", "bike", "auto"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, vehicleType: type })
                    }
                    className={`border-2 rounded-md h-12 font-semibold capitalize transition
                      ${
                        formData.vehicleType === type
                          ? "bg-black text-white border-black"
                          : "border-gray-200"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <input
                name="vehicleColor"
                value={formData.vehicleColor}
                onChange={handleChange}
                className="input"
                placeholder="Vehicle Color"
              />
              <input
                name="vehicleCapacity"
                value={formData.vehicleCapacity}
                onChange={handleChange}
                className="input"
                placeholder="Vehicle Capacity"
              />
            </>
          )}

          {step === 3 && (
            <>
              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={hidepassword ? "text" : "password"}
                  className="input"
                  required
                  placeholder="Enter password"
                />
                <p onClick={() => setHidePassword(!hidepassword)}>
                  {hidepassword ? (
                    <FaRegEye className="eye" />
                  ) : (
                    <FaRegEyeSlash className="eye" />
                  )}
                </p>
              </div>

              <div className="relative">
                <input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={hideconfirmPassword ? "text" : "password"}
                  className="input"
                  required
                  placeholder="Confirm password"
                />
                <p onClick={() => setHideConfirmPassword(!hideconfirmPassword)}>
                  {hideconfirmPassword ? (
                    <FaRegEye className="eye" />
                  ) : (
                    <FaRegEyeSlash className="eye" />
                  )}
                </p>
              </div>
            </>
          )}

          <div className="flex gap-2 mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-black w-1/2 h-12 rounded-md font-semibold flex items-center justify-center gap-2"
              >
                <FaArrowLeft /> Previous
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-black text-white w-full h-12 rounded-md font-semibold flex items-center justify-center gap-2"
              >
                Next <FaArrowRight />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white w-full h-12 rounded-md font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Sending Code..." : "Sign Up"} <FaArrowRight />
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2 px-4 justify-center">
        <hr className="border-2 border-gray-200 w-1/2" />
        <p className="text-[1rem] pb-1 font-bold text-gray-400">or</p>
        <hr className="border-2 border-gray-200 w-1/2" />
      </div>

      <div className="w-full p-4">
        <Link
          to="/"
          className="bg-[#F6BE00] text-black flex justify-center items-center w-full h-12 rounded-md font-semibold"
        >
          Go Home
        </Link>
      </div>

      <style>
        {`
        .input {
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          padding: 8px;
          width: 100%;
          height: 48px;
          font-weight: 600;
          margin-top: 8px;
        }
        .eye {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
      `}
      </style>
    </>
  );
}
