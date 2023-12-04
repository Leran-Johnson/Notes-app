//Calls the fs and chalk files and allows use of the installed NPM fs and chalk commands
const fs = require('fs')
const chalk = require('chalk')

//function to add notes to the note.json file
const addNote = (title, body) => {
    //runs the notes.json file
    const notes = loadNotes()
    //Checks for duplicate and stops if it finds one
    const duplicateNote = notes.find((note) => note.title === title)

    //If duplicateNotes returns undefined note will be added else its a duplicate
    if (!duplicateNote) {
        //pushes title and body to the notes.json file
        notes.push({
            title: title,
            body: body
        })
        //logs string to console in green and inversed
        console.log(chalk.green.inverse('New note added!'))
    } else {
        //logs string to console red and inversed
        console.log(chalk.red.inverse('Note title taken!'))
    }
    //saves changes to notes.json file
    saveNotes(notes)
}

//function to remove notes from the notes.json file
const removeNote = (title) => {
    //runs the notes.json file
    const notes = loadNotes()
    //checks to see if a note title on the json file is the same as the one inputed into terminal if true then its removed
    const notesToKeep = notes.filter((note) => note.title !== title)
    //if a note has been removed code will run else nothing changed and else statement runs
    if (notes.length > notesToKeep.length) {
        //logs string with green background
        console.log(chalk.bgGreen('Note removed!'))
        //save changes to json file
        saveNotes(notesToKeep)
    } else {
        //logs string with red background
        console.log(chalk.bgRed('No note removed!'))
    }

}

//logs all notes to the console from json file
const listNotes = () => {
    //runs the notes.json file
    const notes = loadNotes()
    //logs string inversed
    console.log(chalk.inverse('Your Notes'))

    //This will run for each note and log to the console the title of each note
    notes.forEach(notes => {
        //logs title and body for each note
        console.log(notes.title, notes.body)
    });
}

const readNotes = (title) => {
    //runs notes.json
    const notes = loadNotes()
    //check to see if the argument is equal to an exisiting note
    const note = notes.find((note) => note.title === title)
    //if condition is true code will run and log the title and body of requested note
    if (note) {
        //logs note title with inverse
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        //logs string in red with inverse
        console.log(chalk.red.inverse('No note found?'))
    }
}

//Used to update the notes.json file when add or remove is used
const saveNotes = (notes) => {
    //turns JS string into json string
    const dataJSON = JSON.stringify(notes)
    //writes/adds/removes things on the json file
    fs.writeFileSync('notes.json', dataJSON)
}

//Tries to read note file will run catch if file does not exist
const loadNotes = () => {
    //Tries to run the code and if it fails it stops and runs the catch
    try {
        //tries to load the notes.json file
        const dataBuffer = fs.readFileSync('notes.json')
        //converts data into a readable string
        const dataJSON = dataBuffer.toString()
        //tries to parse the json string into a javascript object and return it
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

//Exports listed variables/functions and allows them to be called in other documents
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}