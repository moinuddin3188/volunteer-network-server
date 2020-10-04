const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').ObjectID;
require('dotenv').config()



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zkovl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


client.connect(err => {
    const volunteerCollection = client.db("Volunteers").collection("volunteers-info");
    const categoryCollection = client.db("Volunteers").collection("categories");

    app.post('/addCategories', (req, res) => {
        const newCategory = req.body;
        categoryCollection.insertOne(newCategory)
        .then(result => {

        })
    })

    app.get('/categories', (req, res) => {
        categoryCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.get('/category/:id', (req, res) => {
        categoryCollection.find({id: req.params.id})
        .toArray((err, documents) => {
            res.send(documents[0])
        })
    })

    app.post('/addVolunteerInfo', (req, res) => {
        const volunteerInfo = req.body;
        volunteerCollection.insertOne(volunteerInfo)
        .then(result => {
        
        })
    })

    app.get('/volunteerInfo/:email', (req, res) => {
        volunteerCollection.find({email: req.params.email})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.delete('/deleteRegistration/:id', (req, res) => {
        volunteerCollection.deleteOne({_id: objectID(req.params.id)})
        .then(result => {

        })
    })

    app.get('/volunteerList', (req, res) => {
        volunteerCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.delete('/deleteVolunteer/:id', (req, res) =>{
        volunteerCollection.deleteOne({_id: objectID(req.params.id)})
        .then( result => {
        
        })
    })

    console.log("Database connected")
});




app.listen(5000);