import React, { act } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "./schemas";
import "./FormValidation.css";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const FormValidation = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,

      onSubmit: (values, action) => {
        console.log(values);

        action.resetForm();
      },
    });

  console.log(errors);

  function handlebutton() {
    return (
      values.name && values.email && values.password && values.confirm_password
    );
  }
  return (
    <>
      <section className="abcsec section">
        <div className="container">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
                <h1 className="title">Welcome!</h1>

                <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label htmlFor="name" className="input-label">
                      Name
                    </label>
                    <input
                      type="name"
                      autoComplete="off"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></input>
                    {errors.name && touched.name ? (
                      <p className="form-error">{errors.name}</p>
                    ) : null}
                  </div>

                  <div className="input-block">
                    <label htmlFor="email" className="input-label">
                      Email
                    </label>
                    <input
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></input>

                    {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></input>
                    {errors.password && touched.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="confirm_password" className="input-label">
                      Confirm_Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="Confirm password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></input>

                    {errors.confirm_password && touched.confirm_password ? (
                      <p className="form-error">{errors.confirm_password}</p>
                    ) : null}
                  </div>
                  <div className="modal-buttons">
                    <button
                      className="input-button"
                      type="submit"
                      disabled={!handlebutton()}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
              <div className="modal-right">
                <img src="https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormValidation;
