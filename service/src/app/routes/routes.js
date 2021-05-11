const routes = require('express').Router()
const UserController = require('../controller/UserController')

routes.post('/users', UserController.store)
routes.delete('/users/:email', UserController.destroy)

module.exports = routes