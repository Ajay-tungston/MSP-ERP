import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ForgetPassword() {
  // State for email input and error message
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [otp, setOtp] = useState(Array(6).fill("")); // Initialize with 6 empty values
  const [otpError, setOtpError] = useState("");

  // Email validation function
  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if email is valid
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // If email is valid, proceed with further actions (e.g., form submission)
    if (isValid) {
      try {
        setLoading(true);
        const response = await api.post("admin/auth/forgot-password", {
          email,
        });
        setErrMsg("");
        setStep(2);
      } catch (error) {
        if (error?.response?.status === 404) {
          setErrMsg(error?.response?.data?.message);
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

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Only allow numbers

    // Update OTP array at the correct index
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next input box when the user enters a value
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Validate and submit OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await api.post("admin/auth/verify-otp", { otp:otpString, email },{
        withCredentials: true,
      });
      console.log(response)
      if( response.status === 200){
        setOtpError("");
        navigate("/reset-password")
        setEmail("")
        setOtp([ '', '', '', '', '', '' ]);
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
          <div className="px-8 py-12 sm:px-16 sm:py-20 lg:px-24 lg:py-24 bg-white rounded-3xl shadow-lg  outline-[0.20px] outline-offset-[-0.20px] outline-black inline-flex flex-col justify-start items-center gap-12 sm:gap-14 lg:gap-16 max-w-lg sm:max-w-xl lg:max-w-2xl">
            <div className="relative flex flex-col justify-start items-center gap-4 sm:gap-5 lg:gap-6">
              <div className="w-32 h-32 bg-indigo-500 rounded-full flex justify-center items-center">
                <img
                  src="/images/email.png" // Replace with your image source
                  alt="Image Description"
                  className="w-14 h-12"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-2 sm:gap-3 lg:gap-4">
                <div className="text-black text-xl sm:text-2xl lg:text-3xl font-bold font-['Urbanist']">
                  Reset your password
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-start items-center gap-8 sm:gap-10 lg:gap-12"
            >
              <div className="w-full flex flex-col justify-start items-center gap-6 sm:gap-8 lg:gap-10">
                <div className="w-[90%] sm:w-[532px] flex flex-col justify-start items-start gap-6 sm:gap-8 lg:gap-10">
                  <div className="w-full flex flex-col justify-start items-start gap-2.5">
                    {errMsg && (
                      <div className="text-red-500 text-sm">{errMsg}</div>
                    )}

                    <div className="w-full flex flex-col justify-start items-start gap-[5px]">
                      <div className="w-full flex justify-start items-center">
                        <div className="text-black text-lg sm:text-xl lg:text-2xl font-bold font-['Urbanist']">
                          E-mail ID
                        </div>
                      </div>
                      <div className="w-full sm:w-[532px] flex flex-col justify-start items-start gap-[5px]">
                        <div className="w-full h-14 sm:h-16 relative rounded-md outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500">
                          <div className="w-full h-16 sm:h-16 left-0 top-0 absolute bg-white rounded-md shadow-md border-[0.50px] border-zinc-500" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-full left-0 top-0 absolute bg-white rounded-md shadow-md border-[0.50px] border-zinc-500 px-4"
                            placeholder="Enter E-mail"
                          />
                        </div>
                        {/* Display error message if email is invalid */}
                        {emailError && (
                          <div className="text-red-500 text-sm mt-2">
                            {emailError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-8 lg:px-12 py-4 bg-indigo-500 rounded-md inline-flex justify-center items-center gap-6 w-full sm:w-auto">
                <button
                  type="submit"
                  className="text-center text-white text-lg sm:text-xl lg:text-2xl font-bold font-['Urbanist'] flex items-center gap-2 w-[140px] h-[30px] justify-center"
                >
                  {loading ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-8 h-8"></span>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="w-full h-screen bg-white flex justify-center items-center">
          <div className="px-8 py-12 sm:px-16 sm:py-20 lg:px-24 lg:py-24 bg-white rounded-3xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.55)] flex flex-col justify-start items-center gap-12 max-w-lg sm:max-w-xl lg:max-w-2xl">
            <div className="relative flex flex-col justify-start items-center gap-[5px]">
              <div className="w-32 h-32 bg-indigo-500 rounded-full flex justify-center items-center">
                <img
                  src="/images/email.png" // Replace with your image source
                  alt="Image Description"
                  className="w-14 h-12"
                />
              </div>

              <div className="flex flex-col justify-center items-center gap-[3px]">
                <div className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold font-['Urbanist']">
                  Reset your password
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-start items-center gap-8 sm:gap-10 lg:gap-12">
              <div className="w-full flex flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-8">
                <div className="flex flex-col justify-start items-center gap-5">
                  <div className="justify-start text-black text-3xl font-bold font-['Urbanist']">
                    Verify
                  </div>
                  <div className="self-stretch justify-start text-black text-xl sm:text-2xl font-light font-['Urbanist']">
                    Your code was sent to you via email
                  </div>
                </div>

                {/* OTP Input Fields */}
                <div className="flex justify-center items-center gap-3.5 sm:gap-4 lg:gap-5">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="px-5 py-4 bg-white rounded-[10px] outline-1 outline-offset-[-1px] outline-neutral-400 inline-flex flex-col justify-center items-center gap-2.5"
                    >
                      <input
                        type="text"
                        id={`otp-input-${index}`}
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(e, index)}
                        maxLength={1}
                        className="w-12 h-12 text-center text-2xl font-bold outline-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Error message */}
                {otpError && (
                  <div className="text-red-500 text-sm mt-2">{otpError}</div>
                )}
              </div>

              {/* Submit Button */}
              <div className="px-6 sm:px-12 lg:px-24 py-4 bg-indigo-500 rounded-md inline-flex justify-center items-center gap-6 w-full sm:w-auto">
                <button
                  onClick={handleOtpSubmit}
                  className="text-center text-white text-xl sm:text-2xl font-bold font-['Urbanist']"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgetPassword;
