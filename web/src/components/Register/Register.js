import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "./RegisterStyles.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [dob, setDob] = useState(Date.now());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [{ apiKey }, dispatch] = useStateValue();
  const history = useHistory();
  const alert = useAlert();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneValid = /^[0-9]{10}$/;
  const passwordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const [errorBool, setErrorBool] = useState(false);

  useEffect(() => {
    validateForm();
  }, [phone, email, password]);
  const validateForm = () => {
    const emailTest = emailValid.test(email);
    const phoneTest = phoneValid.test(phone);
    const passwordTest = passwordValid.test(password);
    if (emailTest) {
      setEmailError("");
    } else {
      setEmailError("Email Badly Formated");
    }
    if (passwordTest) {
      setPasswordError("");
    } else {
      setPasswordError("Password does not match the required format");
    }
    if (phoneTest) {
      setPhoneError("");
    } else {
      setPhoneError("Phone Number should be 10 digits");
    }
    return setErrorBool(
      emailTest &&
        passwordTest &&
        phoneTest &&
        name.length > 0 &&
        dob.length > 0
    );
  };

  const registerUser = (e) => {
    validateForm();
    e.preventDefault();
    if (errorBool) {
      Axios.post(`${apiKey}/user_registration`, {
        name: name,
        email: email,
        phone: phone,
        dob: dob,
        password: password,
      })
        .then((res) => {
          console.log(res.data.sqlMessage);
          alert.success("User Registered");
        })
        .then((err) => {
          console.log("err", err);
        })
        .finally(() => {
          setEmail("");
          setPassword("");
          setDob("");
          setName("");
          setPhone("");
          alert.success("User Registered");
          history.replace("/user_login");
        });
    } else {
      alert.error("Oops! Input badly Formatted");
    }
  };

  return (
    <div className="poster">
      <div className="signup__container">
        <div className="container__child signup__thumbnail">
          <div className="thumbnail__logo">
            <h1 className="logo__text">Register</h1>
          </div>
          <div className="thumbnail__content">
            <h1 className="heading--primary">Welcome!</h1>
            <h2 className="heading--secondary">If you already have account</h2>
            <div className="button__center">
              <Link to="/user_login">
                <Button variant="outline-danger">Sign In</Button>
              </Link>
            </div>
          </div>
          <div className="signup__overlay"></div>
        </div>
        <div className="container__child signup__form">
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Name"
                required={true}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="enter your email"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="number"
                placeholder="enter your phone no"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setDob(e.target.value);
                  console.log(e.target.value);
                }}
                type="date"
                name="dob"
                placeholder="Date Of Birth"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="enter password"
                required
              />
              <p style={{ color: "black", marginLeft: 10, fontSize: 10 }}>
                Minimum eight characters, at least one letter and one number
              </p>
            </Form.Group>
            {!errorBool ? (
              <p className="register__errors">
                {emailError}
                <br></br>
                {phoneError}
                <br></br>
                {passwordError}
              </p>
            ) : (
              ""
            )}

            <Button
              onClick={registerUser}
              className="register__button"
              variant="info"
              type="submit"
              value="Register"
            >
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
