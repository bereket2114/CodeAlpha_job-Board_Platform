require('dotenv').config({path: './config/.env'});
const passport = require('passport')
const session = require('express-session')

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { MongoStore } = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const methodOverride = require('method-override')
const connectDB = require('./config/DB_Connection')
const employers = require('./route/employersRoute');
const resume = require('./route/resume-Route');
const candidates = require('./route/candidateRoute');
const register = require('./route/userRoutes');


// Passport config
require('./config/passportConfig')(passport) 

connectDB()

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev') )

// Session middleware
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60* 60* 24, // session dead after 24 hour and ask new login
        httpOnly: true, //avoid client-side JS messing with cookies
        sameSite: 'lax'  // avoid CSRF issues

      },
      store: MongoStore.create({ mongoUrl: process.env.DB_String }),
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Method override middleware
app.use(methodOverride("_method"))


// Routes
app.use('/', candidates);
app.use('/employers', employers);
app.use('/resume', resume);
app.use('/register', register);


// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});