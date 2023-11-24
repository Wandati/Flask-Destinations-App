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
      fetch("https://destinations-server-app.onrender.com/login", {
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
            alert(`login successful! Welcome ${userData.username}`);
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
    <section className="flex items-centre justify-center my-40	">
      <div className="flex rounded-2xl shadow-lg max-w-3xl p-5">
        <div className="sm:w-1/2 px-8">
          <h2 className="font-bold text-2xl text-[#1a3813] "> Login </h2>
          {loginError ? (
            <div className="text-red-800 mt-5">
              Invalid username or password
            </div>
          ) : null}

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 mt-8"
          >
            <label htmlFor="username">Username</label>
            <input
              className="p-2 rounded-xl border w-full"
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
            <label htmlFor="password">Password</label>
            <div>
              <input
                className="p-2 rounded-xl border w-full"
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
              className="bg-[#007423] rounded-xl text-white py-2"
            >
              Login
            </button>
          </form>

          <div className="mt-10 grid grid-cols-3 items-centre text-gray-500">
            <hr></hr>
            <p className="text-center">OR</p>
            <hr></hr>
          </div>
          <div className="flex justify-between item centre gap-6 my-8">
            <p>
              Don't have an account?
              <Link
                className=" hover:bg-[#007423]  px-4 py-3 rounded-lg transition "
                to="/sign-up"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className=" sm:block hidden w-1/2 ">
          <img
            className=" rounded-2xl h-full"
            src="https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
