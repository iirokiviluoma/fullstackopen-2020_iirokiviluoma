const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Haetaan kaikki käyttäjät
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  return response.json(users)
})

// Lisätään käyttäjä
usersRouter.post('/', async (request, response, next) => {
  const reqBody = request.body

  if (reqBody.password.length < 3) {
    response.status(400).send({ error: 'password must be at least 3 characters.'})
  }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(reqBody.password, saltRounds)

  const user = new User({
    username: reqBody.username,
    passwordHash: passwordHash,
    name: reqBody.name
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
