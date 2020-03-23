const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection
console.log('Connecting to database...')
db.on('error', (error) => console.error('DB Connection Error',error))
db.once('open', () => console.log('Connected to database'))