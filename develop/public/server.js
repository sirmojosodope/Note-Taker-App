const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { userInfo } = require('os');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.readFile);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended }));
app.use(express.json());

app.use(express.static("./develop/public"));

//API ROUTE GET
app.get("/api/notes", function (req, res) {
    readFileAsync("./develop/notes", function (req, res) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
})
//API ROUTE POST
app.post("/api/notes", function (req, res) {
    notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1
    notes.push(note);
    return notes
}).then(function (notes) {
    writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
    res.json(note);

})

//API ROUTE DELETE
app.delete("/api/notes/:id", function (req, res) {
    const idToDelete = parseInt(req.params.id);
    readFileAsync("./develop/db/db.json", "utf8").then(function (data) {
        notes = [].concat(JSON.parse(data));
        const newNotesData = []
        for (let i = 0; i < notes.length; i++) {
            if (idToDelete !== notes[i].id) {
                newNotesData.push(notes[i])
            }
        }
        return newNotesData
    }).then(function (notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.send('Success!');
    })
})

//HTML ROUTE
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

//LISTENING FOR
app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
});