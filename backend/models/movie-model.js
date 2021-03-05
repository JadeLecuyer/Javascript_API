const db = require('./db.js');

class Movie {

  getAll = result => {
    db.query("SELECT id, title, summary, prod_year FROM movies ORDER BY id LIMIT 20", (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    });
  }

  getById = (id, result) => {
    db.query(`SELECT * FROM movies WHERE id = ${id}`, (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
      
      result({ kind: "not_found" }, null);
    });
  }

  getMovieGenre = (id, result) => {
    db.query(`SELECT genres.name FROM movies INNER JOIN genres ON movies.genre_id = genres.id WHERE movies.id = ${id}`, (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
      
      result({ kind: "not_found" }, null);
    });
  }

  getMovieProducer = (id, result) => {
    db.query(`SELECT producers.name FROM movies INNER JOIN producers ON movies.producer_id = producers.id WHERE movies.id = ${id}`, (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
      
      result({ kind: "not_found" }, null);
    });
  }

  getSearchResult = (search, result) => {
    db.query(`SELECT * FROM movies WHERE title LIKE "%${search}%" LIMIT 10`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res);
        return;
      }
      
      result({ kind: "not_found" }, null);
    });
  }
  
}

module.exports = Movie;