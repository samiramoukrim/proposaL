import React from "react";
import './Cont.css';

function Cont() {
    return(
        <div className="img">
           <img 
             src="https://i.pinimg.com/1200x/6d/e9/99/6de9993958f0911f333bad10af55f442.jpg" 
             alt="Proposal" 
           />
           <div className="text-content">
             <h1>THE YES GIRLS MAGIC!</h1>
             <p>
               Our team is dedicated to sustaining a high level of professionalism while bringing to life these once-in-a-lifetime events! 
               We go above and beyond for each of our clients to ensure their vision is heard, their expectations are met, and everyone is on the same page for your big day. 
               Our team will show up, create event magic, and take care of EVERY detail for you! 
               Ensuring a seamless event and perfect proposal experience! 
               We look forward to the opportunity of planning your once in a lifetime day!
             </p>
             <a href="#contact" className="cont-btn">Contact Us</a>
           </div>
        </div>
    );
}

export default Cont;

