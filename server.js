// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const exprees = require('express');

// Start up an instance of app
const app = exprees();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
// Enable All Cors Requests
app.use(cors());
// Initialize the main project folder
app.use(exprees.static('website'));
// Setup Server
const port = 4000;
const server = app.listen(port,()=>{console.log(`app is running on port ${port}`)});

//  get all data routes  

app.get('/all',getAllData)
function getAllData(req,res){
res.send(projectData)   
}
// post new Weather data route
app.post('/addData',postData)
function postData(req,res){   
    
  projectData = req.body
  res.send(projectData);
}
