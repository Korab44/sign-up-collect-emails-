const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.urlencoded( {extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html');

    app.post('/', function(request, response) {
        var firstName = request.body.fname;
        var lastName = request.body.lname;
        var email = request.body.email;
        console.log(firstName, lastName, email)
    })
})

app.listen(3000, function() {
    console.log('Server is running on port 3000')
  })