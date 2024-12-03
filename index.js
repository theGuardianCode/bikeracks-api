import sqlite3 from "sqlite3"
import express from "express"

const app  = express()
const port = 8080

const db = new sqlite3.Database("bikeracks.db")

let column_names = []
db.all("SELECT name FROM PRAGMA_TABLE_INFO('bikeracks');", (err, rows) => {
    if (err) {
        console.error(err)
    } else {
        // Store only the name string in the column_names array
        rows.forEach((row) => {
            column_names.push(row.name)
        })
    }
})

app.listen(port, () => {
    console.log(`It's alive on http://localhost:${port}`)
})

app.get("/racks", (req, res) => {
    let where_clause = ""
    // Get the names of the url parameters
    const keys = Object.keys(req.query)
    if (keys.length > 0) {
        let columns = []
        // For each url parameter in the query add it to the array
        keys.forEach((key) => {
            if (column_names.includes(key)) {
                columns.push(`${key} = "${req.query[key]}"`)
            }
        })

        if (columns.length > 0) {
            where_clause = "WHERE " + columns.join("AND")
        }
    }

    const sql = `SELECT * FROM bikeracks ${where_clause};`
    db.all(sql, (err, rows) => {
        if (err) {
            console.error("Error with request")
            console.error(`URL: ${req.protocol} at ${req.originalUrl}`)
            console.error(`Error: ${err}`)
            console.error(sql)
        } else {
            res.send(rows)
        }
    })
})

app.get("/search", (req, res) => {
    console.log(req.query.where)
    if (req.query.where) {
        db.all(`SELECT * FROM bikeracks WHERE ${req.query.where};`, (err, rows) => {
            if (err) {
                console.error(err)
            }
            console.log(rows)
            res.send(rows)
        })
    } else {
        res.send({"err": "no 'where' parameter provided"})
    }
})