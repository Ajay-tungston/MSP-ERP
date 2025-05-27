import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import { Eye, EyeOff } from "lucide-react";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        setEmailError('');
        setPasswordError('');
        setLoginError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        }

        if (!password || password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await api.post("/admin/auth/login", { email, password }, {
                    withCredentials: true
                });
                if (response.status === 200) {
                    dispatch(login({ userName: response.data.username, accessToken: response.data.accessToken }));
                    setEmail("");
                    setPassword("");
                    setLoginError("");
                    navigate("/");
                    localStorage.setItem("userName", response.data.username)
                }
            } catch (error) {
                setLoginError("Invalid Email or Password");
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center">
            <div className="bg-[#FFFFFF] rounded-[27px] shadow-[0_0_20px_rgba(0,0,0,0.15)] w-[491px] h-[648px] px-[67px] pt-[35px] pb-[39px] flex flex-col justify-between">

                {/* Top Content */}
                <div className="flex flex-col items-center w-full flex-grow">
                    <img
                        src="/images/msplogo.png"
                        alt="Logo"
                        className="w-[200px] h-[200px]"
                    />

                    <div className="text-center w-full">
                        <div className="text-black text-3xl font-bold font-['Urbanist']">
                            Welcome back!
                        </div>
                        <div className="text-[#9f9f9f] text-xl font-semibold font-['Urbanist']">
                            Log in to your account
                        </div>

                        {/* Fixed Height for Login Error */}
                        <div className="min-h-[40px] mt-2">
                            {loginError && (
                                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-semibold">
                                    {loginError}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="w-full flex flex-col items-start">
                        <label className="text-black text-lg font-bold font-['Urbanist']">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setLoginError('');
                            }}
                            className="w-full h-[50px] px-4 py-2 rounded-[7px] border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
                        />
                        <div className="min-h-[24px]">
                            {emailError && <div className="text-red-500 text-sm mt-2">{emailError}</div>}
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="w-full flex flex-col items-start">
  <div className="w-full flex justify-between items-center">
    <label className="text-black text-lg font-bold font-['Urbanist']">Password</label>
    <div
      className="text-[#5d5fef] text-base font-normal font-['Urbanist'] cursor-pointer"
      onClick={() => navigate('/forgot-password')}
    >
      Forgot password?
    </div>
  </div>

  <div className="w-full relative">
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => {
        setPassword(e.target.value);
        setLoginError('');
      }}
      className="w-full h-[50px] px-4 py-2 pr-12 rounded-[7px] border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
    />
    <div
      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </div>
  </div>

  <div className="min-h-[24px]">
    {passwordError && <div className="text-red-500 text-sm mt-2">{passwordError}</div>}
  </div>
</div>

                </div>

                {/* Login Button pinned to bottom of pink box */}
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-[#5d5fef] rounded-[7px] text-white text-xl font-bold font-['Urbanist']"
                >
                    Log in
                </button>
            </div>
        </div>
    );
}

export default Login;