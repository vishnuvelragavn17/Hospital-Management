const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongoDB = async () => {

  const url = process.env.MONGO_URI;


  //mongodb:'//localhost:27017/mydb'

  mongoose.connect(url, { //database name
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB:', err));

  //function we should create and put this code in this function
}
module.exports = connectToMongoDB;
