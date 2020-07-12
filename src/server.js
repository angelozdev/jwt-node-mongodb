const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv')

/* Routes */
const userRoutes = require('./routes/user.routes')

// Init
const app = express()
dotenv.config()

// Settings
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 4000)

// Middlewares

// Routes
app.use(userRoutes)

// Global Variables

// Static Files


module.exports = app;