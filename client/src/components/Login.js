import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const { setUser } = useUser();

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username"),
    password: yup
      .string()
      .required("Must enter a password")
      .min(6, "Password must be at least 6 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            setLoginError(true);
            throw new Error("Login failed");
          }
        })
        .then((userData) => {
          if (userData && userData.user_id) {
            setUser(userData);
            localStorage.setItem("id", userData.user_id);
            navigate("/");
          } else {
            console.error("User data is missing 'user_id'");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  return (
    <section className="flex justify-center py-8 sm:py-14">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-xl md:grid-cols-2">
        <div className="px-5 py-8 sm:px-8 lg:px-10">
          <p className="mb-2 text-sm font-semibold uppercase text-[#0b6b2b]">Welcome back</p>
          <h1 className="text-3xl font-bold text-slate-900">Log in</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Continue reviewing and managing your destination feedback.
          </p>
          {loginError ? (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">
              Invalid username or password
            </div>
          ) : null}

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 mt-8"
          >
            <label className="font-semibold text-slate-700" htmlFor="username">Username</label>
            <input
              className="form-input"
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
            <label className="font-semibold text-slate-700" htmlFor="password">Password</label>
            <div>
              <input
                className="form-input"
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

            <button
              type="submit"
              className="primary-button mt-2 w-full"
            >
              Login
            </button>
          </form>

          <div className="mt-8 grid grid-cols-3 items-center gap-3 text-gray-400">
            <hr></hr>
            <p className="text-center">OR</p>
            <hr></hr>
          </div>
          <div className="my-6">
            <p className="text-sm text-slate-600 sm:text-base">
              Don't have an account?
              <Link
                className="ml-2 font-semibold text-[#0b6b2b] hover:underline"
                to="/sign-up"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:block">
          <img
            className="h-full w-full object-cover"
            src="https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Kenya coastline"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
