'use strict'

const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  restaurant_id: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const List = mongoose.model('List', listSchema)

module.export = List
