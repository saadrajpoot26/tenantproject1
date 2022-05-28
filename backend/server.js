const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.options('/api/tenant/login', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
});

app.use('/api/tenant', require('./routes/tenantRoutes'))
app.use('/api/hotel', require('./routes/hotelRoutes'))
app.use('/api/police', require('./routes/policeRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started at ${port}`))