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
const recipes = database.collection('recipies');

app.get('/', (req, res) => {
  res.send('Hello from the Microservice!');
});

// retrieve all recipes in database
app.get('/recipes', async (req, res) => {
  var results = await recipes.find({}).toArray(function (err, result) {
    if(err) return done( err );
    done(null, JSON.stringify(result));
  });
  console.log(results);
  res.send(results);
});

// retrieve all recipes in database where name = {name}  UNFINISHED
app.get('/recipes/name', async (req, res) => {
  const results = await recipes.findOne();
  console.log(results);
  res.send(results);
});

// retrieve all recipes in database where totalCalories = {calories}  UNFINISHED
app.get('/recipes/calories', async (req, res) => {
  const results = await recipes.findOne();
  console.log(results);
  res.send(results);
});

// add recipie to database
app.post('/recipes', async (req, res) => {
  await recipes.insertOne({
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

