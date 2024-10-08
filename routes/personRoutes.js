const express=require('express');
const router=express.Router(); 
const Person=require('./../models/Person');

router.post('/',async(req,res)=>{
    try {
      const data=req.body;//Assuming the request body contains the person data;
      //creating a new person document using the mongoose model
      const newPerson=new Person(data);
      //save the new person to the database
      const response=await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    }
     catch (err) {
      console.log('Error saving person:',err)
        res.status(500).json({error:'Internal server error'})
       }
  
  
    
  })
//GET method to get the person
  router.get('/',async(req,res)=>{
    try{
      const data= await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'})
  
    }
  })

  router.get('/:workType',async(req,res)=>{
    try{ 
     const workType=req.params.workType;
     if(workType=='chef'||workType=='manager'||workType=='waiter'){
         const response=await Person.find({work:workType});
         console.log("rseponse fetched");
         res.status(200).json(response);
   
     }
     else{
       res.status(404).json({error:'invalid worktype'});
   
     }
   }catch(err){
     console.log(err);
     res.status(500).json({error:'Internal Server Error'});
   }
   })
   router.put('/:id',async(req,res)=>{
    try{
      const personId=req.params.id;//Extract the id from the url parameter
      const updatedPersonData=req.body;//Updated data for the person
      const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new:true,//Return the updated document
        runValidators:true,//Run Mongoose Validation
      });
      if(!response){
        return res.status(404).json({error:'person not found'});
      }
      console.log('data updated');
      res.status(200).json(response);

    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'})

    }

   })
   router.delete('/:id',async(req,res)=>{
    try{
      const personId=req.params.id;
      const response=await Person.findByIdAndDelete(personId);
      if(!response){
        return res.status(404).json({error:'person not found'});
      }
      console.log('data deleted');
      res.status(200).json({message:'person deleted sucessfully'});

    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'})

    }
   })
  

   module.exports=router;