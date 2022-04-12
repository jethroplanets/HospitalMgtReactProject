// import React, { useState } from "react";
import "./SearchStyles.css";
import { Form } from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";
function Search(props) {
  

  return (
    <div className="search container">
      <Form style={{ display: "flex", flexGrow: 1 }}>
        <Form.Control
          className="search__searchInput"
          type="text"
          placeholder="Search"
       
        />
        <button
          type="submit"
          
          style={{ background: "none", border: "none" }}
        >
          <SearchIcon className="search__searchIcon" />
        </button>
      </Form>
    </div>
  );
}

export default Search;
