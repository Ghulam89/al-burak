import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email);

    if (user) {
      setMessage(`Password reset link has been sent to ${email} (Demo).`);
    } else {
      setMessage('Email not found. Please check and try again.');
    }
  };

  return (
    <div className="m-0 p-0 h-screen w-screen font-sans bg-black flex justify-center items-center overflow-x-hidden box-border">
      <div className="bg-[#E5D0A5] w-[90%] max-w-[800px] p-5 md:p-6 rounded-[30px] shadow-[0_0_10px_rgba(0,0,0,0.3)] box-border">
        <h1 className="text-center text-[40px] mb-2.5">Al-Buraq</h1>
        <h2 className="text-[30px] font-bold mb-5 text-left">Forgot Password</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="font-bold mb-1.5 mt-2.5">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2.5 mb-2.5 bg-[#E5D0A5] border border-black text-base"
          />
          
          <button 
            type="submit" 
            className="mt-4 p-2.5 bg-black text-white h-10 text-base border-none cursor-pointer hover:bg-gray-800 transition-colors"
          >
            Reset Password
          </button>
        </form>
        
        {message && (
          <p className={`mt-4 text-center text-base ${message.includes('sent') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        
        <p className="mt-4 text-center font-medium">
          Don't have an account?{' '}
          <Link to="/signup" className=" text-black hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;