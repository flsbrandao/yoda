const cron = require('node-cron')
const User = require('../model/User')
const sqsAws = require('../aws/sqs')

module.exports = () => {
  //Cron programado para rodar todos os dias às 8h
  cron.schedule('0 0 8 * * *', async () => {

    try{

      const users = await User.find()
      
      await Promise.all(

        users.map(async user => {

          await sqsAws.sqs.sendMessage({
              MessageBody: JSON.stringify(user),
              QueueUrl: sqsAws.QueueUrl
            }).promise()

        })
      )

    }catch(err){
      console.log(err)
    }

  })

}