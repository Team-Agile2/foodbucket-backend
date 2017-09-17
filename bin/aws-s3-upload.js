// 'use strict'
//
// const mongoose = require('./../app/middleware/mongoose')
//
// const Upload = require('./../app/models/upload')
//
// const awsUpload = require('./../lib/aws-upload')
//
// // create an object to store the values passed in by
// // the user/command line
// const file = {
//   path: process.argv[2],
//   name: process.argv[3] || 'default'
// }
//
// // pass file to awsUpload and being promise chain
// awsUpload(file)
//   .then((s3Response) => {
//     return Upload.create({
//       url: s3Response.Location,
//       title: s3Response.Key
//     })
//   })
//   .then(console.log)
//   .catch(console.log)
//   .then(() => mongoose.connection.close())
