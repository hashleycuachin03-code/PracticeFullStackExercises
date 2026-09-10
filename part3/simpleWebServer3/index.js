//import the http module for create server
const http = require('http')
const express = require('express')
const app = express()


let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can only execute javaScript",
        important: false 
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

//application variable to hold the server instance
const App = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(notes))
})

//two routes:
//defines an event handler that is used to handle HTTP GET requests made to the application's / root
app.get('/', (request, response) => {
    response.send('<h1> Hello World!</h1>')
})
//defines an event handler that handles HTTP GET requests made to the notes path of the application
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})
//start the server and listen on port 3001
//bind the http server assigned to the app variable.
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

