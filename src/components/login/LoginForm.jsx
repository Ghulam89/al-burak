import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";

const LoginForm = () => {
  const navigate = useNavigate();

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
        // API call to login user
        const response = await axios.post(`${BaseUrl}/v1/customer/login`, {
          email: values.email,
          password: values.password,
        });

        if (response?.data?.success === true) {
          toast.success("Login successful!", {
            position: "top-center",
            autoClose: 3000,
          });

          console.log("Login successful:", response.data);
          
          
          localStorage.setItem("userId", JSON.stringify(response.data.customer));
          setTimeout(() => navigate("/"), 1000);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Login failed. Please try again.";
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
    <div className="m-0 p-0 h-screen w-screen font-sans bg-black flex justify-center items-center overflow-x-hidden box-border">
      <div className="bg-[#E5D0A5] w-[90%] max-w-[800px] p-5 md:p-[20px] rounded-[30px] shadow-[0_0_10px_rgba(0,0,0,0.3)] box-border">
        <h1 className="text-center text-[40px] font-medium mb-[10px]">Al-Buraq</h1>
        <h2 className="text-[30px] font-bold mb-[20px] text-left">Log in</h2>

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
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`p-[10px] mb-[5px] bg-[#E5D0A5] placeholder:text-black border-2 ${
              formik.touched.password && formik.errors.password
                ? "border-darkRed"
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
            className={`mt-[15px] bg-black text-primary h-[45px] text-[16px] border-none cursor-pointer font-[inter] ${
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