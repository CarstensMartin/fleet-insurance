import React,{useState} from 'react'
import { api } from '../Api';
import InsurancePrice from './InsurancePrice';

// Search for all the cars on the system
function InsuranceAdd() {

    // Declare State
    const[started, setStarter]= useState(false);
    const[cars,setCars] = useState([]);
    const[error,setError] = useState(null);
    const[isLoaded,setIsLoaded] = useState(false);
    const[savedCar,setSavedCar] = useState([])
    const[kmIsLoaded,setKmIsLoaded] = useState(false);
    let carsInFleet = 0;

    // Fetch the data from the API
    function componentDidMountGet() {
        //Method Get
        let method = "GET";

        // Fetch AllCARS data from API
        api(`/allcars`,method )
        .then(result => {
            setIsLoaded(true);
            setCars(result);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        });  
    }

    // Fetch from and add data to the API
    function componentDidMountPost(element) {

        //Method Post(Add)
        let method = "POST";
        // Data in Correct Format - slug
        let addId= element.id;
        let addMake = element.make.replace(" ", "_");
        let addModel = element.model.replace(" ", "_");
        let addKm = element.km;

        // If empty or negative, change to 0Km
        if (typeof addKm === "undefined" || addKm === null || addKm==="" || addKm <0) {
            addKm = 0
        }

        // Structure data correct format
        let data = {id:`${addId}`,make:`${addMake}`,model:`${addModel}`,km:`${addKm}`}
        
        // Fetch data from API and update INSURANCE
        api(`/insurance`,method,data )

        .then(result=> {
            setKmIsLoaded(true);
            let carsResult = savedCar
            carsResult.push(result)
            setSavedCar(carsResult);
        },
        (error) => {
            setKmIsLoaded(true);
            setIsLoaded(true);
            setError(error);
        })
    }

    // Set the KM
    function setKm(index, km){
        let data = cars;
        data[index].km =km;
        // Return new data and to be used to setCars
        return(data)
    }

    // Function to update all the cars in the fleet' insurance
    function submitKm(data){
        for(let i in data){
            //Post each car' data to the system
            componentDidMountPost(data[i])
        }
    }

    // If not started yet, return button to start search
    if(started === false){
        return(
            <div>
                <h2>FLEET KM DRIVEN:</h2>
                <button onClick={() =>{ componentDidMountGet(); setStarter(true)}}>ADD KM TO CARS</button>
            </div>
        )
    }
    else if (error) { return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) { return <div>Loading...</div>;
    }
    // If km information is loaded, show the result
    // Also have button to change the km again
    else if(kmIsLoaded){
        return(
            <div>
                <InsurancePrice/>
                <br/>
                <button onClick={() =>{ componentDidMountGet(); setStarter(true); setKmIsLoaded(false)}}>CHANGE FLEET KM</button>
            </div>
        )
    }
    else {
        // Show all Cars on the system
        return(
            <div>
                <h2>FLEET KM DRIVEN:</h2>
                <table>
                    <thead>
                        <tr>
                        <th>ID</th><th>MAKE</th><th>MODEL</th><th>KM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((element,index) => {
                            carsInFleet++
                            return(
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.make}</td>
                                    <td>{element.model}</td>
                                    <td>
                                        <input name="seats" value={element.km} type="number" onChange={e => {setCars(setKm(index,e.target.value))}}/>
                                    </td>
                                </tr> 
                            )  
                        })}
                    </tbody>
                </table>
                <h3>CARS BEING UPDATED: {carsInFleet}</h3>
                <br/>
                <button onClick={() =>{ submitKm(cars)}}>SUBMIT KM</button>
                <br/><br/>
                <button onClick={() =>{ setStarter(false)}}>CLOSE SEARCH</button>
            </div>
        )
    }
}

export default InsuranceAdd