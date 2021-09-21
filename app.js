const express = require("express");
const app = express();
const path = require("path");
const port = 80;
const fs = require("fs");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    Email: String,
    phn: String
  });
const Contact = mongoose.model('Contact', contactSchema);

// express specific stuff
app.use('/static',express.static('static'))
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


// endpoints
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("Contact has been saved to database")
    }).catch(()=>{
    res.status(400).send("Contact has not been saved to database")
});

// res.status(200).render('/contact.pug',params);
})


//start the server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});