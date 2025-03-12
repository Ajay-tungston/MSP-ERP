
// import React, { useState } from 'react';

// function Login() {
//     // State variables for email, password, and error messages
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault(); // Prevent the default form submission

//         let isValid = true;

//         // Reset previous errors
//         setEmailError('');
//         setPasswordError('');

//         // Email validation (basic email format check using regex)
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email || !emailRegex.test(email)) {
//             setEmailError('Please enter a valid email address');
//             isValid = false;
//         }

//         // Password validation (check if password is at least 6 characters long)
//         if (!password || password.length < 6) {
//             setPasswordError('Password must be at least 6 characters long');
//             isValid = false;
//         }

//         // If form is valid, you can proceed with the login logic (e.g., API call)
//         if (isValid) {
//             console.log('Logging in with', { email, password });
//             // Add login functionality here, like calling an API
//         }
//     };

//     return (
//         <div className="w-full h-screen bg-white overflow-hidden flex items-center justify-center">
//             {/* Container with fixed position and center alignment */}
//             <div className="w-full sm:w-[90%] md:w-[600px] lg:w-[700px] px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 bg-white rounded-[27px] shadow-lg outline-[0.20px] outline-offset-[-0.20px] outline-black inline-flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-10">
//                 <img
//                     src="/images/logo.jpeg"  // Use the path relative to the public folder
//                     alt="Logo"
//                     className="w-[126px] h-[126px] mb-1"  // Tailwind classes for width, height, and margin bottom
//                 />
                
//                 {/* Welcome Title and Subtitle */}
//                 <div className="text-center">
//                     <div className="text-black text-3xl sm:text-4xl md:text-5xl font-bold font-['Urbanist']">
//                         Welcome back!
//                     </div>
//                     <div className="text-[#9f9f9f] text-lg sm:text-xl md:text-2xl font-semibold font-['Urbanist']">
//                         Log in to your account
//                     </div>
//                 </div>

//                 {/* Email Input Section */}
//                 <div className="w-full flex flex-col justify-start items-start gap-4">
//                     <label className="self-start text-black text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         required
//                         onChange={(e) => setEmail(e.target.value)}  // Update email state
//                         className="w-full h-[45px] sm:h-[50px] md:h-[60px] px-4 py-2 rounded-[7px] border-[0.5px] border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
//                     />
//                     {emailError && <div className="text-red-500 text-sm mt-2">{emailError}</div>}
//                 </div>

//                 {/* Password Input Section */}
//                 <div className="w-full flex flex-col justify-start items-start gap-4">
//                     <div className="w-full flex justify-between items-center">
//                         <label className="self-start text-black text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">Password</label>
//                         <div className="text-[#5d5fef] text-sm sm:text-base md:text-lg font-normal font-['Urbanist']">Forgot password?</div>
//                     </div>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}  // Update password state
//                         className="w-full h-[45px] sm:h-[50px] md:h-[60px] px-4 py-2 rounded-[7px] border-[0.5px] border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
//                     />
//                     {passwordError && <div className="text-red-500 text-sm mt-2">{passwordError}</div>}
//                 </div>

//                 {/* Login Button */}
//                 <button
//                     onClick={handleSubmit}  // Trigger form validation on button click
//                     className="w-full px-10 py-3 sm:px-[100px] sm:py-4 md:px-[150px] md:py-4 bg-[#5d5fef] rounded-[7px] text-white text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']"
//                 >
//                     Log in
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Login;
import React, { useState } from 'react';

function Login() {
    // State variables for email, password, and error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission

        let isValid = true;

        // Reset previous errors
        setEmailError('');
        setPasswordError('');

        // Email validation (basic email format check using regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        }

        // Password validation (check if password is at least 6 characters long)
        if (!password || password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            isValid = false;
        }

        // If form is valid, you can proceed with the login logic (e.g., API call)
        if (isValid) {
            console.log('Logging in with', { email, password });
            // Add login functionality here, like calling an API
        }
    };

    return (
        <div className="w-full h-screen bg-white overflow-hidden flex items-center justify-center">
            {/* Container with fixed position and center alignment */}
            {/* <div className="w-full sm:w-[90%] md:w-[600px] lg:w-[700px] px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 bg-white rounded-[27px] shadow-2xl outline-offset-[-0.25px] outline-black inline-flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-10"> */}
            <div className="w-full sm:w-[90%] md:w-[600px] lg:w-[700px] px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 bg-white rounded-[27px] shadow-[0px_0px_15px_4px_rgba(0,0,0,0.25)] outline-offset-[-0.25px] outline-black inline-flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-10">

                <img
                    src="/images/logo.jpeg"  // Use the path relative to the public folder
                    alt="Logo"
                    className="w-[126px] h-[126px] mb-1"  // Tailwind classes for width, height, and margin bottom
                />
                
                {/* Welcome Title and Subtitle */}
                <div className="text-center">
                    <div className="text-black text-3xl sm:text-4xl md:text-5xl font-bold font-['Urbanist']">
                        Welcome back!
                    </div>
                    <div className="text-[#9f9f9f] text-lg sm:text-xl md:text-2xl font-semibold font-['Urbanist']">
                        Log in to your account
                    </div>
                </div>

                {/* Email Input Section */}
                <div className="w-full flex flex-col justify-start items-start gap-4">
                    <label className="self-start text-black text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">Email</label>
                    <input
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}  // Update email state
                        className="w-full h-[45px] sm:h-[50px] md:h-[60px] px-4 py-2 rounded-[7px] border-[0.5px] border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
                    />
                    {emailError && <div className="text-red-500 text-sm mt-2">{emailError}</div>}
                </div>

                {/* Password Input Section */}
                <div className="w-full flex flex-col justify-start items-start gap-4">
                    <div className="w-full flex justify-between items-center">
                        <label className="self-start text-black text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">Password</label>
                        <div className="text-[#5d5fef] text-sm sm:text-base md:text-lg font-normal font-['Urbanist']">Forgot password?</div>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}  // Update password state
                        className="w-full h-[45px] sm:h-[50px] md:h-[60px] px-4 py-2 rounded-[7px] border-[0.5px] border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
                    />
                    {passwordError && <div className="text-red-500 text-sm mt-2">{passwordError}</div>}
                </div>

                {/* Login Button */}
                <button
                    onClick={handleSubmit}  // Trigger form validation on button click
                    className="w-full px-10 py-3 sm:px-[100px] sm:py-4 md:px-[150px] md:py-4 bg-[#5d5fef] rounded-[7px] text-white text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']"
                >
                    Log in
                </button>
            </div>
        </div>
    );
}

export default Login;
