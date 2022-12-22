const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
	// eslint-disable-next-line no-unused-vars
	.then(result => {    
		console.log('connected to MongoDB')  
	}).catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

const bugSchema = new mongoose.Schema({
	formula: {
		type: String,
		required: true
  },
	description: {
		type: String,
	},
  name: {
    type: String,
  }
})

bugSchema.set('toJSON', {
	transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Bug', bugSchema)