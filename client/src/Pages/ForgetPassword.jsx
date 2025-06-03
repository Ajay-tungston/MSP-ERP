import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpError, setOtpError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (isValid) {
      try {
        setLoading(true);
        const response = await api.post("admin/auth/forgot-password", { email });
        setErrMsg("");
        setStep(2);
      } catch (error) {
        if (error?.response?.status === 404) {
          setErrMsg("This email isn’t registered. Please check and try again.");
        } else {
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
            draggable: true,
          });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(value)) {
      setErrMsg("");
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (value.length === 6 && /^\d{6}$/.test(value)) {
      setOtp(value.split(""));
      document.getElementById(`otp-input-5`).focus();
      return;
    }

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          document.getElementById(`otp-input-${index - 1}`).focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await api.post("admin/auth/verify-otp", { otp: otpString, email }, { withCredentials: true });
      if (response.status === 200) {
        setOtpError("");
        navigate("/reset-password");
        setEmail("");
        setOtp(["", "", "", "", "", ""]);
      }
    } catch (err) {
      if (err?.response?.status === 422) {
        setOtpError("Invalid OTP");
      } else {
        setOtpError("Failed to verify OTP");
      }
    }
  };

  return (
    <>
      {step === 1 && (
        <div className="w-full min-h-screen bg-white overflow-auto flex justify-center items-center">
          <div className="aspect-[491/501] px-[60px] pt-[47px] pb-[47px] bg-white rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.15)] flex flex-col justify-between items-center">
            <div className="flex flex-col justify-start items-center gap-[54px]">
              <div className="flex flex-col justify-start items-center gap-5">
                <div className="w-32 h-32 bg-indigo-500 rounded-full flex justify-center items-center">
                  <img src="/images/email.png" alt="Email Icon" className="w-14 h-12" />
                </div>
                <div className="text-black text-2xl font-bold font-['Urbanist'] text-center">
                  Reset your password
                </div>
                {errMsg && <div className="text-red-500 text-sm text-center">{errMsg}</div>}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col justify-start items-center gap-10">
                <div className="flex flex-col justify-start items-start gap-2.5">
                  <div className="text-black text-xl font-bold font-['Urbanist']">E-mail ID</div>
                  <div className="w-[357px] h-[60px]">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      className="w-full h-full px-4 bg-white rounded-md shadow-md border border-zinc-500 text-base"
                      placeholder="Enter E-mail"
                    />
                  </div>
                  {emailError && <div className="text-red-500 text-sm mt-2">{emailError}</div>}
                </div>

                <button
                  type="submit"
                  className="w-[357px] h-[60px] bg-indigo-500 rounded-md flex justify-center items-center text-white text-lg font-bold font-['Urbanist']"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="border-4 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="w-full h-screen bg-yellow flex justify-center items-center">
          <div
            className="w-[491px] rounded-[27px] border border-black/20 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.55)]
            pt-[35px] pr-[65px] pb-[35px] pl-[65px] bg-white flex flex-col justify-start items-center gap-[10px]"
          >
            <div className="flex flex-col justify-start items-center gap-[4px]">
              <div className="w-32 h-32 bg-indigo-500 rounded-full flex justify-center items-center">
                <img src="/images/email.png" alt="Email Icon" className="w-14 h-12" />
              </div>
              <div className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold font-['Urbanist'] text-center">
                Reset your password
              </div>
            </div>

            <div className="flex flex-col justify-start items-center gap-5">
              <div className="text-black text-3xl font-bold font-['Urbanist']">Verify</div>
              <div className="text-black text-xl font-light font-['Urbanist'] text-center">
                Your code was sent to you via email
              </div>

              <div className="flex justify-center items-center gap-5">
                {otp.map((digit, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-white border border-neutral-400 rounded-[10px] flex justify-center items-center"
                  >
                    <input
                      type="text"
                      id={`otp-input-${index}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      maxLength={6}
                      className="w-full h-full text-center text-2xl font-bold outline-none"
                      inputMode="numeric"
                    />
                  </div>
                ))}
              </div>

              {otpError && <div className="text-red-500 text-sm mt-2">{otpError}</div>}

              <button
                onClick={handleOtpSubmit}
                className="w-[357px] h-[60px] bg-indigo-500 rounded-md flex justify-center items-center text-white text-xl font-bold font-['Urbanist']"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgetPassword;