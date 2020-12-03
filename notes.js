const fs = require('fs')
const chalk = require('chalk');

const addNote = function (title, body) {
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note)=>{
        return note.title === title
    })
    if (duplicateNotes.length === 0) {
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

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return []
    }
}

const removeNote = function (title) { 
    const notes = loadNotes();
    const reqNotes = notes.filter((note)=>{
        return note.title!==title
    })
    if (notes.length > reqNotes.length) {
        console.log(chalk.green.inverse('Note Removed ..!'))
        saveNotes(reqNotes)   
    } else {
        console.log(chalk.red.inverse('No Note Found..!'))
    }
}


module.exports = {
    // getNote: getNotes,
    addNote: addNote,
    removeNote: removeNote


}