import React, { useState } from 'react';

function Email() {
  // State for email input and error message
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Email validation function
  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if email is valid
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // If email is valid, proceed with further actions (e.g., form submission)
    if (isValid) {
      console.log('Email submitted:', email);
    }
  };

  return (
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

        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-start items-center gap-8 sm:gap-10 lg:gap-12">
          <div className="w-full flex flex-col justify-start items-center gap-6 sm:gap-8 lg:gap-10">
            <div className="w-[90%] sm:w-[532px] flex flex-col justify-start items-start gap-6 sm:gap-8 lg:gap-10">
              <div className="w-full flex flex-col justify-start items-start gap-2.5">
                <div className="w-full flex flex-col justify-start items-start gap-[5px]">
                  <div className="w-full flex justify-start items-center">
                    <div className="text-black text-lg sm:text-xl lg:text-2xl font-bold font-['Urbanist']">E-mail ID</div>
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
                      <div className="text-red-500 text-sm mt-2">{emailError}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-8 lg:px-12 py-4 bg-indigo-500 rounded-md inline-flex justify-center items-center gap-6 w-full sm:w-auto">
            <button type="submit" className="text-center text-white text-lg sm:text-xl lg:text-2xl font-bold font-['Urbanist']">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Email;
