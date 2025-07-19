import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";

const SignupForm = () => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be at least 10 digits")
      .max(15, "Must be 15 digits or less"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase, one lowercase, one number and one special character"
      ),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // API call to register user
        const response = await axios.post(`${BaseUrl}/v1/user`, {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          role: "admin",
        });

        if (response?.data?.success === true) {
          toast.success(response?.data?.message, {
            position: "top-center",
            autoClose: 3000,
          });
          resetForm();
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (error) {
        
        const errorMessage =
          error.response?.data?.message
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="m-0 p-0 py-5 font-sans bg-black flex justify-center items-center box-border">
      <div className="bg-[#E5D0A5] w-[90%] max-w-[800px] p-5 md:p-[20px] rounded-[30px] shadow-[0_0_10px_rgba(0,0,0,0.3)] box-border">
        <h1 className="text-center text-[40px] font-semibold mb-[10px] font-[inter]">
          Al-Buraq
        </h1>
        <h2 className="text-[30px] font-bold mb-[20px] text-left font-[inter]">
          Create Account
        </h2>

        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          {/* Name Field */}
          <label className="font-bold mb-[5px] mt-[10px]">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`p-[10px] mb-[5px] bg-[#E5D0A5]  placeholder:text-black border-2 ${
              formik.touched.name && formik.errors.name
                ? " border-darkRed"
                : "border-black"
            } text-[16px]`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-darkRed font-medium text-sm mb-2">
              {formik.errors.name}
            </p>
          )}

          {/* Email Field */}
          <label className="font-bold mb-[5px] mt-[10px]">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`p-[10px] mb-[5px] bg-[#E5D0A5] placeholder:text-black border-2 ${
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

          {/* Phone Field */}
          <label className="font-bold mb-[5px] mt-[10px]">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`p-[10px] mb-[5px] bg-[#E5D0A5] placeholder:text-black border-2 ${
              formik.touched.phone && formik.errors.phone
                ? "border-darkRed"
                : "border-black"
            } text-[16px]`}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-darkRed font-medium text-sm mb-2">
              {formik.errors.phone}
            </p>
          )}

          {/* Password Field */}
          <label className="font-bold mb-[5px] mt-[10px]">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`p-[10px] mb-[5px] bg-[#E5D0A5] placeholder:text-black border-2 ${
              formik.touched.password && formik.errors.password
                ? "  border-darkRed"
                : "border-black"
            } text-[16px]`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-darkRed font-medium text-sm mb-2">
              {formik.errors.password}
            </p>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`mt-[15px] p-[10px] font-[inter] bg-black  text-primary h-[45px] text-[16px] border-none cursor-pointer hover:bg-gray-800 transition-colors ${
              formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {formik.isSubmitting ? "Processing..." : "Submit"}
          </button>
           <p className="text-center text-black pt-4 text-[14px]">
             Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
