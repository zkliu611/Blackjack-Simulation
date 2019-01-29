var express = require('express');
var bodyParser = require('body-parser');
var blackjack = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/models', (req, res) => {
  blackjack.selectAll(function(err, data) {
    if (err) {
      console.log(err)
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.post('/models', (req, res) => {
  blackjack.saveData(req.body)
})

app.delete('/models', (req, res) => {
  //add later
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

