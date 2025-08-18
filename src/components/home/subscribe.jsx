import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BaseUrl } from "../../utils/BaseUrl";
import { toast } from "react-toastify";

export default function SubscribeBanner() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${BaseUrl}/v1/subscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
          }),
        });

        console.log(response);
        

        if (response.ok) {

                //  toast.error(response?.data?.message);

          resetForm();
        } else {
          
        }
      } catch (error) {
         toast.error(error.response?.data?.message);
        
      }
    },
  });

  return (
    <section className="w-full overflow-hidden pb-16 md:pb-18">
      <div className="rounded-xl max-w-6xl mx-auto min-h-[190px] shadow-lg p-4 md:p-10 flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between md:gap-10">
        <h2 className="text-black font-roboto font-semibold px-4 leading-tight text-center max-w-full break-words md:text-left md:text-3xl md:flex-1 lg:text-4xl text-xl">
          Subscribe for <br /> Latest perfumes & Offers
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className="border border-black rounded-lg p-3 w-full max-w-[440px] flex flex-col items-center gap-3 bg-transparent md:flex-row justify-between md:h-20 md:p-5"
        >
          <div className="w-full">
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
              className={`bg-transparent border rounded-md py-3 px-4 text-base font-inter text-black w-full outline-none placeholder:text-black placeholder:font-semibold ${
                formik.touched.email && formik.errors.email
                  ? "border-red focus:border-red"
                  : ""
              }`}
              placeholder="Enter your email"
            />
          
          </div>
          <button
            type="submit"
            className="bg-lightGray border-none py-3 px-5 text-base font-inter font-semibold cursor-pointer rounded-md w-full transition-all duration-300 ease-in-out hover:opacity-90 hover:-translate-y-px md:w-auto"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}