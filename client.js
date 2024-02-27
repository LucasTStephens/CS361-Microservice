// THIS IS NOT NECESSARY FOR MICROSERVICE
// Example of client communication with microservice:

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3562;


// parser for POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/recipies', async (req, res) => {
    // send request to recipies microservice
    try {
      const recipeResponse = await axios.get('http://flip2.engr.oregonstate.edu:3374/recipies');
      res.send(recipeResponse.data);
    } catch (error) {
      console.error(`Error fetching data from recipe Microservice: ${error.message}`);
      res.status(500).send('Error fetching data from recipe Microservice');
    }
  });

  app.get('/recipies/post', async (req, res) => {
    // send request to recipies microservice
    try {
        const recipeResponse = await axios.post('http://flip2.engr.oregonstate.edu:3374/recipies', {
            Name: 'Kebab',
            totalCalories: '1200',
            Ingredients: [{Name: "Tomato", Measurement: "200g", Calories: "200"}, {Name: "Rice", Measurement: "800g", Calories: "1000"}]
        });
        res.send(`client recieved data from recipe microservice: ${recipeResponse.data}`);
      } catch (error) {
        console.error(`Error posting data to recipe Microservice: ${error.message}`);
        res.status(500).send('Error posting data to recipe Microservice');
      }
  });

app.listen(port, () => {
  console.log(`client listening on port ${port}`);
});

