const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || ''

module.exports = mongoose.connect(MONGODB_URI, {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true
})
.then(() => console.log('[DB] Connected'))
.catch(console.error)