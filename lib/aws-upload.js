'use strict'

require('dotenv').load()
const AWS = require('aws-sdk')
const fs = require('fs')
const mime = require('mime')
const path = require('path')

// const Upload = require('./../app/models/upload')

// lets create a function that returns a promise
// we'll call it s3Upload
// This function takes two arguments: file, which is an object that holds the file we want to upload, and options that will be used during the actuall call to s3.upload
const s3Upload = function (file, options) {
  const stream = fs.createReadStream(file.path)

  const contentType = mime.getType(file.path)

  const ext = path.extname(file.path)

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

  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3()
    s3.upload(params, function (error, data) {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

const awsUpload = function (file) {
  return s3Upload(file)
}

module.exports = awsUpload
