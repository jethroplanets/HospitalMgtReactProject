import React, { useState, useEffect } from "react";
import "./MainpageStyles.css";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useStateValue } from "../../StateProvider";

function Mainpage() {

  
  const slideImages = [
    // "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2021/NYNY/Fuji_TallHero_NYNY_en_US_1x._CB412256579_.jpg",
     "https://images-eu.ssl-images-amazon.com/images/G/31/img20/Books/092020/BookBazaar/Amazon_Book_Bazaar_September_edition_herotator_1500x600._CB405462499_.jpg",
  ];

  const slideProperties = {
    duration: 2000,
    pauseOnHover: true,
  };
  return (
    <div>
      <div className="mainPage slide-container">
        <Slide
          className="mainpage__image mainpage__container"
          {...slideProperties}
        >
          {slideImages.map((each) => {
            return (
              <div className="each-slide">
                <img src={each} alt="1"></img>
              </div>
            );
          })}
        </Slide>
     
      </div>
    </div>
  );
}

export default Mainpage;
