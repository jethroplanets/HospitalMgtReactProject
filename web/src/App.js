import "./App.css";
import Header from "./components/Header/Header";
import Mainpage from "./components/Mainpage/Mainpage";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
// import ProductsList from "./components/ProductsList/ProductsList";
import Footer from "./components/Footer/Footer";
import Search from "./components/Search/Search";
import Pagination from "react-js-pagination";
import { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import axios from "axios";

import Doctor from "./components/Doctors/Doctor";
import Medicine from "./components/Medicines/Medicine";
import Patient from "./components/Patients/Patient";
import Dispensary from "./components/Dispensary/Dispensary";

function App() {
  const [{ apiKey, products, user, basket }, dispatch] = useStateValue();
  const [productJSON, setProductsJSON] = useState([]);
  const [totalProducts, setTotalProducts] = useState();

  useEffect(() => {
    setActivePage(1);
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch({
        type: "SET_USER",
        user: foundUser,
      });
    }
    const productRequest = axios.post(`${apiKey}/get_products`, {
      page: activePage,
    });
    const totalProducts = axios.get(`${apiKey}/total_products`);

    axios.all([productRequest, totalProducts]).then(
      axios.spread((...responses) => {
        setProductsJSON(responses[0].data);
        setTotalProducts(responses[1].data);
      })
    );
  }, []);

  useEffect(() => {
    const cartProducts = axios
      .post(`${apiKey}/get_cart_products`, {
        user: user?.Email,
      })
      .then((res) => {
        dispatch({
          type: "ADD_MULTIPLE_BASKET",
          basket: res.data,
        });
      });
  }, [user]);

  useEffect(() => {
    if (products !== null || products !== undefined) {
      setProductsJSON(products);
    }
  }, [products]);
  const [activePage, setActivePage] = useState(1);
  const changePagination = (pageNumber) => {
    console.log(pageNumber);
    setActivePage(pageNumber);
    const newProductRequest = axios
      .post(`${apiKey}/get_products`, {
        page: pageNumber,
      })
      .then((res) => {
        setProductsJSON(res.data);
      });
  };

  return (
    <Router>
      <div className="app">
        <Switch>
  
          <Route path="/doctors">
            <Header />
            <Doctor />
          </Route>

          <Route path="/medicines">
            <Header />
            <Medicine />
          </Route>

          <Route path="/dispensaries">
            <Header />
            <Dispensary />
          </Route>

          <Route path="/patients">
            <Header />
            <Patient />
          </Route>

          <Route path="/products">
            <Header />
            <br></br>
            <Search />
            <Pagination
              className="pagination"
              itemClass="page-item"
              linkClass="page-link"
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={totalProducts === undefined ? 10 : totalProducts}
              onChange={changePagination.bind(this)}
              pageRangeDisplayed={15}
            />
            
            {productJSON.map((each) => {
              
            })}
            <Pagination
              className="pagination"
              itemClass="page-item"
              linkClass="page-link"
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={totalProducts === undefined ? 10 : totalProducts}
              onChange={changePagination.bind(this)}
              pageRangeDisplayed={15}
            />
            <Footer />
          </Route>

          <Route path="/user_login">
            <Header />
            <Login />
          </Route>

          <Route path="/user_registration">
            <Header />
            <Register />
          </Route>

          <Route path="/">
            <Header />
            <Mainpage />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
