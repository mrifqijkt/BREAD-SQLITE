const express = require('express')
const bodyParser = require('body-parser')
const fs = require('node:fs');
import  sqlite3  from 'sqlite3';

const app = express()

let rawdata = fs.readFileSync('data.json');
let bread = JSON.parse(rawdata)

const port = 3000

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', { bread })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})