const express = require('express')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();

const app = express()
const port = 3000

const db = new sqlite3.Database('bread.db')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
    const page = req.query.page || 1
    const limit = 3
    const offset = (page - 1) * limit

    const params = []
    const sqlsearch = []

    if (req.query.nama) {
        params.push(req.query.nama)
        sqlsearch.push(`nama ilike $${params.length}`)
    }
    let sql = 'SELECT COUNT(*) AS count FROM bread'
    if (params.length > 0) {
        sql += `where ${sqlsearch.join('and')} `
    }
    console.log(sql)
    db.all(sql, params, (err, bread) => {
        const pages = Math.ceil(bread[0].count / limit)

        sql = 'SELECT * FROM bread'
        if (params.length > 0) {
            sql += `where ${sqlsearch.join('and')}`
        }
        params.push(limit, offset)
        sql += `limit $${params.length - 1} offset $${params.length}`

        console.log(sql)

        db.all(sql, params, (err, rows) => {
            if (err) {
                console.error(err);
            } else {
                res.render('index', { bread: rows, pages, page })
            }
        })
    })
})

app.get('/Add', (req, res) => {
    res.render('add')
})

app.post('/Add', (req, res) => {
    const { String, Integer, Float, Date, Boolean } = req.body

    const query = `INSERT INTO bread(String,Integer,FLoat,Date,Boolean) VALUES (?,?,?,?,?)`
    const values = [String, Integer, Float, Date, Boolean]

    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })
})

app.get('/hapus/:id', (req, res) => {
    const id = req.params.id
    const query = 'DELETE FROM bread WHERE id = ?'
    const values = [id]
    db.run(query, [id], function (err) {
        if (err) {
            console.log(err)

        } else {
            res.redirect('/')
        }
    })
})

app.get('/ubah/:id', (req, res) => {
    const id = req.params.id
    const query = 'SELECT * FROM bread WHERE id = ?'
    const values = [id]

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error(err)
        } else {
            res.render('edit', { item: row })
        }
    })
})

app.post('/ubah/:id', (req, res) => {
    const id = req.params.id
    const { String, Integer, Float, Date, Boolean } = req.body

    const query = 'UPDATE bread SET String = ?, Integer = ?, FLoat = ?, Date = ?, Boolean = ? WHERE id = ?';
    const values = [String, Integer, Float, Date, Boolean, id];

    db.run(query, values, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/')
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})