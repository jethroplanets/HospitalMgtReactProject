import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "./PatientStyles.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

function Patient() {

    const [patientName, setpatientName] = useState("");

    const [{ apiKey }, dispatch] = useStateValue();
    const history = useHistory();
    const alert = useAlert();

    const [errorBool, setErrorBool] = useState(false);
  
    const registerPatient = (e) => {
      
      e.preventDefault();
      if (errorBool) {
        Axios.post(`${apiKey}/register_patients`, {
          patientName: patientName,
        
        })
          .then((res) => {
            console.log(res.data.sqlMessage);
            alert.success("Patients Registered");
          })
          .then((err) => {
            console.log("err", err);
          })
          .finally(() => {
            
            setpatientName("");
            
            alert.success("Patients Registered");
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
              <h1 className="heading--primary">Register Patients</h1>        
            </div>
            <div className="thumbnail__content">
     
              <div className="button__center">
                
              </div>
            </div>
            <div className="signup__overlay"></div>
          </div>
          <div className="container__child signup__form">
            <Form>
              <Form.Group>
                <Form.Label>Patients Name</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setpatientName(e.target.value);
                  }}
                  type="text"
                  required={true}
                />
              </Form.Group>

              <Button
                onClick={registerPatient}
                className="register__button"
                variant="info"
                type="submit"
                value="Patient"
              >
                Register Patients
              </Button>

            </Form>
          </div>
        </div>
      </div>
    );
  }

  export default Patient;