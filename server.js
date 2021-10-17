const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://yousefdb:supersecret123@cluster0.vu4z6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('vehicles');
    const vehiclesCollection = db.collection('vehicles')
    app.post('/vehicles', (req, res) => {
      vehiclesCollection.insertOne(req.body)
      .then(result => {
        console.log(result)
      })
      .catch(error => console.error(error))
    })
    app.get('/vehicles', (req, res) => {
      db.collection('vehicles').find().toArray()
        .then(results => {
        console.log(results, 'results')
        })
        .catch(error => console.error(error))
    // ...
    })
    app.put('/vehicles', (req, res) => {
    fetch('/vehicles', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vadar',
            quote: 'I find your lack of faith disturbing.'
        })
        })
    })
    app.delete('/vehicles', (req, res) => {
        vehiclesCollection.deleteOne(
            { name: req.body.name },
            options
          )
            .then(result => {/* ... */})
            .catch(error => console.error(error))
    })
  })
  .catch(error => console.error(error))
// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//     const db = client.db('yousefdb')
//   })
app.listen(3000, function() {
  console.log('listening on 3000')
})
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is the current directory you're in. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})