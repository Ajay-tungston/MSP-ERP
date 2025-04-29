// //
// import React, { useEffect, useState } from "react";
// import { api } from "../api/api";
// import { useNavigate } from "react-router-dom";

// function ResetPassword() {
//   // State to store the new password and confirm password
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,32}$/;

//   useEffect(() => {
//     const checkResetToken = async () => {
//       try {
//         const response = await api.get("/admin/auth/check-reset-token", {
//           withCredentials: true,
//         });
//       } catch (error) {
//         console.log(error);
//         navigate("/login");
//       }
//     };
//     checkResetToken();
//   }, []);

//   // Handle the change for the new password input
//   const handleNewPasswordChange = (e) => {
//     setNewPassword(e.target.value);
//   };

//   // Handle the change for the confirm password input
//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!passwordRegex.test(newPassword)) {
//       setError(
//         "Password must be 8-32 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
//       );
//       return;
//     }
//     // Check if the passwords match
//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match!");
//     } else {
//       setError("");
//       // Here you can add further logic for handling password reset (e.g., making an API call)
//       console.log("Password has been successfully reset");
//       try {
//         const response = await api.post(
//           "/admin/auth/reset-password",
//           { newPassword },
//           { withCredentials: true }
//         );
//         console.log(response);
//         navigate("/login");
//       } catch (error) {
//         console.log(error);
//         setError("Failed to reset password");
//       }
//     }
//   };

//   return (
//     <div className="w-full h-screen bg-white overflow-hidden flex items-center justify-center px-4">
//       <div className="w-full sm:w-[90%] md:w-[500px] lg:w-[600px] px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 bg-white rounded-xl shadow-xl outline-offset-[-0.25px] outline-black inline-flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-10">
//         <img
//           src="/images/logo.jpeg"
//           alt="Logo"
//           className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] mb-4"
//         />

//         {/* Welcome Title and Subtitle */}
//         <div className="text-center">
//           <div className="text-black text-3xl sm:text-4xl font-bold font-['Urbanist']">
//             Rest your password
//           </div>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="w-full flex flex-col justify-start items-start gap-4"
//         >
//           {/* New password Input Section */}
//           <div className="w-full flex flex-col justify-start items-start gap-2">
//             <label className="self-start text-black text-lg sm:text-xl font-bold font-['Urbanist']">
//               New password
//             </label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={handleNewPasswordChange}
//               placeholder="Enter new password"
//               className="w-full h-[45px] sm:h-[50px] px-4 py-2 rounded-md border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef] text-sm sm:text-base"
//             />
//           </div>

//           {/* Confirm Password Input Section */}
//           <div className="w-full flex flex-col justify-start items-start gap-2">
//             <label className="self-start text-black text-lg sm:text-xl font-bold font-['Urbanist']">
//               Confirm new Password
//             </label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={handleConfirmPasswordChange}
//               placeholder="Confirm new password"
//               className="w-full h-[45px] sm:h-[50px] px-4 py-2 rounded-md border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef] text-sm sm:text-base"
//             />
//           </div>

//           {/* Error Message */}
//           {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full px-10 py-3 sm:px-[100px] sm:py-4 bg-[#5d5fef] rounded-md text-white text-lg sm:text-xl font-bold font-['Urbanist'] hover:bg-[#4a4fdf] focus:outline-none focus:ring-2 focus:ring-[#5d5fef] transition-all"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;

// import React, { useEffect, useState } from "react";
// import { api } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";


// function ResetPassword() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,32}$/;

//   useEffect(() => {
//     const checkResetToken = async () => {
//       try {
//         await api.get("/admin/auth/check-reset-token", {
//           withCredentials: true,
//         });
//       } catch (error) {
//         console.log(error);
//         navigate("/login");
//       }
//     };
//     checkResetToken();
//   }, []);

//   const handleNewPasswordChange = (e) => {
//     setNewPassword(e.target.value);
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!passwordRegex.test(newPassword)) {
//       setError(
//         "Password must be 8-32 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
//       );
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match!");
//     } else {
//       setError("");
//       try {
//         await api.post(
//           "/admin/auth/reset-password",
//           { newPassword },
//           { withCredentials: true }
//         );
//         // toast.success("Password reset successful. You’re good to go!");
//         toast('🦄 Wow so easy!', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           // transition: Bounce,
//           });
//         // navigate("/login");
//       } catch (error) {
//         console.log(error);
//         setError("Failed to reset password");
//       }
//     }
//   };

//   return (
//     <div className="w-full h-screen bg-white overflow-hidden flex items-center justify-center px-4">
//       <div className="w-full sm:w-[90%] md:w-[500px] lg:w-[600px] px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 bg-white rounded-xl shadow-xl outline-offset-[-0.25px] outline-black inline-flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-10">
//         <img
//           src="/images/logo.jpeg"
//           alt="Logo"
//           className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] mb-4"
//         />

//         <div className="text-center">
//           <div className="text-black text-3xl sm:text-4xl font-bold font-['Urbanist']">
//             Reset your password
//           </div>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="w-full flex flex-col justify-start items-start gap-4"
//         >
//           <div className="w-full flex flex-col justify-start items-start gap-2">
//             <label className="self-start text-black text-lg sm:text-xl font-bold font-['Urbanist']">
//               New password
//             </label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={handleNewPasswordChange}
//               placeholder="Enter new password"
//               className="w-full h-[45px] sm:h-[50px] px-4 py-2 rounded-md border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef] text-sm sm:text-base"
//             />
//           </div>

//           <div className="w-full flex flex-col justify-start items-start gap-2">
//             <label className="self-start text-black text-lg sm:text-xl font-bold font-['Urbanist']">
//               Confirm new Password
//             </label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={handleConfirmPasswordChange}
//               placeholder="Confirm new password"
//               className="w-full h-[45px] sm:h-[50px] px-4 py-2 rounded-md border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef] text-sm sm:text-base"
//             />
//           </div>

//           {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

//           <button
//             type="submit"
//             className="w-full px-10 py-3 sm:px-[100px] sm:py-4 bg-[#5d5fef] rounded-md text-white text-lg sm:text-xl font-bold font-['Urbanist'] hover:bg-[#4a4fdf] focus:outline-none focus:ring-2 focus:ring-[#5d5fef] transition-all"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;

import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,32}$/;

  useEffect(() => {
    const checkResetToken = async () => {
      try {
        await api.get("/admin/auth/check-reset-token", {
          withCredentials: true,
        });
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };
    checkResetToken();
  }, []);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password with regex
    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be 8-32 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      try {
        // Make API call to reset the password
        await api.post(
          "/admin/auth/reset-password",
          { newPassword },
          { withCredentials: true }
        );
        
        // Show success toast message with tick symbol
        toast.success("Password reset successful. You’re good to go!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        // Navigate to login page after successful reset
        navigate("/login");
      } catch (error) {
        console.log(error);
        setError("Failed to reset password");
      }
    }
  };

  return (
    <div className="w-full h-screen bg-white overflow-hidden flex items-center justify-center px-4">
      <div className="w-full sm:w-[90%] md:w-[500px] lg:w-[600px] px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 bg-white rounded-xl shadow-xl outline-offset-[-0.25px] outline-black inline-flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-10">
        <img
          src="/images/logo.jpeg"
          alt="Logo"
          className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] mb-4"
        />

        <div className="text-center">
          <div className="text-black text-3xl sm:text-4xl font-bold font-['Urbanist']">
            Reset your password
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-start items-start gap-4"
        >
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <label className="self-start text-black text-lg sm:text-xl font-bold font-['Urbanist']">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Enter new password"
              className="w-full h-[45px] sm:h-[50px] px-4 py-2 rounded-md border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef] text-sm sm:text-base"
            />
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-2">
            <label className="self-start text-black text-lg sm:text-xl font-bold font-['Urbanist']">
              Confirm new Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm new password"
              className="w-full h-[45px] sm:h-[50px] px-4 py-2 rounded-md border border-[#8b8b8b] focus:outline-none focus:ring-2 focus:ring-[#5d5fef] text-sm sm:text-base"
            />
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <button
            type="submit"
            className="w-full px-10 py-3 sm:px-[100px] sm:py-4 bg-[#5d5fef] rounded-md text-white text-lg sm:text-xl font-bold font-['Urbanist'] hover:bg-[#4a4fdf] focus:outline-none focus:ring-2 focus:ring-[#5d5fef] transition-all"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
