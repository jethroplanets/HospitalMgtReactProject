import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "./MedicineStyles.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

function Medicine() {
    const [medicine_name, setMedicineName] = useState("");
    const [quantity, setQuantity] = useState("");

    const [{ apiKey }, dispatch] = useStateValue();
    const history = useHistory();
    const alert = useAlert();
    const [errorBool, setErrorBool] = useState(false);
  
    useEffect(() => {
      // validateForm();
    });
 
  
    const registerMedicine = (e) => {
      // validateForm();
      e.preventDefault();
      if (errorBool) {
        Axios.post(`${apiKey}/register_medicine`, {

        medicine_name: medicine_name,
        quantity: quantity,

        })
          .then((res) => {
            console.log(res.data.sqlMessage);
            alert.success("Doctors Registered");
          })
          .then((err) => {
            console.log("err", err);
          })
          .finally(() => {
            
            setMedicineName("");
            setQuantity("");

            alert.success("Doctors Registered");
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
              <h1 className="heading--primary">Register Medicines</h1>
              
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
                <Form.Label>Name of the Medicine</Form.Label>     
                <Form.Control
                  onChange={(e) => {

                    setMedicineName(e.target.value);
                  }}
                  type="text"
                  required={true}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label><b>Quantity</b></Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                  type="number"
                  required
                />
              </Form.Group>
  
              <Button
                onClick={registerMedicine}
                className="register__button"
                variant="info"
                type="submit"
                value="Medicine"
              >
                Register Medicines
              </Button>

           

            </Form>
          </div>
        </div>
      </div>
    );
  }

  export default Medicine;