const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')
const getNotes = require('./notes.js')


yargs.command({
    command: 'add',
    describe: 'Add a new Notes',
     builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type:'string'
         },
         body: {
             describe: 'Note title body',
             demandOption: true,
             type:'string'
         }
    },
    handler:(argv)=>{
        notes.addNote(argv.title,argv.body)
    }
})


yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Remove Note',
            demandOption: true,
            type:'string'
        }
    },
    handler:(argv)=>{
        getNotes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function () {
        
    }
})

yargs.parse()