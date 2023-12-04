//Calls the notes.js file and allows you to use any exported variable/funtions/data inside of this file
const notes = require('./notes.js')
//Calls the yargs files and allows to use the installed NPM Yargs commands
const yargs = require('yargs')

//Create add command
//Using add --title and --body you can create new notes
yargs.command({
    //keyword used to call command
    command: 'add',
    //short description
    describe: 'Add a new note',
    //arguments to be inputed alongside command
    builder: {
        //name of argument
        title: {
            //short description
            describe: 'Note title',
            //causes argument to be required in order for it to run successfully
            demandOption: true,
            //Sets expected input type
            type: 'string'
        },
        body: {
            //short description
            describe: 'Note Body',
            //causes argument to be required in order for it to run successfully
            demandOption: true,
            //Sets expected input type
            type: 'string'
        }
    },

    handler(argv) {
        //calls the exported addnote function and uses the title and body arguments provided in the console as inputs and adds the note to the note.json but if it exist returns error
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        //calls the exported removeNotes function and uses the title argument provided in the console as input and removes that note or returns error
        notes.removeNote(argv.title)
    }
})

//Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        //calls the exported listNotes function and list all title and bodys in the console
        notes.listNotes()
    }
})

//Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        //calls the exported readNote function and uses the title argument provided in the console as input then displays the note title and body if it exist otherwise returns error
        notes.readNotes(argv.title)
    }
})

//logs output of commands to the console
console.log(yargs.argv)
