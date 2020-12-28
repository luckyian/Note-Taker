// Load data by linking routes
const fs = require('fs');
// var notesData = require('../db/notes.json');
//Routing
module.exports = function (app) {
    // GET "/api/notes" responds with all notes from the database - db.json
    app.get('/api/notes/', function (req, res) {
        console.log("Inside Get routes");
        //Read the JSON file
        fs.readFile("./db/db.json", "utf8", (err, response) => {
            if (err) throw err;
            let allNotes;

            // If notes isn't an array or can't be turned into one, send back a new empty array
            try {
                allNotes = [].concat(JSON.parse(response));

            } catch (err) {
                allNotes = [];
            }

            // return allNotes; 
            res.json(allNotes);
        });
    });
    app.post('/api/notes/', function (req, res) {
        console.log("Inside post routes");
        //Read the JSON file
        fs.readFile("./db/db.json", "utf8", (err, response) => {

            if (err) throw err;
            let allNotes;

            // If notes isn't an array or can't be turned into one, send back a new empty array
            try {
                allNotes = [].concat(JSON.parse(response));

            } catch (err) {
                allNotes = [];
            }
            let lastId = allNotes[allNotes.length - 1].id;
            console.log(lastId);
            lastId++;

            const newFile = { ...req.body, id: lastId };
            const combinedNotes = [...allNotes, newFile]
            fs.writeFile("./db/db.json", JSON.stringify(combinedNotes), (err) => {
                if (err) throw err;
                console.log("Created new note!");
                res.json({ success: true, msg: 'Created new note' });
            })
        });
    });
    app.delete('/api/notes/:id', function (req, res) {
        console.log("Inside delete routes");
        const deleteNoteId = req.params.id
        //Read the JSON file
        fs.readFile("./db/db.json", "utf8", (err, response) => {

            if (err) throw err;
            let allNotes;

            // If notes isn't an array or can't be turned into one, send back a new empty array
            try {
                allNotes = [].concat(JSON.parse(response));

            } catch (err) {
                allNotes = [];
            }

            const result = allNotes.filter(notes => notes.id != deleteNoteId);
            // const deleteNote = [...allNotes, newFile]
            fs.writeFile("./db/db.json", JSON.stringify(result), (err) => {
                console.log("Deleted note!");
                res.json(result);
            })
        });
    })
}
