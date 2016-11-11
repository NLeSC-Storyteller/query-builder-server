var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var cors = require('cors');
var db = new sqlite3.Database('data/entities.db');
var app = express();

app.use(cors());

app.get('/root', function (req, res, next) {
        db.all("SELECT * FROM entities WHERE id=1", function (err, rows) {
            if(err !== null) {
                next(err);
            }
            res.status(200).send(rows);
        });
});

app.get('/', function (req, res, next) {
        db.all("SELECT * FROM entities", function (err, rows) {
            if(err !== null) {
                next(err);
            }
            res.status(200).send(rows);
        });
});

app.get('/node/:id', function (req, res, next) {
        db.all("SELECT * FROM entities WHERE id=?", req.params.id, function (err, rows) {
            if(err !== null) {
                next(err);
            }
            res.status(200).send(rows);
        });
});

app.get('/node/:id/descendants', function (req, res, next) {
        db.all(`
        SELECT * FROM instances i,
        (WITH tblChild AS
        (
            SELECT * FROM entities WHERE parent_id = ?
            UNION ALL
            SELECT entities.* FROM entities  JOIN tblChild  ON entities.parent_id = tblChild.id
        )
        SELECT id FROM tblChild
        UNION ALL
        SELECT ?) t
        WHERE i.entity_id = t.id;
        `, req.params.id, req.params.id, function (err, rows) {
            if(err !== null) {
                next(err);
            }
            res.status(200).send(rows);
        });
});

app.get('/children/:parent_id', function (req, res, next) {
        db.all("SELECT * FROM entities WHERE parent_id=?", req.params.parent_id, function (err, rows) {
            if(err !== null) {
                next(err);
            }
            res.status(200).send(rows);
        });
});

app.listen(5000, function(){
    console.log('Example app listening on port 5000!');
});
