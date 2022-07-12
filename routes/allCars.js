var express = require('express');
var router = express.Router();
const fs = require('fs')

// Utility function - Gets car data, and creates the file if it doesn't exist
function getCars() {
    try {
        const content = fs.readFileSync('cars.json')
        return JSON.parse(content)
    } catch (e) { // file non-existent
        fs.writeFileSync('cars.json', '[]')
        return []
    }
}

// Display all the Cars that is on the System
router.get('/', (req, resp) => {
    const cars = getCars()
    // Send all the cars
    resp.send(cars)  
})

module.exports = router;
