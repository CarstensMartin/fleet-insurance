import React,{useState} from 'react'
import { api } from '../Api';

// Show the pricing of all the cars
function InsurancePrice() {

    // Declare state
    const[started, setStarter]= useState(false);
    const[cars,setCars] = useState([]);
    const[error,setError] = useState(null);
    const[isLoaded,setIsLoaded] = useState(false);
    let price = 0;
    let km = 0;

    // Fetch the data from the API
    function componentDidMountGet() {
        //Method Get
        let method = "GET";

        // Fetch data from API and update
        api(`/insurance`,method )
        .then(result => {
            setIsLoaded(true);
            setCars(result);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        });  
    }


    // If not started yet, return button to start search
    if(started === false){
        return(
            <div>
                <h2>INSURANCE PRICING</h2>
                <button onClick={() =>{ componentDidMountGet(); setStarter(true)}}>SHOW PRICE</button>
            </div>
        )
    }
    else if (error) { return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) { return <div>Loading...</div>;
    }
    else {
        // Show all Cars on the system
        return(
            <div>
                <h2>INSURANCE PRICING:</h2>
                <table>
                    <thead>
                        <tr>
                        <th>ID</th><th>MAKE</th><th>MODEL</th><th>KM</th><th>PRICE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((element,index) => {
                            price = price+element.price;
                            km = km+ element.km;
                            return(
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.make}</td>
                                    <td>{element.model}</td>
                                    <td>{element.km}</td>
                                    <td>{element.price}</td>
                                </tr> 
                            )  
                        })}
                    </tbody>
                </table>
                <h3>TOTAL KM DRIVEN THIS MONTH: {km}KM</h3>
                <h3>TOTAL INSURANCE PRICE FOR THE FLEET: R{price}.00</h3>

                <br/><br/>
                <button onClick={() =>{ setStarter(false)}}>CLOSE SEARCH</button>
            </div>
        )
    }
}

export default InsurancePrice