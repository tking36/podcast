const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const mongoURI = 'mongodb://localhost:27017/'
const db = mongoose.connection
require('dotenv').config()
const app = express()
app.use(express.static('public'))
const MONGODB_URI = process.env.MONGODB_URI;
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

//Home Page
app.get('/', (req, res) => {
  Schema.find({}, (error, allPodcasts) => {
    res.render('index.ejs', { data: allPodcasts })
  })
})

//New Page
app.get('/new', (req, res) => {
  res.render('new.ejs')
})

//Comedy Page
app.get('/comedy', (req, res) => {
    Schema.find({}, (error, allPodcasts) => {
      res.render('comedy.ejs', { data: allPodcasts })
    })
  })

  //History Page
  app.get('/history', (req, res) => {
    Schema.find({}, (error, allPodcasts) => {
      res.render('history.ejs', { data: allPodcasts })
    })
  })

  //Reality Page
  app.get('/reality', (req, res) => {
    Schema.find({}, (error, allPodcasts) => {
      res.render('reality.ejs', { data: allPodcasts })
    })
  })

  //Talk Page
  app.get('/talk', (req, res) => {
    Schema.find({}, (error, allPodcasts) => {
      res.render('talk.ejs', { data: allPodcasts })
    })
  })

  //TrueCrime Page
  app.get('/truecrime', (req, res) => {
    Schema.find({}, (error, allPodcasts) => {
      res.render('truecrime.ejs', { data: allPodcasts })
    })
  })

//Show Page
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

//Edit Page
app.get('/:id/edit', (req, res) => {
  Schema.findById(req.params.id, (error, podcast) => {
    res.render('edit.ejs', { data: podcast })
  })
})

//Edit
app.put('/:id', (req, res) => {
  Schema.findOneAndUpdate(req.params.id, req.body, { new: true }, (error, podcast) => {
    res.render('show.ejs', { data: podcast })
  })
})

//Delete
app.delete('/:id', (req, res) => {
  Schema.findByIdAndRemove(req.params.id, { new: true }, (error, podcast) => {
    res.redirect('/')
  })
})





