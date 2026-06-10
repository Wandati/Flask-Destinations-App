import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate(); 
  const [signupSuccess, setSignupSuccess] = useState(false);

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    username: yup.string().required("Must enter a username").max(15),
    password: yup
      .string()
      .required("Must enter a password")
      .min(6, "Password must be at least 6 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((res) => {
          if (res.status === 201) {
            setSignupSuccess(true); 
            setTimeout(() => {
              navigate("/sign-in"); 
            }, 3000); 
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  return (
    <div>
    <section className="flex justify-center py-8 sm:py-14">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-xl md:grid-cols-2">
        <div className="px-5 py-8 sm:px-8 lg:px-10">
          <p className="mb-2 text-sm font-semibold uppercase text-[#0b6b2b]">Create account</p>
          <h1 className="text-3xl font-bold text-slate-900">Sign up</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Create an account to leave destination reviews.
          </p>

          {signupSuccess ? (
        <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">Sign-up successful! Redirecting to sign-in...</div>
      ) : null}

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-8">
           <label className="font-semibold text-slate-700" htmlFor="username">Username</label>
            <input  className="form-input"
             id="username"
            name="username"
            type="text"
            placeholder="Username"
            onChange={formik.handleChange}
            value={formik.values.username}
           />
           {formik.touched.username && formik.errors.username ? (
            <div className="text-red-900">{formik.errors.username}</div>
          ) : null}
          <label className="font-semibold text-slate-700" htmlFor="email">Email address</label>
          <input className="form-input"
            id="email"
            name="email"
            type="text"
            placeholder="email address" 
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-900">{formik.errors.email}</div>
          ) : null}
          <label className="font-semibold text-slate-700" htmlFor="password">Password</label>
          <div>
          <input className="form-input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-900">{formik.errors.password}</div>
          ) : null}

          <button type="submit" className="primary-button mt-2 w-full">
            SignUp
          </button>
          </form>

          <div className="mt-8 grid grid-cols-3 items-center gap-3 text-gray-400">
            <hr></hr>
            <p className="text-center">OR</p>
            <hr></hr>
          </div>
          <div className="my-6">
           <p className="text-sm text-slate-600 sm:text-base">
            Already registered?
            <Link className='ml-2 font-semibold text-[#0b6b2b] hover:underline' to="/sign-in">LogIn</Link>
           </p>
          </div>

        </div>

        <div className="hidden md:block">
          <img className="h-full w-full object-cover" src="https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt ="Kenya coastline"/>
        </div>

      </div>
      </section>


    </div>
  );
}

export default Signup;
