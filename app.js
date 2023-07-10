const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const db = require('./database')
const passport = require('passport')

const app = express()
require('./config/passport')(passport)
app.use(express.json())
app.use(passport.initialize())
app.use('/api/admin', require('./routes/admin'))
app.use('/api/matches', require('./routes/matches'))
app.use('/api/teams', require('./routes/teams'))
app.use('/api/players', require('./routes/players'))

// app.get('/notes', async(req, res)=>{
//     const notes = await db.getAllNotes()
//     res.json(notes)
// })

// app.get('/note/:id', async(req, res)=>{
//     const note = await db.getNoteById(req.params.id);
//     res.json(note)
// })

app.listen(8080, ()=>{
    console.log("server is up")
})