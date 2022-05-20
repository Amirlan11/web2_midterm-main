const express = require("express");
const app = express();
//const port = 3000;
const bodyParser=require("body-parser");
const ejs=require("ejs");
const https = require("https");

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const router = express.Router();
const { kStringMaxLength } = require('buffer');

app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', require('./routes/indexRouter.js'))
app.use('/menu', require('./routes/menuRouter.js'))
app.use('/about', require('./routes/aboutRouter.js'))
app.use('/contact', require('./routes/contactRouter.js'))
app.use('/booking', require('./routes/bookingRouter.js'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});



mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});




const User = require('./models/user')

// app.post('/booking',function (req ,res){
//     let newUser=new User({
//         FirstName: req.body.FirstName,
//         LastName:req.body.LastName,
//         Email:req.body.Email,
//         GuestNumber:req.body.GuestNumber,
//         TableType:req.body.TableType,
//         Placement:req.body.Placement,
//         Date:req.body.Date,
//         time:req.body.Time,
//         Note:req.body.Note,
//     })
//     newUser.save();
//     res.redirect("/booking")
// })
app.post("/booking",(req,res)=>{
    var FirstName = req.body.FirstName;
    var  LastName =req.body.LastName;
        var Email=req.body.Email;
        var GuestNumber=req.body.GuestNumber;
        var TableType=req.body.TableType;
        var Placement=req.body.Placement;
        var Date=req.body.Date;
        var time=req.body.Time;
        var Note=req.body.Note;
    var newUser = {FirstName:FirstName,LastName:LastName,Email:Email,GuestNumber:GuestNumber,TableType:TableType,Placement:Placement,Date:Date,Time:time,Note:Note};
    User.create(newUser,(err,data)=>{
        if(err){
            console.log(err);
        }else {
            console.log(data);
            res.redirect("/booking");
        }
    })
})

const methodOverride = require("method-override");
app.use(methodOverride("_method"));



// app.get("/booking",(req, res)=>{
// User.find({},(err,docs)=>{
//         if (err) {console.log(err);
//         }else{
//             res.render("booking",{users: docs});
//         }
//     })
//
// })

// app.get('/', (req, res) => {
//     User.find({}, function(err, users) {
//         res.render('booking', {
//             usersList: users
//         })
//     })
// })

const moviesSchema = {
    title: String,
    genre: String,
    year: String
}

const Movie = mongoose.model('Movie', moviesSchema);

app.get('/', (req, res) => {
    Movie.find({}, function(err, movies) {
        res.render('index', {
            List: movies
        })
    })
})














let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}


app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);




