
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { api } from '../api/api';
// // import { useDispatch } from 'react-redux';
// // import { login } from '../slices/authSlice';

// // function Login() {
// //     // State variables for email, password, and error messages
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [emailError, setEmailError] = useState('');
// //     const [passwordError, setPasswordError] = useState('');
   


// //     const navigate = useNavigate(); // Hook to navigate to a different page

// //     const dispatch = useDispatch();



// //     // Handle form submission
// //     const handleSubmit = async(e) => {
// //         e.preventDefault(); // Prevent the default form submission
// //         let isValid = true;
        

// //         // Reset previous errors
// //         setEmailError('');
// //         setPasswordError('');

// //         // Email validation (basic email format check using regex)
// //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //         if (!email || !emailRegex.test(email)) {
// //             setEmailError('Please enter a valid email address');
// //             isValid = false;
// //         }

// //         // Password validation (check if password is at least 6 characters long)
// //         if (!password || password.length < 8) {
// //             setPasswordError('Password must be at least 8 characters long');
// //             isValid = false;
// //         }

// //         // If form is valid, you can proceed with the login logic (e.g., API call)
// //         if (isValid) {
// //             console.log('Logging in with', { email, password });
// //             // Add login functionality here, like calling an API

// //             try {
// //                 const response= await api.post("/admin/auth/login",{email,password},
// //                     {withCredentials: true}
// //                 )
// //                 if (response.status === 200) {
// //                     dispatch(login({ userName: response.data.username, accessToken: response.data.accessToken }));
// //                     setEmail("");
// //                     setPassword("");
// //                     navigate("/");
// //                   }
// //             } catch (error) {
// //                 console.log(error)
// //             }

// //         }
// //     };

// //     return (
// //         <div className="fixed inset-0 bg-white flex items-center justify-center overflow-hidden">
// //             {/* Container with fixed position and center alignment */}
// //             <div className="w-full sm:w-[90%] md:w-[400px] lg:w-[500px] xl:w-[600px] px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10 bg-white rounded-[27px] shadow-lg flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-10">
                
// //                 <img
// //                     src="/images/msplogo.png"  // Use the path relative to the public folder
// //                     alt="Logo"
// //                     className="w-[400px] h-[400px] mb-0.5"  // Tailwind classes for width, height, and margin bottom
// //                 />
                
// //                 {/* Welcome Title and Subtitle */}
// //                 <div className="text-center -mt-24">
// //                     <div className="text-black text-2xl sm:text-3xl md:text-4xl font-bold font-['Urbanist']">
// //                         Welcome back!
// //                     </div>
// //                     <div className="text-[#9f9f9f] text-lg sm:text-xl md:text-2xl font-semibold font-['Urbanist']">
// //                         Log in to your account
// //                     </div>
// //                 </div>

// //                 {/* Email Input Section */}
// //                 <div className="w-full flex flex-col justify-start items-start">
// //                     <label className="self-start text-black text-sm sm:text-lg md:text-xl font-bold font-['Urbanist']">Email</label>
// //                     <input
// //                         type="email"
// //                         value={email}
// //                         required
// //                         onChange={(e) => setEmail(e.target.value)}  // Update email state
// //                         className="w-full h-[45px] sm:h-[50px] md:h-[60px] px-4 py-2 rounded-[7px] border-[0.5px] border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
// //                     />
// //                     {emailError && <div className="text-red-500 text-sm mt-2">{emailError}</div>}
// //                 </div>

// //                 {/* Password Input Section */}
// //                 <div className="w-full flex flex-col justify-start items-start">
// //                     <div className="w-full flex justify-between items-center">
// //                         <label className="self-start text-black text-sm sm:text-lg md:text-xl font-bold font-['Urbanist']">Password</label>
// //                         <div
// //                             className="text-[#5d5fef] text-sm sm:text-base md:text-lg font-normal font-['Urbanist'] cursor-pointer"
// //                             onClick={() => navigate('/forgot-password')} // Navigate to Reset Password page
// //                         >
// //                             Forgot password?
// //                         </div>
// //                     </div>
               
// //                     <input
// //                         type="password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}  // Update password state
// //                         className="w-full h-[45px] sm:h-[50px] md:h-[60px] px-4 py-2 rounded-[7px] border-[0.5px] border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
// //                     />
// //                     {passwordError && <div className="text-red-500 text-sm mt-2">{passwordError}</div>}
// //                 </div>

// //                 {/* Login Button */}
// //                 <button
// //                     onClick={handleSubmit}  // Trigger form validation on button click
// //                     className="w-full px-10 py-3 sm:px-[100px] sm:py-4 md:px-[150px] md:py-4 bg-[#5d5fef] rounded-[7px] text-white text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']"
// //                 >
// //                     Log in
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { api } from '../api/api';
// import { useDispatch } from 'react-redux';
// import { login } from '../slices/authSlice';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let isValid = true;

//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email || !emailRegex.test(email)) {
//             setEmailError('Please enter a valid email address');
//             isValid = false;
//         }

//         if (!password || password.length < 8) {
//             setPasswordError('Password must be at least 8 characters long');
//             isValid = false;
//         }

//         if (isValid) {
//             try {
//                 const response = await api.post("/admin/auth/login", { email, password }, {
//                     withCredentials: true
//                 });
//                 if (response.status === 200) {
//                     dispatch(login({ userName: response.data.username, accessToken: response.data.accessToken }));
//                     setEmail("");
//                     setPassword("");
//                     setLoginError("");
//                     navigate("/");
//                 }
//             } catch (error) {
//                 setLoginError("Invalid Email or Password");
//             }
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-yellow-600 flex items-center justify-center overflow-hidden h-200">
//             <div className="w-full sm:w-[90%] md:w-[100px] lg:w-[500px] xl:w-[600px] px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10 mt-10 bg-pink-600 h-200  style-fixed rounded-[27px] shadow-lg flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-10">
                
//                 {loginError && (
//                     <div className="w-full bg-blue-500 text-red-700 px-4 py-2 rounded-md text-center text-sm font-semibold">
//                         {loginError}
//                     </div>
//                 )}

//                 <img
//                     src="/images/msplogo.png"
//                     alt="Logo"
//                     className="w-[400px] h-[400px] mb-0.5"
//                 />
                
//                 <div className="text-center -mt-24">
//                     <div className="text-black text-2xl sm:text-3xl md:text-4xl font-bold font-['Urbanist']">
//                         Welcome back!
//                     </div>
//                     <div className="text-[#9f9f9f] text-lg sm:text-xl md:text-2xl font-semibold font-['Urbanist']">
//                         Log in to your account
//                     </div>
//                 </div>

//                 <div className="w-full flex flex-col justify-start items-start">
//                     <label className="self-start text-black text-sm sm:text-lg md:text-xl font-bold font-['Urbanist']">Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         required
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full h-[45px] sm:h-[50px] md:h-[60px] px-4 py-2 rounded-[7px] border-[0.5px] border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
//                     />
//                     {emailError && <div className="text-red-500 text-sm mt-2">{emailError}</div>}
//                 </div>

//                 <div className="w-full flex flex-col justify-start items-start">
//                     <div className="w-full flex justify-between items-center">
//                         <label className="self-start text-black text-sm sm:text-lg md:text-xl font-bold font-['Urbanist']">Password</label>
//                         <div
//                             className="text-[#5d5fef] text-sm sm:text-base md:text-lg font-normal font-['Urbanist'] cursor-pointer"
//                             onClick={() => navigate('/forgot-password')}
//                         >
//                             Forgot password?
//                         </div>
//                     </div>

//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full h-[45px] sm:h-[50px] md:h-[60px] px-4 py-2 rounded-[7px] border-[0.5px] border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
//                     />
//                     {passwordError && <div className="text-red-500 text-sm mt-2">{passwordError}</div>}
//                 </div>

//                 <button
//                     onClick={handleSubmit}
//                     className="w-full px-10 py-3 sm:px-[100px] sm:py-4 md:px-[150px] md:py-4 bg-[#5d5fef] rounded-[7px] text-white text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']"
//                 >
//                     Log in
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { api } from '../api/api';
// import { useDispatch } from 'react-redux';
// import { login } from '../slices/authSlice';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let isValid = true;

//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email || !emailRegex.test(email)) {
//             setEmailError('Please enter a valid email address');
//             isValid = false;
//         }

//         if (!password || password.length < 8) {
//             setPasswordError('Password must be at least 8 characters long');
//             isValid = false;
//         }

//         if (isValid) {
//             try {
//                 const response = await api.post("/admin/auth/login", { email, password }, {
//                     withCredentials: true
//                 });
//                 if (response.status === 200) {
//                     dispatch(login({ userName: response.data.username, accessToken: response.data.accessToken }));
//                     setEmail("");
//                     setPassword("");
//                     setLoginError("");
//                     navigate("/");
//                 }
//             } catch (error) {
//                 setLoginError("Invalid Email or Password");
//             }
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-yellow-600 flex items-center justify-center">
//             <div className="bg-pink-600 rounded-[27px] shadow-lg w-[666px] h-[723px] px-[67px] pt-[78px] pb-[78px] flex flex-col items-center gap-[54px]">
                
//                 <img
//                     src="/images/msplogo.png"
//                     alt="Logo"
//                     className="w-[200px] h-[200px]"
//                 />

//                 <div className="text-center w-full">
//                     <div className="text-black text-3xl font-bold font-['Urbanist']">
//                         Welcome back!
//                     </div>
//                     <div className="text-[#9f9f9f] text-xl font-semibold font-['Urbanist']">
//                         Log in to your account
//                     </div>
//                     {loginError && (
//                         <div className="bg-red-100 text-red-700 px-4 py-2 mt-4 rounded-md text-center text-sm font-semibold">
//                             {loginError}
//                         </div>
//                     )}
//                 </div>

//                 <div className="w-full flex flex-col items-start">
//                     <label className="text-black text-lg font-bold font-['Urbanist']">Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         required
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full h-[50px] px-4 py-2 rounded-[7px] border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
//                     />
//                     {emailError && <div className="text-red-500 text-sm mt-2">{emailError}</div>}
//                 </div>

//                 <div className="w-full flex flex-col items-start">
//                     <div className="w-full flex justify-between items-center">
//                         <label className="text-black text-lg font-bold font-['Urbanist']">Password</label>
//                         <div
//                             className="text-[#5d5fef] text-base font-normal font-['Urbanist'] cursor-pointer"
//                             onClick={() => navigate('/forgot-password')}
//                         >
//                             Forgot password?
//                         </div>
//                     </div>

//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full h-[50px] px-4 py-2 rounded-[7px] border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
//                     />
//                     {passwordError && <div className="text-red-500 text-sm mt-2">{passwordError}</div>}
//                 </div>

//                 <button
//                     onClick={handleSubmit}
//                     className="w-full py-3 bg-[#5d5fef] rounded-[7px] text-white text-xl font-bold font-['Urbanist']"
//                 >
//                     Log in
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { api } from '../api/api';
// import { useDispatch } from 'react-redux';
// import { login } from '../slices/authSlice';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let isValid = true;

//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email || !emailRegex.test(email)) {
//             setEmailError('Please enter a valid email address');
//             isValid = false;
//         }

//         if (!password || password.length < 8) {
//             setPasswordError('Password must be at least 8 characters long');
//             isValid = false;
//         }

//         if (isValid) {
//             try {
//                 const response = await api.post("/admin/auth/login", { email, password }, {
//                     withCredentials: true
//                 });
//                 if (response.status === 200) {
//                     dispatch(login({ userName: response.data.username, accessToken: response.data.accessToken }));
//                     setEmail("");
//                     setPassword("");
//                     setLoginError("");
//                     navigate("/");
//                 }
//             } catch (error) {
//                 setLoginError("Invalid Email or Password");
//             }
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-yellow-600 flex items-center justify-center">
//             <div className="bg-pink-600 rounded-[27px] shadow-lg w-[666px] h-[723px] px-[67px] pt-[78px] pb-[78px] flex flex-col items-center justify-between">
//                 <div className="flex flex-col items-center gap-[30px] w-full">

//                     <img
//                         src="/images/msplogo.png"
//                         alt="Logo"
//                         className="w-[200px] h-[200px]"
//                     />

//                     <div className="text-center w-full">
//                         <div className="text-black text-3xl font-bold font-['Urbanist']">
//                             Welcome back!
//                         </div>
//                         <div className="text-[#9f9f9f] text-xl font-semibold font-['Urbanist']">
//                             Log in to your account
//                         </div>

//                         {/* Fixed Height for Error Message */}
//                         <div className="min-h-[40px] mt-2">
//                             {loginError && (
//                                 <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-semibold">
//                                     {loginError}
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="w-full flex flex-col items-start">
//                         <label className="text-black text-lg font-bold font-['Urbanist']">Email</label>
//                         <input
//                             type="email"
//                             value={email}
//                             required
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full h-[50px] px-4 py-2 rounded-[7px] border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
//                         />
//                         {emailError && <div className="text-red-500 text-sm mt-2">{emailError}</div>}
//                     </div>

//                     <div className="w-full flex flex-col items-start">
//                         <div className="w-full flex justify-between items-center">
//                             <label className="text-black text-lg font-bold font-['Urbanist']">Password</label>
//                             <div
//                                 className="text-[#5d5fef] text-base font-normal font-['Urbanist'] cursor-pointer"
//                                 onClick={() => navigate('/forgot-password')}
//                             >
//                                 Forgot password?
//                             </div>
//                         </div>

//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full h-[50px] px-4 py-2 rounded-[7px] border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
//                         />
//                         {passwordError && <div className="text-red-500 text-sm mt-2">{passwordError}</div>}
//                     </div>
//                 </div>

//                 <button
//                     onClick={handleSubmit}
//                     className="w-full py-3 bg-[#5d5fef] rounded-[7px] text-white text-xl font-bold font-['Urbanist'] mt-6"
//                 >
//                     Log in
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { api } from '../api/api';
// import { useDispatch } from 'react-redux';
// import { login } from '../slices/authSlice';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let isValid = true;

//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email || !emailRegex.test(email)) {
//             setEmailError('Please enter a valid email address');
//             isValid = false;
//         }

//         if (!password || password.length < 8) {
//             setPasswordError('Password must be at least 8 characters long');
//             isValid = false;
//         }

//         if (isValid) {
//             try {
//                 const response = await api.post("/admin/auth/login", { email, password }, {
//                     withCredentials: true
//                 });
//                 if (response.status === 200) {
//                     dispatch(login({ userName: response.data.username, accessToken: response.data.accessToken }));
//                     setEmail("");
//                     setPassword("");
//                     setLoginError("");
//                     navigate("/");
//                 }
//             } catch (error) {
//                 setLoginError("Invalid Email or Password");
//             }
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-white flex items-center justify-center">
//             <div className="bg-[#FFFFFF] rounded-[27px] shadow-lg w-[666px] h-[723px] px-[67px] pt-[78px] pb-[78px] flex flex-col justify-between">
                
//                 {/* Top Content */}
//                 <div className="flex flex-col items-center  w-full flex-grow">
//                     <img
//                         src="/images/msplogo.png"
//                         alt="Logo"
//                         className="w-[200px] h-[200px]"
//                     />

//                     <div className="text-center w-full">
//                         <div className="text-black text-3xl font-bold font-['Urbanist']">
//                             Welcome back!
//                         </div>
//                         <div className="text-[#9f9f9f] text-xl font-semibold font-['Urbanist']">
//                             Log in to your account
//                         </div>

//                         {/* Fixed Height for Login Error */}
//                         <div className="min-h-[40px] mt-2">
//                             {loginError && (
//                                 <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-semibold">
//                                     {loginError}
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Email Field */}
//                     <div className="w-full flex flex-col items-start">
//                         <label className="text-black text-lg font-bold font-['Urbanist']">Email</label>
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full h-[50px] px-4 py-2 rounded-[7px] border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
//                         />
//                         <div className="min-h-[24px]">
//                             {emailError && <div className="text-red-500 text-sm mt-2">{emailError}</div>}
//                         </div>
//                     </div>

//                     {/* Password Field */}
//                     <div className="w-full flex flex-col items-start">
//                         <div className="w-full flex justify-between items-center">
//                             <label className="text-black text-lg font-bold font-['Urbanist']">Password</label>
//                             <div
//                                 className="text-[#5d5fef] text-base font-normal font-['Urbanist'] cursor-pointer"
//                                 onClick={() => navigate('/forgot-password')}
//                             >
//                                 Forgot password?
//                             </div>
//                         </div>

//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full h-[50px] px-4 py-2 rounded-[7px] border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
//                         />
//                         <div className="min-h-[24px]">
//                             {passwordError && <div className="text-red-500 text-sm mt-2">{passwordError}</div>}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Login Button pinned to bottom of pink box */}
//                 <button
//                     onClick={handleSubmit}
//                     className="w-full py-3 bg-[#5d5fef] rounded-[7px] text-white text-xl font-bold font-['Urbanist']"
//                 >
//                     Log in
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

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

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setLoginError('');
                            }}
                            className="w-full h-[50px] px-4 py-2 rounded-[7px] border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef]"
                        />
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
