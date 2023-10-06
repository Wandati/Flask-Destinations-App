


import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Import the useUser hook

function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const { setUser } = useUser(); // Get the setUser function from UserContext

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
      fetch("http://127.0.0.1:5555/login", {
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
          // Ensure that the user data includes 'user_id'
          if (userData && userData.user_id) {
            setUser(userData);
            localStorage.setItem("id", userData.user_id);
            // Update the user state in UserContext
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
    <div>
      {loginError ? (
        <div className="text-danger">Invalid username or password</div>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-danger">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>
        <p className="forgot-password text-right">
          Don't have an account <Link to="/sign-up">Sign Up?</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

