const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { json } = require('express/lib/response');
const { options } = require('request');

app.use(bodyParser.urlencoded( {extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', function(request, respo) {
        const firstName = request.body.fname;
        const lastName = request.body.lname;
        const email = request.body.email;
        
        
        
        const data = {
            members:[
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName
                    }
                }
            ]
        }

        const jsonData = JSON.stringify(data);
        const url = "https://us18.api.mailchimp.com/3.0/lists/4b2653c349";
        const options = {
            method: "POST",
            auth: "korab1:ca32e3c1ebd1fb5b1a280ab768655d28-us18"
        }
        const request1 = https.request(url, options, function(response) {
            
            if (response.statusCode === 200) {
                respo.sendFile(__dirname + "/success.html");
            } else {
                respo.sendFile(__dirname + "/failure.html");
            }

            response.on("data", function(data) {
                console.log(JSON.parse(data));
            })
        })
        // request1.write(jsonData);
        request1.end();
     })
     app.post('/failure', function(req, res) {
        res.redirect('/');
     })

app.listen(3000, function() {
    console.log('Server is running on port 3000')
  })

//   ca32e3c1ebd1fb5b1a280ab768655d28-us18
// list id 
// 4b2653c349