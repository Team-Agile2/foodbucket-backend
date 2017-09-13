'use strict'

// require env file
require('dotenv').load()

// require aws-sdk module
const AWS = require('aws-sdk')

// create a new instance of AWS.S3 object
const s3 = new AWS.S3()

// require fs module
const fs = require('fs')

// require mime module
const mime = require('mime')

// require node path module
const path = require('path')

// create an object to store the values passed in by
// the user/command line
const file = {
  path: process.argv[2],
  name: process.argv[3] || 'default'
}

// lets create a function that returns a promise
// we'll call it s3Upload
// This function takes two arguments: file, which is an object that holds the file we want to upload, and options that will be used during the actuall call to s3.upload
const s3Upload = function (file, options) {
  // print to make sure it does
  console.log("file you're uploading is ", file.path)

  // use node fs module to create a read stream
  // for our image file
  // https://www.sitepoint.com/basics-node-js-streams
  const stream = fs.createReadStream(file.path)

  const contentType = mime.getType(file.path)

  // use node path module to get image extension (.jpg, .gif)
  // https://nodejs.org/docs/latest/api/path.html#path_path
  const ext = path.extname(file.path)

  // get current date, turn into ISO string, and split to access formatted date
  const folder = new Date().toISOString().split('T')[0]

  // params require for `.upload` to work
  // more at documentation
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
  const params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${folder}/${file.name}${ext}`,
    Body: stream,
    ContentType: contentType
  }

  // return a promise object that is resolved or rejected, based on response from s3.upload
  return new Promise((resolve, reject) => {
    // pass correct params to s3.upload
    // and anonyous callback for handling response
    s3.upload(params, function (error, data) {
      // reject promise if error
      // resolve if no error
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

// pass file to s3Upload and being promise chain
s3Upload(file)
  .then(console.log)
  .catch(console.log)
