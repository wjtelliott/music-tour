// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')



// SEQUELIZE CONNECTION
let sequelize = new Sequelize({  
    username: "postgres",
    password: "w@289461",
    host: '127.0.0.1',
    storage: process.env.PG_URI,
    dialect: "postgres"});

try {
    sequelize.authenticate();
    console.log('Connected with Sequelize!');
} catch (e) {
    console.log("err, ", e);
}

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// CONTROLLERS 
const bandsController = require('./controllers/band_controller')
app.use('/bands', bandsController)
app.use('/stages', require('./controllers/stage_controller'))
app.use('/events', require('./controllers/events_controller'))

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})