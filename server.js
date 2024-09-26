const express = require('express');
const app = express();
const db=require('./db');
require('dotenv').config();
app.use(express.json()); 
const bodyParser=require('body-parser');
app.use(bodyParser.json());//req.body

const PORT=process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('welcome to our hotel')
})

// app.post('./person',async(req,res)=>{
//   const data=req.body;//Assuming the request body contains the person data

//   //creating a new person model using mongoose schema
//   const newPerson=new Person(data);
//   newPerson.save((error,savedPerson)=>{
//     if(error){
//       console.log('Error saving person:',error)
//       res.status(500).json({error:'Internal server error'})
//     }
//       else{
//         console.log("Data saved succesfully");
//         res.status(200).json({sucess:'saved'})

//       }
    

//   })



//Import the router files
const personRoutes=require('./routes/personRoutes');
//Use the routers
app.use('/person',personRoutes);

const menuItemRoutes=require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes)



app.listen(PORT,()=>{
console.log("Listening on port 3000")
})
