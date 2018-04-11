const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/movie', 'movie', 27017, {user: 'xinzikang', pass: '3580706'});
mongoose.connect('mongodb://localhost:27017/movie');
const db = mongoose.connection;

db.on('error', err => {
  console.log('connect db err', err)
})

db.on('open', () => {
  console.log('connect db successfully')
})
