var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blackjack');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var blackjackSchema = mongoose.Schema({
  name: String,
  games: Number,
  playingStrategy: String,
  bettingStrategy: String, 
  startBankroll: Number,
  endBankroll: Number
});

var BlackJack = mongoose.model('BlackJack', blackjackSchema);

var selectAll = function(callback) {
  BlackJack.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var saveData = function(data) {
  var model = new BlackJack(data);
  model.save()
  .then(() => {
    console.log('data saved in db');
    // res.status(201).send();
  })
  .catch(err => {
    console.log(err);
    // res.status(500).send();
  })
}

module.exports.selectAll = selectAll;
module.exports.saveData = saveData;
