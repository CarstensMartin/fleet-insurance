var express = require('express');
var router = express.Router();
const fs = require('fs');


// Utility function - Gets car data, and creates the file if it doesn't exist
function getCars() {
    try {
        const content = fs.readFileSync('insurance.json')
        return JSON.parse(content)
    } catch (e) { // file non-existent
        fs.writeFileSync('insurance.json', '[]')
        return []
    }
}

// Add a car and over write the json file
function addCar(carSpecifications) {
    const cars = getCars()
    let notInObject = false
    for(let i in cars){
        if(cars[i].id ===carSpecifications.id){
            cars[i] = carSpecifications;
            notInObject = true;
        }
    }

    if(!notInObject){
        cars.push(carSpecifications)
    }
    
    fs.writeFileSync('insurance.json', JSON.stringify(cars))
}

// Calculate the pricing based on criteria
function pricing(carKm){
    let price = 0;
    if(carKm<=20){
        price = 200;
    } else if(carKm<=50){
        price = (200 +((carKm-20)*1));
    } else if(carKm<=100){
        price = (220 +((carKm-50)*.8));
    } else if(carKm>100){
        price = (260 +((carKm-100)*.5));
    }
    return(price)
}


// GET The Cars from the Car inventory cars.json file
router.get('/', (req, resp) => {
    const cars = getCars()
    // Send all the cars
    resp.send(cars)  
})


// Add a 
router.post('/', (req, resp) => {
    // Get entered params and replace _ with space
    const carId = parseInt((req.body.id))
    const carMake = (req.body.make).replace("_", " ")
    const carModel = (req.body.model).replace("_", " ")
    const carKm = parseInt((req.body.km))

    const price = pricing(carKm);
   

    // Construct the specifications
    const carSpecifications = {
        "id": carId,
        "make": carMake,
        "model": carModel,
        "km": carKm,
        "price":price
    }
    // Add to cars
    addCar(carSpecifications)
    resp.send(carSpecifications)
})


module.exports = router;
