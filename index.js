require('dotenv').config()
const express = require('express')
const cors = require('cors')

const Bug = require('./models/bug')
const reportUpload = require('./mailer')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/api/bugs', (request, response) => {
	const e = Bug.find({})
	e.then((docs) => {
		response.json(docs)
	},(err) => next(err))
})

app.post('/api/bugs', (request, response, next) => {  
  console.log(request.body)
	const body = {
		formula: request.body.formula,
    description: request.body.description,
		name: request.body.name,
	}
	const bug = new Bug(body)
  reportUpload(body)
	bug.save().then(savedBug => {
		response.json({formula: savedBug.formula, description: savedBug.description, id:savedBug.id})
		}).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)
  
const errorHandler = (error, request, response, next) => {
	console.error(error.message)
	if (error.name === 'CastError')
		return response.status(400).send({ error: 'malformatted id' })
	else if (error.name === 'ValidationError')    
		return response.status(400).json({ error: error.message })
	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})