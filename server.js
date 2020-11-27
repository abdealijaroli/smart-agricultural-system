const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var path = require('path');
var fs = require('fs');
var http = require('http');
var createFile = require('create-file');
var PythonShell = require('python-shell');
var jsonfile = require('jsonfile')



var urlencoded = bodyParser.urlencoded({ extended: false });


app.post('/location',urlencoded, (req, res) => {
    var location = req.body.location;
    console.log('location: '+location);
    //res.send('You are now at ' + location);
   



  
//python code here *************************
var options = {
    mode: 'text',
   // pythonPath: 'C:/Python27',
    pythonOptions: ['-u'],
   // scriptPath: 'code',
    args: location
  };

// call to python code mlr_algo   

 PythonShell.run('code/mlr_algo.py',options, function (err, results) {
   if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results', results[0]);
    res.send( results[0]);

 });


  //}); python ends here *******************************

 
 }); 

 //home page and routing of pages according to url
app.use(express.static('./public'));
app.use('/', function(req,res){

if(req.url === "/") {
    res.sendFile('index')
}
else if(req.url.match("\.css$")){
    
    var csspath = path.join(__dirname,'public',req.url);
    var fileStream = fs.createReadStream(csspath, "UTf-8");
    res.writeHead(200,{"content-Type": "text/css"});
    fileStream.pipe(res);

}
else if(req.url.match("\.js$")){
    
    var jspath = path.join(__dirname,'public',req.url);
    var fileStream = fs.createReadStream(jspath, "UTf-8");
    res.writeHead(200,{"content-Type": "scripts/js"});
    fileStream.pipe(res);

}
else if(req.url.match("\.png$")){
    
    var pngpath = path.join(__dirname,'public',req.url);
    var fileStream = fs.createReadStream(pngpath);
    res.writeHead(200,{"content-Type": "images/png"});
    fileStream.pipe(res);  
}
else if(req.url.match("\.jpg$")){
    
    var jpgpath = path.join(__dirname,'public',req.url);
    var fileStream = fs.createReadStream(jpgpath);
    res.writeHead(200,{"content-Type": "images/jpg"});
    fileStream.pipe(res);  
}
else if(req.url === "/aboutus"){
    res.sendFile('aboutus')
}
else if(req.url === '/contact'){
    res.sendFile('contact')
} 
console.log(req.url);
});


app.listen(8900, () => {
  console.log("Started on http://localhost:8900");
});

