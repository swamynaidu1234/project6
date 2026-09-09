import React, { useMemo, useState } from "react";
import { getCat, getSubCat } from "../services/cat_subcat_service";
import { Link } from "raviger";
export default function Header() {
  var [catItems, updateMenu] = useState([]);
  var [subCatItems, updateSubcat] = useState([]);
  useMemo(() => {
    const catdata = getCat();
    catdata.then(
      (dt) => {
        updateMenu(dt.data);
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
      updateSubcat(dt.data);
    });
  }, []);
  return (
    <div>
      <div className="navbar">
        {/* <a href="#home">Home</a>
  <div className="dropdown">
    <button className="dropbtn">Dropdown 
      <i className="fa fa-caret-down"></i>
    </button>
    <div className="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div>  */}
        {catItems.map((catelement: any, index) => {
          return (
            <>
              {/* <a key={index}></a> */}
              <div className="dropdown">
                <button className="dropbtn">
                  {catelement.catName}
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  {subCatItems.map((subcatelement:{subCatName:string,catId:string},index)=>{
                    if(subcatelement.catId === catelement._id)
                    return <>
                    <Link href="./products" key="index">{subcatelement.subCatName}</Link>
                    </>
                  })}
                  
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
