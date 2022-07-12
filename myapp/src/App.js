import './App.css';
import React,{useState} from 'react'
import DisplayAllCars from './fleet/DisplayAllCars';
import CarsSearch from './fleet/CarsSearch';
import CarsAdd from './fleet/CarsAdd';
import CarsDelete from './fleet/CarsDelete';
import CarsPut from './fleet/CarsPut';
import InsuranceAdd from './insurance/InsuranceAdd';
import InsurancePrice from './insurance/InsurancePrice';
import logo from './images/logo.jpg';

// Display all the pages inside App
function App() {

  // Declare state
  const[fleetOptionsDisplay, setFleetOptionsDisplay]= useState(false);
  const[insuranceDisplay, setInsuranceDisplay]= useState(false);

  // Display Fleet of Cars options
  const displayFleet = (
    <div><DisplayAllCars/>
      <br/><hr/>
      <CarsSearch/>
      <br/><hr/>
      <CarsAdd/>
      <br/><hr/>
      <CarsDelete/>
      <br/><hr/>
      <CarsPut/>
      <br/><hr/>
      <button className='options-Button' onClick={()=>{setFleetOptionsDisplay(false)}}>CLOSE FLEET OPTIONS</button>
    </div>
  );
  // Display Insurance options
  const displayInsurance = (
    <div>
      <InsuranceAdd/>
      <br/><hr/>
      <InsurancePrice/> 
      <br/><hr/>
      <button className='options-Button' onClick={()=>{setInsuranceDisplay(false)}}>CLOSE INSURANCE OPTIONS</button>
    </div>
  );

  // Return based on State
  return (
    <div className="App">
      
      <h1><span>WELCOME TO FLEET INSURANCE </span><span><img src={logo} alt="logo" id="logo"></img></span></h1>
      <br/><hr/>

      {fleetOptionsDisplay?displayFleet:<button className='options-Button' onClick={()=>{setFleetOptionsDisplay(true)}}>FLEET OPTIONS</button>} 
      <hr/>

      {insuranceDisplay?displayInsurance:<button className='options-Button' onClick={()=>{setInsuranceDisplay(true)}}>DISPLAY INSURANCE</button>} 
      <hr/>

    </div>
  );
}

export default App;
