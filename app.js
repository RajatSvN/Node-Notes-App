const notes = require('./notes.js'); 
const validator = require('validator'); // npm module, can be used after npm install
const yargs = require('yargs');
const { readNote } = require('./notes.js');

// console.log(myNotes);
// console.log(validator.isEmail('contact@devrajat.com'));
// console.log(validator.isURL('devrajat.com'));

// // command line arguments of array
// console.log(process.argv);

// customise yargs version
yargs.version('1.1.0')

// add, remove, read, list

// create add command , requires title and body of the note

yargs.command({
    command : "add",
    describe: 'Add a new note',
    builder: { // define the input options in builder object
        title: {
            describe : 'Note Title',
            demandOption: true, // value is required
            type: 'string' // value provided needs to be a string, not provided then it is empty string instead of boolean
        } ,
        body: {
            describe: 'Note Body',
            demandOption: true, 
            type: 'string' 
        }
    },
    handler: function(argv){
        notes.addNote(argv.title, argv.body);
    }
})

// create remove command , needs title of the note you want to remove 

yargs.command({
    command : "remove",
    describe: 'Remove a note',
    builder:{ // define the input options in builder object
        title: {
            describe : 'Note Title',
            demandOption: true, 
            type: 'string' 
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
})

// Read Command , needs titles of notes you want to list 

yargs.command({
    command : "read",
    describe: 'Reading a note',
    builder:{
        title: {
            describe : 'Note Title',
            demandOption: true, 
            type: 'string' 
        }
    },
    handler(argv){
        readNote(argv.title);
    }
})

// List Command , lists the titles of nodes you want to read

yargs.command({
    command : "list",
    describe: 'Listing the note',
    handler(){
       notes.listNotes()
    }
})

// yargs.parse() needs to be written to actually see the command line arguments , alternatively console.log()

yargs.parse() ; 



