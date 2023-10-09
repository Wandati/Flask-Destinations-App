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
      fetch("http://127.0.0.1:5555/signup", {
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {signupSuccess ? (
            <div className="alert alert-success">Sign-up successful! Redirecting to sign-in...</div>
          ) : null}
          <form onSubmit={formik.handleSubmit} className="mb-4">
            <h3 className="mb-4">Sign Up</h3>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className={`form-control ${formik.errors.username ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="invalid-feedback">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="text"
                className={`form-control ${formik.errors.email ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
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
                className={`form-control ${formik.errors.password ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="mt-3">
              Already registered? <Link to="/sign-in">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;