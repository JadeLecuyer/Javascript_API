const Movie = require('../models/movie-model.js');
let movie = new Movie;

class MoviesController {

findAll= (req, res) => {
        movie.getAll((err, data) => {
        if (err)
            res.status(500).json({
            message:
                err.message || "Some error occurred while retrieving movies."
            });
        else res.json(data);
        });
    }
  
    findOne = (req, res) => {
        movie.getById(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not found movie with id ${req.params.id}.`
                });
                } else {
                res.status(500).json({
                    message: `Error retrieving movie with id ${req.params.id}.`
                });
                }
            } else res.json(data);
        });
    }

    findGenre = (req, res) => {
        movie.getMovieGenre(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not found genre of movie with id ${req.params.id}.`
                });
                } else {
                res.status(500).json({
                    message: `Error retrieving genre of movie with id ${req.params.id}.`
                });
                }
            } else res.json(data);
        });
    }

    findProducer = (req, res) => {
        movie.getMovieProducer(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not found producer of movie with id ${req.params.id}.`
                });
                } else {
                res.status(500).json({
                    message: `Error retrieving producer of movie with id ${req.params.id}.`
                });
                }
            } else res.json(data);
        });
    }
}

module.exports = MoviesController;