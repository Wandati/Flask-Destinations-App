import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

function Login() {
  const navigate = useNavigate(); // Use useNavigate hook to handle navigation
  const [loginError, setLoginError] = useState(false);

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
            navigate("/"); // Use navigate to go to the home page
          } else {
            setLoginError(true);
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
