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
    const url = req.url == '/' ? '/?page=1' : req.url


    let sql = 'SELECT COUNT(*) AS count FROM bread'
    const params = []
    const sqlsearch = []

    if (req.query.id && req.query.checkboxid) {
        params.push(req.query.id)
        sqlsearch.push(`id = $${params.length}`)
    }

    if (req.query.String && req.query.checkboxString) {
        params.push(`%${req.query.String}%`);
        sqlsearch.push(`String LIKE $${params.length}`)
    }

    if (req.query.Integer && req.query.checkboxInteger) {
        params.push(req.query.Integer)
        sqlsearch.push(`Integer = $${params.length}`)
    }

    if (req.query.Float && req.query.checkboxFloat) {
        params.push(req.query.Float)
        sqlsearch.push(`Float = $${params.length}`)
    }

    if (req.query.startDate && req.query.endDate && req.query.checkboxDate) {
        params.push(req.query.startDate, req.query.endDate)
        // console.log(params)
        sqlsearch.push(`Date BETWEEN $${params.length - 1} AND $${params.length}`)
    }

    if (req.query.Boolean && req.query.checkboxBoolean) {
        params.push(req.query.Boolean)
        sqlsearch.push(`Boolean = $${params.length}`)
    }

    if (params.length > 0) {
        sql += ` WHERE ${sqlsearch.join(' AND ')}`
    }
        // console.log(sql)
    db.get(sql, params, (err, bread) => {
        // console.log(bread.count[0])
        const page = req.query.page || 1
        const limit = 3
        const offset = (page - 1) * limit
        const pages = Math.ceil(bread.count / limit)
        // console.log(pages)
        sql = 'SELECT * FROM bread'
        if (params.length > 0) {
            sql += ` WHERE ${sqlsearch.join(' AND ')}`
        }
        params.push(limit, offset)
        sql += ` LIMIT $${params.length - 1} OFFSET $${params.length}`
        // console.log(params)
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.error(err)
                return res.status(500).send('Internal Server Error')
            } else {
                res.render('index', { bread: rows, pages, page, offset, query: req.query, url})
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