import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiMessage, setApiMessage] = useState({ text: "", type: "" });
  const userData = JSON.parse(localStorage.getItem("userId")) || null;

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setApiMessage({ text: "", type: "" });
        
        // API call to login user
        const response = await axios.post(`${BaseUrl}/v1/customer/login`, {
          email: values.email,
          password: values.password,
        });

        if (response?.data?.success === true) {
          setApiMessage({
            text: "Login successful!",
            type: "success"
          });
          
          console.log("Login successful:", response.data);
          localStorage.setItem("userId", JSON.stringify(response.data.customer));
          navigate("/dashboard");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Login failed. Please try again.";
        setApiMessage({
          text: errorMessage,
          type: "error"
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="m-0 p-0 h-screen w-screen font-sans bg-white flex justify-center items-center overflow-x-hidden box-border">
      <div className="bg-white w-[90%] max-w-[800px] p-5 md:p-[20px] rounded-[25px] border border-black shadow-[0_0_10px_rgba(0,0,0,0.1)] box-border">
        <h1 className="text-center text-[40px] font-medium mb-[10px]">Al-Buraq</h1>
        <h2 className="text-[30px] font-bold mb-[20px] text-left">Log in</h2>

        {/* API Message Display */}
           {/* API Message Display */}
        {apiMessage.text && (
          <div className={`mb-4 p-3 rounded-md text-center ${
            apiMessage.type === "success" 
              ? "bg-[#b1f5b1] text-green border border-green" 
              : "bg-[#ecc2c2] text-red border border-red"
          }`}>
            {apiMessage.text}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          {/* Email Field */}
          <label className="font-bold mb-[5px] mt-[10px]">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`p-[10px] mb-[5px] bg-white placeholder:text-black border-2 ${
              formik.touched.email && formik.errors.email
                ? "border-darkRed"
                : "border-black"
            } text-[16px]`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-darkRed font-medium text-sm mb-2">
              {formik.errors.email}
            </p>
          )}

          {/* Password Field */}
          <div className="flex justify-between items-center mb-[5px] mt-[10px]">
            <label className="font-bold">Password</label>
            <Link
              to="/forgot-password"
              className="text-black text-[14px] font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`p-[10px] mb-[5px] w-full bg-white placeholder:text-black border-2 ${
                formik.touched.password && formik.errors.password
                  ? "border-darkRed"
                  : "border-black"
              } text-[16px]`}
            />
            <button
              type="button"
              className="absolute right-3 top-4 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                              <FaRegEye size={20} />
              
                            ) : (
                              
                              <FaRegEyeSlash size={20} />
              
                            )}
            </button>
          </div>
          
          {formik.touched.password && formik.errors.password && (
            <p className="text-darkRed font-medium text-sm mb-2">
              {formik.errors.password}
            </p>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`mt-[15px] bg-black text-white h-[45px] text-[16px] border-none cursor-pointer font-[inter] ${
              formik.isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-900"
            }`}
          >
            {formik.isSubmitting ? "Logging in..." : "Sign In"}
          </button>

          <p className="text-center text-black pt-4 text-[14px]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-black font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;