var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var connection = req.app.locals.connection;
  var query = "SELECT DISTINCT symptom FROM medicare;"
  connection.query(query, function(err, rows, fields) {
    console.log(rows[0].symptom);
    if(rows.length != 0) {
      res.render('main', { title: 'Some error in server', symptoms: rows });
    }
    else {
      res.render('main', { title: 'Welcome', symptoms: rows });
    }
  });
});

module.exports = router;
