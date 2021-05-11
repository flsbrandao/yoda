require("dotenv").config({
  path: ".env"
})

const express = require('express')
const mongoose = require('mongoose')
const routes = require('../app/routes/routes')

const app = express()

app.use(express.json())

mongoose.connect(`mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(routes)

app.use((req, res, next) => {
  return res.status(404).json({message: "Route invalid"})
});

app.use((error, req, res, next) => {
  console.log(error)
  return res.status(500).json({message: "Error"})
})

module.exports = app