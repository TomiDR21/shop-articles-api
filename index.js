const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes.js')
const myconn = require('express-myconnection')
const mysql = require('mysql2')


const dbOptions = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '6743',
    database: 'listaproductos'
}


// ----middlewares
app.use(cors())
app.use(express.json())
app.use(myconn(mysql, dbOptions, 'single'))

// ----server running
app.listen(5000, () =>{
    console.log('server running on port 5000')
})

// ----routes

app.use('/', routes)