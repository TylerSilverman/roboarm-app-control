import React from "react";
import { Link } from "react-router-dom";



function SaveMotion () {
    return (
      <div className="container valign-wrapper" style={{ height: '50vh' }}>
      <div className="row">
        <br></br>
      <Link to="/Dashboard" role="button" className="btn btn-large waves-effect waves-light hoverable green accent-3">
          Back to Dashboard !
          </Link>
        <div className="col s12 center-align">
          <br></br><br></br>
          <h3>Welcome to the Save Motions Page</h3>
         <div>
          <br></br>
          <h4>Save Selection Choices picked from previos page for the movements of the Claw</h4>
        <button>Right/Left</button>
        <button>Up/Down</button>
        <button>Open Claw</button>
        <button>Close Claw </button>
        <button>Pre Saved</button>

      </div>
      
        </div>
      </div>
    </div>
  );
     
}

export default SaveMotion;