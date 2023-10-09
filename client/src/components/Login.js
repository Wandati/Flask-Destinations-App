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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Sign In</h3>
              {loginError ? (
                <div className="alert alert-danger">Invalid username or password</div>
              ) : null}
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className={`form-control ${
                      formik.touched.username && formik.errors.username ? "is-invalid" : ""
                    }`}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="invalid-feedback">{formik.errors.username}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password ? "is-invalid" : ""
                    }`}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                </div>
              </form>
              <p className="mt-3 text-center">
                Don't have an account? <Link to="/sign-up">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

