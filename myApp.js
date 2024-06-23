let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');


absolutePath=__dirname + '/views/index.html'
expressStaticPath= __dirname + '/public'

//middlewares
app.use('/public',express.static(expressStaticPath));

//#11
app.use(bodyParser.urlencoded({extended:false}));

//#7 challenge
app.use((req,res,next)=>{
    var string = `${req.method} ${req.path} - ${req.ip}`
    console.log(string);
    next();
});


//routes 


//console.log("Hello World");
app.get('/',(req,res)=>{
    res.sendFile(absolutePath);
});


app.get('/json',(req,res)=>{
let lcvresponse = "Hello json";

if(process.env.MESSAGE_STYLE==="uppercase"){
    res.json({"message": lcvresponse.toUpperCase()});
}
else{
    res.json({"message": lcvresponse});

}
});


//#8
app.get('/now',(req,res,next)=>{
    req.time = new Date().toString();
    next()
},(req,res,next)=>{
    
    res.send({
        time: req.time});
});

//#9
app.get('/:word/echo',(req,res)=>{

    res.json({echo : req.params.word});
});

//#10 api endpoint
app.get("/name",(req,res)=>{
    var firstName = req.query.first;
    var lastName = req.query.last;

    res.json({name: firstName +" " +lastName });
});

//#12
app.post("/name",(req,res)=>{
    var firstName = req.body.first;
    var lastName = req.body.last;

    res.json({name: firstName +" " +lastName });
})











 module.exports = app;
