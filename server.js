const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { userInfo } = require('os');
const { runInNewContext } = require('vm');
const { parse } = require('path');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.readFile);

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//API ROUTE GET
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"))
})

//API ROUTE POST
app.post("/api/notes", function (req, res) {
    // console.log("notes from the front end", req.body )


    fs.readFile(path.join(__dirname, "./db/db.json"), function (err, data) {

        const parsedNotes = JSON.parse(data)

        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: parsedNotes.length + 1
        }
        // console.log("data from db.json", parsedNotes)
        parsedNotes.push(newNote)
        //console.log("parsednotes with newnotw in it", parsedNotes)

        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(parsedNotes), function (err) {
            if (err) throw err;
            console.log("Note SAVED to db.json")
        })
    })
    // us updating the front end so you can see what notes are in the db along with the one you just added
    res.sendFile(path.join(__dirname, "./db/db.json"))

})



//API ROUTE DELETE
app.delete("/api/notes/:id", function (req, res) {
   // const idToDelete = req.params.id
    console.log(req.params.id, "ID TO DELTE!!!!!")

    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8", function (err, data) {
        let notes = JSON.parse(data)

        for (let i = 0; i < notes.length; i++) {
            console.log(notes[i])
            if (parseInt(req.params.id) === notes[i].id) {
                notes.splice(i, 1)
            }
        }

        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(notes), function (err) {
            if (err) throw err;
            console.log("Note Deleted from db.json")
        })
        res.sendFile(path.join(__dirname, "./db/db.json"))
    })

})

//HTML ROUTE
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


//LISTENING FOR
app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
});