import React, { useState } from 'react';

function Otp() {
  // State for OTP code and error
  const [otp, setOtp] = useState(Array(6).fill('')); // Initialize with 6 empty values
  const [error, setError] = useState('');

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
  const handleSubmit = (e) => {
    e.preventDefault();

    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    // Simulate OTP validation (you would send the OTP to your backend here)
    // Example: Call API to validate the OTP
    if (otpString === '123456') {
      alert('OTP is correct! Proceeding...');
      setError('');
      // Proceed to the next step or redirect, etc.
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
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
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </div>
          
          {/* Submit Button */}
          <div className="px-6 sm:px-12 lg:px-24 py-4 bg-indigo-500 rounded-md inline-flex justify-center items-center gap-6 w-full sm:w-auto">
            <button onClick={handleSubmit} className="text-center text-white text-xl sm:text-2xl font-bold font-['Urbanist']">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
