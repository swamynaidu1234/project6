import React, { useMemo } from "react";
import { getCat, getSubCat } from "../services/cat_subcat_service";
export default function Header() {
  useMemo(() => {
    const catdata = getCat();
    catdata.then(
      (dt) => {
        console.log(dt.data);
      },

      function (err) {
        if (err.status == 404) {
          console.log("Not found");
        }
      },
    );
    const subcatData = getSubCat();
    subcatData.then((dt) => {
      console.log(dt.data);
    });
  }, []);
  return (
    <div >
  <div className="navbar">
  <a href="#home">Home</a>
  <div className="dropdown">
    <button className="dropbtn">Dropdown 
      <i className="fa fa-caret-down"></i>
    </button>
    <div className="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div> 
</div>
    </div>
  );
}
