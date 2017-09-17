// 'use strict'
//
// const controller = require('lib/wiring/controller')
// const models = require('app/models')
// const Upload = models.upload
// const setModel = require('./concerns/set-mongoose-model')
// const multer = require('multer')
// const multerUpload = multer({dest: '/tmp'})
//
// const awsUpload = require('lib/aws-upload')
//
// const create = (req, res, next) => {
//   const upload = {
//     path: req.file.path,
//     title: req.body.image.title
//   }
//   console.log('upload image is', req.body.image)
//
//   awsUpload(upload)
//   .then((s3Response) => {
//     return Upload.create({
//       url: s3Response.Location,
//       title: s3Response.Key
//     })
//   })
//   .then((upload) => res.status(201).json({upload}))
//   .catch(next)
// }
//
// const update = (req, res, next) => {
//   req.upload.update(req.body.upload)
//   .then(() => res.sendStatus(204))
//   .catch(next)
// }
//
// const index = (req, res, next) => {
//   Upload.find()
//   .then(uploads => {
//     res.json({
//       uploads: uploads.map((upload) =>
//         upload.toJSON({ virtuals: true })
//       )
//     })
//   })
//   .catch(next)
// }
//
// const show = (req, res, next) => {
//   res.json({
//     upload: req.upload.toJSON({virtuals: true})
//   })
// }
//
// const destroy = (req, res, next) => {
//   console.log(req.upload)
//   req.upload.remove()
//   .then(() => res.sendStatus(204))
//   .catch(next)
// }
//
// module.exports = controller({
//   index,
//   show,
//   destroy,
//   create,
//   update
// }, {
//   before: [
//     { method: multerUpload.single('image[file]'), only: ['create'] },
//     { method: setModel(Upload), only: ['show', 'destroy', 'update'] }
//   ]
// })
