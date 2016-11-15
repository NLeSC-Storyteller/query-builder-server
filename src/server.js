var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var cors = require('cors');
var db = new sqlite3.Database('./data/entities.db');
var app = express();

app.use(cors());

app.get('/', function (req, res, next) {
        db.all("SELECT * FROM nodes", function (err, rows) {
            if(err !== null) {
                return next(err);
            }
            res.status(200).send(rows);
        });
});

app.get('/list', function (req, res, next) {
        db.all("SELECT name FROM sqlite_master WHERE type = 'table';", function (err, rows) {
            if(err !== null) {
                return next(err);
            }
            res.status(200).send(rows);
        });
});

app.get('/node/:id', function (req, res, next) {
        db.all("SELECT * FROM nodes WHERE id = ?", req.params.id, function (err, rows) {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/node/:id/children', function (req, res, next) {
        db.all("SELECT * FROM nodes WHERE child_of = ?", req.params.id, function (err, rows) {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/root', function (req, res, next) {
        db.all("SELECT * FROM nodes WHERE id=1", function (err, rows) {
            if(err !== null) {
                return next(err);
            }
            res.status(200).send(rows);
        });
});


app.listen(5000, function(){
    console.log('Example app listening on port 5000!');
});
