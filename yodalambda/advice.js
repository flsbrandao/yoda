'use strict';
const axios = require('axios')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const sender = nodemailer.createTransport(smtpTransport({
  host: 'YOUR SMTP',
  port: 465,
  secure: true,
  auth:{
    user: 'YOUR USER',
    pass: 'YOUR PASS'
  }
}))

module.exports.handle = async (event) => {
  
  try{

    const receiveMessage = event.Records[0].body

    const user = JSON.parse(receiveMessage)

    const advice = await axios.get('https://api.adviceslip.com/advice')

    if(!advice.data) throw "Error fetching advice"

    const yoda = await axios.get(`https://api.funtranslations.com/translate/yoda.json?text=${advice.data.slip.advice}`)

    if(!yoda.data) throw "Error fetching Yoda advice"

    const yoda_advice = yoda.data.contents.translated

    let message = `Hello ${user.name}. <br><br>

      Master Yoda sends this advice from Dagobah to the shire of ${user.city}. <br><br>

      <i>${yoda_advice}</i> <br><br>
      
      <br>May the force be with you</br>`

    await sender.sendMail({
      from: "YOUR EMAIL",
      to: user.email,
      subject: `Master Yoda's Advice`,
      html: message
    })

    return {
      statusCode: 200,
      message: "Successfully sent advice"
    }

  }catch(err){
    return {
      statusCode: 500,
      err
    }
  }

};
