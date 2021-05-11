const app = require('./config/custom-express')
const cron = require('./app/cron/cron')

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`)
  cron()
})