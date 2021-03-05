const express = require('express');
var cors = require('cors');

const app = express();

app.use(cors());

const MoviesController = require('./controllers/movies-controller.js');
let moviesController = new MoviesController;

//GET /api/movies this returns only the 20 first movies entry with basic info
app.get('/api/movies', moviesController.findAll);

//GET /api/movies/{id} this return full info about the movie with the specified id
app.get('/api/movies/:id', moviesController.findOne);

//GET /api/movies/{id}/genres this return the genre of the movie with the specified id
app.get('/api/movies/:id/genres', moviesController.findGenre);

//GET /api/movies/{id}/producers this return the producer of the movie with the specified id
app.get('/api/movies/:id/producers', moviesController.findProducer);

//GET /api/movies/search/{search} this return the 10 first movie with search term in their name
app.get('/api/movies/search/:search', moviesController.findSearchResults);


app.listen(8080, () => {
    console.log('Server listening');
})