const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

//The practice application assumes that it will be passed the
//password from the credentials we created in MongoDB Atlas
const password = process.argv[2];

const url = `mongodb+srv://hashleycuachin03_db_user:${password}@cluster0.cpzeokb.mongodb.net/noteApp?appName=Cluster0`;

mongoose.set("strictQuery", false);

//The connection to the database is established with the command:
mongoose.connect(url, { family: 4 });

//After establishing the connection to the database, we define the
//schema for a note and the matching model:
// schema tells Mongoose how the note objects are to be stored in the database.
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

//schemaModel to be put to DB, mongoose convetion convert name to 'notes' in db
const Note = mongoose.model("Note", noteSchema);

//Creating objects
const note = new Note({
  content: "HTML is easy",
  important: true,
});

//saving objects

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

//get all the objects in DB and view it in console
Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

//We could restrict our search to only include important notes like this:
Note.find({ important: true }).then(result => {
  // ...
})