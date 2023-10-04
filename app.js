const express = require('express');
const app = express();

app.use(express.static("public"));

app.get("/", function (req, res){
    res.sendFile(__dirname+"/index.html");
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is up at 3000");
});