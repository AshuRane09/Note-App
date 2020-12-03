const fs = require('fs')


const addNote = function (title, body) {
    const notes = loadNote()

    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNote(notes)
        console.log('Now Note Added')
    }
    else {
        console.log('Note title taken...!')
    }
}

const saveNote = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNote = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote
}