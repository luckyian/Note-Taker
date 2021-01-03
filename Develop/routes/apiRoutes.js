// Load data by linking routes
const fs = require('fs');
//Routing
module.exports = function (app) {
    // GET "/api/notes" responds with all notes from the database - db.json
    app.get('/api/notes/', function (req, res) {

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

            // Adds a new id to the note using the id of the last note
            let lastId = allNotes[allNotes.length - 1].id;
            lastId++;

            // Variables for getting notes and displaying them with the new note
            const newFile = { ...req.body, id: lastId };
            const combinedNotes = [...allNotes, newFile]

            // Writes new note to the db.json file
            fs.writeFile("./db/db.json", JSON.stringify(combinedNotes), (err) => {
                if (err) throw err;
                console.log("Created new note!");
                res.json({ success: true, msg: 'Created new note' });
            })
        });
    });
    // Route to delete note
    app.delete('/api/notes/:id', function (req, res) {

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
            // Deletes note from db.json
            fs.writeFile("./db/db.json", JSON.stringify(result), (err) => {
                console.log("Deleted note!");
                res.json(result);
            })
        });
    })
}
