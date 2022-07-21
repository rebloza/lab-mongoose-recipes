const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");


const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
const db = mongoose.connect('mongodb://localhost:27017/recipe-app');

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then((response) => {
    // Run your code here, after you have insured that the connection was made
    console.log("la coleccion se borro");
    return Recipe.create({
      title: "Pernil",
      level: "UltraPro Chef",
      ingredients: "Pierna cerdo",
      cuisine: "Horno",
      dishType: "main_course",
      duration: 6,
      creator: "venezolano",
      created: 1883,
    });
  })
  .then((response) => {
    console.log("nueva receta");
    return Recipe.insertMany(data);
  })
  .then((response) => {
    console.log("Agregamos todas las recetas");
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration: 100})
  })
  .then((response) => {
    console.log("duracion esta cambiada")
    return Recipe.findOneAndDelete({title:"Carrot Cake"})
  })
  .then((response) =>{
    console.log("Se eleimino Carrot Cake")
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
    

  });
  mongoose.disconnect()

