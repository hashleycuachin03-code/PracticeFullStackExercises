const express = require('express')
const app = express()

//To make Express show static content,
//the page index.html and the JavaScript, etc., 
//it fetches, we need a built-in middleware from Express called static.
app.use(express.static('dist'))
//without json parser the body property would be undefined
app.use(express.json())

//start the server and listen on port 3001
//bind the http server assigned to the app variable.
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
