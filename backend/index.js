const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const User = require ('./models/User');
const Client = require ('./models/Client');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/practice_mern');

app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            User.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})
app.get('/api/allclients', async (req, res) => {
    try {
      const clients = await Client.find();  // Add 'await' here
      res.json(clients);                    // Send the response directly
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ error: "Failed to fetch clients" });
    }
  });
  
  // Create new client

  app.post('/api/clients', (req, res)=>{
    // To post / insert data into database
    const client = new Client(req.body);
    console.log('Request body is'+req.body.plan);
    client.save();
          //  Client.create(req.body)
           res.json("success");
        
        }
    )
    


/*app.post('/api/clients', (req, res) => {
    try {
      const client = new Client(req.body);
      console.log(`Body is ${req.body}`);
      await client.save();
      res.json(client);
    } catch (error) {
      res.json({ error: 'Error creating client' });
    }
  });*/
app.listen(5001, () => {
    console.log("Server listining on http://127.0.0.1:5001");

});