
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';

function Login() {
    // State variables for email, password, and error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate(); // Hook to navigate to a different page

    const dispatch = useDispatch();



    // Handle form submission
    const handleSubmit = async(e) => {
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
        if (!password || password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            isValid = false;
        }

        // If form is valid, you can proceed with the login logic (e.g., API call)
        if (isValid) {
            console.log('Logging in with', { email, password });
            // Add login functionality here, like calling an API

            try {
                const response= await api.post("/admin/auth/login",{email,password},
                    {withCredentials: true}
                )
                if (response.status === 200) {
                    dispatch(login({ userName: response.data.username, accessToken: response.data.accessToken }));
                    setEmail("");
                    setPassword("");
                    // navigate("/");
                  }
            } catch (error) {
                console.log(error)
            }

        }
    };

    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center overflow-hidden">
            {/* Container with fixed position and center alignment */}
            <div className="w-full sm:w-[90%] md:w-[400px] lg:w-[500px] xl:w-[600px] px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10 bg-white rounded-[27px] shadow-lg flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-10">
                
                <img
                    src="/images/logo.jpeg"  // Use the path relative to the public folder
                    alt="Logo"
                    className="w-[126px] h-[126px] mb-1"  // Tailwind classes for width, height, and margin bottom
                />
                
                {/* Welcome Title and Subtitle */}
                <div className="text-center">
                    <div className="text-black text-2xl sm:text-3xl md:text-4xl font-bold font-['Urbanist']">
                        Welcome back!
                    </div>
                    <div className="text-[#9f9f9f] text-lg sm:text-xl md:text-2xl font-semibold font-['Urbanist']">
                        Log in to your account
                    </div>
                </div>

                {/* Email Input Section */}
                <div className="w-full flex flex-col justify-start items-start">
                    <label className="self-start text-black text-sm sm:text-lg md:text-xl font-bold font-['Urbanist']">Email</label>
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
                <div className="w-full flex flex-col justify-start items-start">
                    <div className="w-full flex justify-between items-center">
                        <label className="self-start text-black text-sm sm:text-lg md:text-xl font-bold font-['Urbanist']">Password</label>
                        <div
                            className="text-[#5d5fef] text-sm sm:text-base md:text-lg font-normal font-['Urbanist'] cursor-pointer"
                            onClick={() => navigate('/forgot-password')} // Navigate to Reset Password page
                        >
                            Forgot password?
                        </div>
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
