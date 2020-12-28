//Dependencies
var path = require('path');
// Routing
module.exports = function(app) {

// "/notes" responds with the notes.html file
app.get('/notes/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

// "/notes" responds with the notes.html file
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}