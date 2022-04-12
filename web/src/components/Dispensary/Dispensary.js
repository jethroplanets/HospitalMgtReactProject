import React, { useState } from "react";
import "./DispensaryStyles.css";
import { Button, Form } from "react-bootstrap";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import NumericInput from "react-numeric-input";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

function Dispensary(props) {
  const [{ basket, apiKey, user }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(1);
  const history = useHistory();
  const alert = useAlert();

  const handleAddToCart = (e) => {
    e.preventDefault();
    var basketItem = { uuid: uuidv4(), ...props };
    dispatch({
      type: "ADD_TO_BASKET",
      basket: basketItem,
    });
    axios
      .post(`${apiKey}/add_to_cart`, {
        cartItem: props.Prod_id,
        uuid: basketItem.uuid,
        user: user.Email,
      })
      .then((res) => {});
  };

  return (
    <div className="dispensaryList__poster">
      <div className="dispensaryList container">
        <div className="dispensaryList_details">
          <h4>{props.Prod_name}</h4>
          <div className="dispensary__rating">
            {/* {Array(props.Prod_rating)
              .fill()
              .map((_, i) => (
                <p key={i}>⭐</p>
              ))} */}
          </div>
          <p>
            <strong>Medicine Name {props.Prod_price}</strong>
          </p>
          <p>
            <strong>Patient Names {props.Prod_rating}</strong>
          </p>
        </div>

        <div className="dispensaryList_buttons">
          {/* <Button variant="outline-success">Buy Now</Button> */}
          {/* {user?.Email ? (
            <Button variant="outline-primary" onClick={handleAddToCart}>
              Add an Issue
            </Button>
          ) : (
            <Button variant="outline-primary" onClick={handleLogin}>
              Add an Issue
            </Button>
          )} */}

        </div>
      </div>
    </div>
  );
}

export default Dispensary;
