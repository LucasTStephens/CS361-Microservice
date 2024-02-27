// database for recipes, which will have table for ingredients and respective calories. 

// Can search calorie amount to get recipies with that calorie amount or lower

const express = require('express');
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser');
const app = express();
const port = 3374;

// parser for POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Replace the uri string with your connection string.
const uri = "mongodb+srv://stephluc:stephluc@cluster0.3rky536.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
const database = client.db('Recipies');
const recipies = database.collection('recipies');

app.get('/', (req, res) => {
  res.send('Hello from the Microservice!');
});

// retrieve all recipies in database
app.get('/recipies', async (req, res) => {
  const results = await recipies.findOne();
  console.log(results);
  res.send(results);
});

// retrieve all recipies in database where name = {name}  UNFINISHED
app.get('/recipies/name', async (req, res) => {
  const results = await recipies.findOne();
  console.log(results);
  res.send(results);
});

// retrieve all recipies in database where totalCalories = {calories}  UNFINISHED
app.get('/recipies/calories', async (req, res) => {
  const results = await recipies.findOne();
  console.log(results);
  res.send(results);
});

// add recipie to database
app.post('/recipies', async (req, res) => {
  await recipies.insertOne({
    Name: req.body["Name"],
    totalCalories: req.body["totalCalories"],
    Ingredients: req.body["Ingredients"]
  });
  res.sendStatus(200);
  client.close();
});

app.listen(port, () => {
  console.log(`Microservice listening on port ${port}`);
});

