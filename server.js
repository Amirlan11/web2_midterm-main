const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const ejs = require('ejs')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const app = express();
const PORT = 3000;


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.set('view engine', ejs);
app.engine('ejs', require('ejs').__express);

app.use(methodOverride('_method'))

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const https = require("https");

const dbConfig = require('./config/database.config.js');



app.set('view engine', 'ejs')

app.use('/', require('./routes/indexRouter.js'))
app.use('/menu', require('./routes/menuRouter.js'))
app.use('/about', require('./routes/aboutRouter.js'))
app.use('/contact', require('./routes/contactRouter.js'))
app.use('/booking', require('./routes/bookingRouter.js'))
app.use('/admin', require('./routes/adminRoute'))
app.use('/signup', require('./routes/signupRoute'))

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



app.get('/', (req, res) => {
    res.render('/');
});

app.get('/find', (req, res) => {
    res.render('find');
});

app.get('/update', (req, res) => {
    res.render('update');
});

app.get('/delete', (req, res) => {
    res.render('delete');
});










let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}


app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);




