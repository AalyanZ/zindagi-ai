// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/zindagi", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

  require('dotenv').config();
  const mongoose = require('mongoose');
  
  mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB connection error:", err));
