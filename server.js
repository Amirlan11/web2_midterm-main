const express = require("express");
const app = express();
const port = 3000;
const bodyParser=require("body-parser");
const ejs=require("ejs");
const https = require("https");
const UserRoute = require('./routes/User.js');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const router = express.Router();


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


app.use('/user', UserRoute)


const UserModel = require('C:\\Users\\User\\Desktop\\сабақ\\web2_midterm-main\\models\\user.js')

app.post('/booking',function (req ,res){
    let newUser=new UserModel({
        FirstName: req.body.FirstName,
        LastName:req.body.LastName,
        Email:req.body.Email,
        GuestNumber:req.body.GuestNumber,
        TableType:req.body.TableType,
        Placement:req.body.Placement,
        Date:req.body.Date,
        time:req.body.Time,
        Note:req.body.Note,
    })
    newUser.save();
    res.redirect("/booking")
})






app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);




