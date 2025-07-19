import React from "react";
import Modal from "../modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";

const UserModal = ({ isModalOpen, setIsModalOpen, closeModal }) => {
  // Validation schema for registration form
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone number is required"),
  });

  // Formik hook for registration form
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post(`${BaseUrl}/v1/customer`, {
          email: values.email,
          name: values.name,
          phone: values.phone,
        });

        if (response?.data?.success === true) {
          toast.success("Registration successful!", {
            position: "top-center",
            autoClose: 3000,
          });

          localStorage.setItem('userId',JSON.stringify(response?.data?.data))
          resetForm();
          closeModal();
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message;
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
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className="h-[80vh] rounded-xl overflow-y-auto px-4 w-full py-5"
    >
      <div className="space-y-4 w-full">
        <div className="flex justify-between items-center py-4">
            <h4></h4>
          <h2 className="text-2xl font-bold">User Registration</h2>
          <button
            className="h-6 w-6 bg-primary border-none rounded-full text-black text-xl cursor-pointer z-[1000] flex justify-center items-center"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 border-2  bg-transparent placeholder:text-lightGray rounded ${
                formik.touched.name && formik.errors.name
                  ? "border-lightGray2"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-lightGray2 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 border-2 bg-transparent placeholder:text-lightGray rounded ${
                formik.touched.email && formik.errors.email
                  ? "border-lightGray2"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-lightGray2 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block font-bold mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 border-2 bg-transparent placeholder:text-lightGray rounded ${
                formik.touched.phone && formik.errors.phone
                  ? "border-lightGray2"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-lightGray2 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full py-3 px-4 bg-primary text-black font-bold rounded hover:bg-opacity-90 transition ${
              formik.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {formik.isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default UserModal;