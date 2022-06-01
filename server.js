const express = require("express");
const mongoose = require("mongoose");
const ejs = require('ejs')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const dbConfig = require('./config/database.config.js');
const https = require("https");
const app = express();

const foodRoute = require('./routes/admin-routes');

// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerOptions = require('./swagger/swagger.json');
const swaggerDocument = swaggerJsDoc(SwaggerOptions);


app.use(express.json())
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Methods",'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers",'Content-Type,Authorization');
    next();
})

app.use('/api', foodRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message:message});
})

// authentification
const session = require('express-session');
const passport = require('passport');
require('./auth');

// Middleware to check if the user is authenticated
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
    ));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/booking',
        failureRedirect: '/auth/google/failure'
    })
);

app.get('/booking', isLoggedIn, (req, res) => {
    // res.send(`Hello ${req.user.displayName}`);
    // {name: req.user.displayName}
    console.log(req.user)
    res.render('booking');
});

app.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        console.log(`-------> User Logged out`)
        res.redirect('/');
    });
});

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

const PORT = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.set('view engine', ejs);
app.engine('ejs', require('ejs').__express);
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// routes

app.set('view engine', 'ejs')

app.use('/', require('./routes/indexRouter.js'))
app.use('/menu', require('./routes/menuRouter.js'))
app.use('/about', require('./routes/aboutRouter.js'))
app.use('/contact', require('./routes/contactRouter.js'))
app.use('/booking', require('./routes/bookingRouter.js'))
app.use('/admin', require('./routes/adminRoute'))
app.use('/signup', require('./routes/signupRoute'))

///database connection
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
//crud

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




