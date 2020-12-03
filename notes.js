const fs = require('fs')
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New Note Added')
    }
    else {
        console.log('Note title taken...!')
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const reqNotes = notes.filter((note) => {
        return note.title !== title
    })
    if (notes.length > reqNotes.length) {
        console.log(chalk.green.inverse('Note Removed ..!'))
        saveNotes(reqNotes)
    } else {
        console.log(chalk.red.inverse('No Note Found..!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes.'))
    notes.forEach(note => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteFound = notes.find((note) => note.title === title)
    if (noteFound) {
        console.log(chalk.inverse(noteFound.title))
        console.log(noteFound.body)
    }
    else {
        console.log(chalk.red.inverse("Note not Found.!"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}