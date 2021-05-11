const AWS = require('aws-sdk')

AWS.config.update({region: 'sa-east-1'})

const sqs = new AWS.SQS({apiVersion: '2012-11-05' })

module.exports = { sqs, QueueUrl: process.env.QUEUEURL}