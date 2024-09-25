const mongoose=require("mongoose");
//Define yoour MongoDb connection url
const mongoURL='mongodb://localhost:27017/hotel'//Replace this your database

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true

}) 
const db=mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to MongoDB server");
});

db.on('error',()=>{
    console.log("MongoDB connection error",err);
});

db.on('disconnected',()=>{
    console.log("Disconnected to MongoDB server");
});

//Export the database conection
module.exports=db;