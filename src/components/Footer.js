import React from "react";
import moment from "moment/moment";
import BackToTop from "./BackToTop";


export default function Footer() {
    const codeYear= moment().format("YYYY")
    // const [ShowButton, SetShowButton] = usestate(false);

    



    return(
        <div  className="flexbox-top">
            <BackToTop />
            <span className="footer-item">Coded by: Trust Mozgova  &nbsp;</span>  
            <span className="footer-item">{codeYear}  &copy;  </span>    
            
        </div>
        
    )
}

