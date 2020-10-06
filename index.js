const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Dulal:dulal1234@cluster0.ml5ji.mongodb.net/volunteer?retryWrites=true&w=majority";
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology:true });
client.connect(err => {
  const collection = client.db("volunteer").collection("volunteerList");
  //create data 
  app.post('/addVolunteer',(req,res)=>{
      const volunteer = req.body;
      collection.insertOne(volunteer)
      

  })
  //read
  app.get('/volunterr',(req,res)=>{
    
    collection.find({email:req.query.email})
    .toArray((err,documents)=>{
     res.send(documents);
    })
  })
  //delete
  app.delete('/delete',(req,res)=>{
    collection.deleteOne({id:req.query.id})
    .then(result=>{
      res.send(result.deletedCount>0)
    })
  })

  
});











app.listen(process.env.PORT || 5000);