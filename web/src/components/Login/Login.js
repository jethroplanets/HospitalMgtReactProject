import React, { useState } from "react";
import "./LoginStyles.css";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [{ apiKey }, dispatch] = useStateValue();
  const history = useHistory();
  const alert = useAlert();

  const handleLogin = async (e) => {
    e.preventDefault();
    Axios.post(`${apiKey}/user_login`, {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          dispatch({
            type: "SET_USER",
            user: res.data?.data[0],
          });
          localStorage.setItem("user", JSON.stringify(res.data?.data[0]));
          history.replace("/");
        } else {
          alert.error("User does not exits.");
          console.log("No user");
        }
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <div className="login__inner continer col-md-5">
        <div className="login__panel">
          <h5>Login</h5>
        </div>
        <Form style={{ width: "80%", marginTop: 50 }}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="your email"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="enter password"
              required
            />
          </Form.Group>

          <Button
            onClick={handleLogin}
            type="submit"
            className="register__button"
            variant="info"
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
