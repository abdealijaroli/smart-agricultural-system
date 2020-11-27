app.use('/', (req, res) => {

    if(req.url === "/") {
    
        fs.readFile("./public/index.html", "UTF-8", function(err,html){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        })
    }
});