var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.post('/', function(req, res, next) {
  var connection = req.app.locals.connection;
  req.sanitize('symptom').escape().trim();
  var symptoms = req.body.symptom.split(":");
  var index = symptoms.indexOf('');
  symptoms.splice(index+1, 1);
  var query = "SELECT * FROM medicare WHERE ";
  for (var i = 0; i < symptoms.length - 1 ; i++) {
    if(symptoms[i] != '') {
      query += "symptom='" + symptoms[i] + "' OR ";
    }
  }
    query += "'1'='2';";// + symptoms[symptoms.length - 1] + "';";
  connection.query(query, function(err, rows, fields) {
    if(rows.length != 0) {
      /*
      var sendData = {};
      for(var i = 0 ; i < rows.length ; i++) {
        sendData[rows[i].dname] = 0;
      }
      for(var i = 0 ; i < rows.length ; i++) {
        for(var j = 0 ; j < symptoms.length ; j++) {
          if(rows[i].symptom == symptoms[j]) {
            sendData[rows[i].dname] += 1;
          }
        }
      }
      var sendDataFinal = [];
      console.log(symptoms.length-1);
      for(var i = 0 ; i < rows.length ; i++) {
        if(sendData[rows[i].dname] == (symptoms.length - 1)) {
          sendDataFinal.push(rows[i].dname);
          console.log(sendDataFinal);
        }
      }*/

      console.log(symptoms.length - 2);
      for (var i = 0 ; i < rows.length ; i++) {
        var count = 0;
        for (var j = i + 1; j < rows.length ; j++) {
          if(rows[i].dname == rows[j].dname) {
            rows.splice(j, 1);
            count++;
            j--;
          }
        }
        console.log("" + rows[i].dname + " : " + count);
        if(count < symptoms.length - 2) {
          rows.splice(i, 1);
          i--;
        }
      }
      var response = {"data": rows};
      res.end(JSON.stringify(response));
    }
    else {
      var response = {"data": "Disease not found!!"};
      res.end(JSON.stringify(response));
    }
  });
});

module.exports = router;
