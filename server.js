const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const mongoURI = 'mongodb://localhost:27017/'
const db = mongoose.connection
const app = express()
app.use(express.static('public'))
mongoose.connect('mongodb://localhost:27017/podcast', () => {
  console.log('The connection with mongod is established')
})
// links the connection to the host
app.listen(3000, () => {
  console.log('listening')
})

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Importing schema and data
const Data = require('./models/data.js')
const Schema = require('./models/schema.js')

// Saving data into db

// Schema.create(Data, (err, data) => {
//   if (err) {
//     console.log(err.message)
//   } else {
//     console.log(data)
//   }
// })

// Schema.collection.drop()

app.get('/', (req, res) => {
  Schema.find({}, (error, allPodcasts) => {
    res.render('index.ejs', { data: allPodcasts })
  })
})

app.get('/new', (req, res) => {
  res.render('new.ejs')
})

app.get('/:id', (req, res) => {
  Schema.findById(req.params.id, (error, podcast) => {
    res.render('show.ejs', { data: podcast })
  })
})
//Receving added task
app.post('/', (req, res) => {
  Schema.create(req.body, (error, createdPodcast) => {
    console.log('Podcast created')
    res.redirect('/')
  })
})

app.get('/:id/edit', (req, res) => {
  Schema.findById(req.params.id, (error, podcast) => {
    res.render('edit.ejs', { data: podcast })
  })
})

app.put('/:id', (req, res) => {
  Schema.findOneAndUpdate(req.params.id, req.body, { new: true }, (error, podcast) => {
    res.render('show.ejs', { data: podcast })
  })
})

app.delete('/:id', (req, res) => {
  Schema.findByIdAndRemove(req.params.id, { new: true }, (error, podcast) => {
    res.redirect('/')
  })
})



/////////////////////JQUERY/////////////////

