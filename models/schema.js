const mongoose = require('mongoose')

const podSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String,
  genre: String,
  hosts: String,
  date: String,
  preview: String
})

const Schema = mongoose.model('Schema', podSchema)

module.exports = Schema
