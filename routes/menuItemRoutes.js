const express=require('express');
const router=express.Router();

const MenuItem=require('./../models/MenuItem')

router.post('/',async(req,res)=>{
    try {
      const data=req.body;//Assuming the request body contains the person data;
      //creating a new person document using the mongoose model
      const newMenu=new MenuItem(data);
      //save the new person to the database
      const response=await newMenu.save();
      console.log('data saved');
      res.status(200).json(response);
    }
     catch (err) {
      console.log('Error saving person:',err)
        res.status(500).json({error:'Internal server error'})
       }
  
  
    
  })
  router.get('/',async(req,res)=>{
    try{
      const data= await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'})
  
    }
  })
  
  router.get('/:tasteType',async(req,res)=>{
    try{ 
     const tasteType=req.params.tasteType;
     if(tasteType=='sweet'||tasteType=='spicy'||tasteType=='sour'){
         const response=await MenuItem.find({taste:tasteType});
         console.log("rseponse fetched");
         res.status(200).json(response);
   
     }
     else{
       res.status(404).json({error:'invalid tastetype'});
   
     }
   }catch(err){
     console.log(err);
     res.status(500).json({error:'Internal Server Error'});
   }
   })
   router.put('/:id',async(req,res)=>{
    try{
      const MenuId=req.params.id;//Extract the id from the url parameter
      const updatedMenuData=req.body;//Updated data for the person
      const response=await MenuItem.findByIdAndUpdate(MenuId,updatedMenuData,{
        new:true,//Return the updated document
        runValidators:true,//Run Mongoose Validation
      });
      if(!response){
        return res.status(404).json({error:'Item not found'});
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
      const MenuId=req.params.id;
      const response=await MenuItem.findByIdAndDelete(MenuId);
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