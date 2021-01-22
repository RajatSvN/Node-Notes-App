const chalk = require('chalk');
const { Console } = require('console');
const fs = require('fs') // core package 

// add note function 

const addNote = (title, body) => {

    const notes = loadNotes() ;
    
    // find() is better 
    const duplicateNote = notes.filter(note => note.title === title);

    // const duplicateNote = notes.find(note => note.title === title), if not then add otherwise duplicate

    if(duplicateNote.length != 0){
        console.log("The note with given title already exist!");
        return;
    }

    notes.push({
        title: title,
        body: body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("Note Added Successfully!"));

}

const removeNote = (title) => {

    const notes = loadNotes() ;
    
    const requiredNotes = notes.filter(note => note.title !== title);

    if(requiredNotes.length < notes.length){
        saveNotes(requiredNotes);
        console.log(chalk.green.inverse("Note Deleted Successfully!"));
        return; 
    }

    console.log(chalk.red.inverse("No Note found!"));

}

const saveNotes = (notes) => {

    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);

}

const loadNotes = () => {

    try{

        const dataBuffer = fs.readFileSync('notes.json');
        const dataString = dataBuffer.toString() ;
        const dataJSON = JSON.parse(dataString);

        return dataJSON;

    }catch (e){

        return [] ;

    }

}

const listNotes = () => {

    const notes = loadNotes() ;

    notes.forEach((note) => {

        console.log(chalk.green.inverse(note.title));

    });

}

const readNote = (title) => {

    const notes = loadNotes() ;

    const myNote = notes.find(note => note.title === title);

    if(myNote){
        console.log(chalk.blueBright.inverse(myNote.body));
        return;
    }

    console.log(chalk.red.inverse("Note with given title Not Found :( "));

}

module.exports = {
    addNote : addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}