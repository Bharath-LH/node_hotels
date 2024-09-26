const mongoose=require("mongoose");
require('dotenv').config();
//Define yoour MongoDb connection url
//const mongoURL='mongodb://localhost:27017/hotel'
//const mongoURL=process.env.MONGODB_URL_LOCAL //Replace this your database
const mongoURL=process.env.MONGODB_URL;
//const mongoURL='mongodb+srv://helloworld:Qwerty12345@cluster0.ukbgf.mongodb.net/'
mongoose.connect(mongoURL, {
     useNewUrlParser:true,
    useUnifiedTopology:true

})

  
const db=mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to MongoDB server");
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});


db.on('disconnected',()=>{
    console.log("Disconnected to MongoDB server");
});

//Export the database conection
module.exports=db;