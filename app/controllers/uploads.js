'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Upload = models.upload

const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Upload.find()
  .then(uploads => {
    res.json({
      uploads: uploads.map((upload) =>
        upload.toJSON({ virtuals: true })
      )
    })
  })
  .catch(next)
}

const show = (req, res, next) => {
  res.json({
    upload: req.upload.toJSON({virtuals: true})
  })
}

module.exports = controller({
  index,
  show
}, {
  before: [
    { method: setModel(Upload), only: ['show'] }
  ]
})
