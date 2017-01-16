var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var cors = require('cors');
var db = new sqlite3.Database('./data/storyteller2.db');
var app = express();

// db.loadExtension('./sqlite/funcs/libxenonfunctions');

app.use(cors());

app.get('/list', function (req, res, next) {
        db.all("SELECT name FROM sqlite_master WHERE type = 'table';", function (err, rows) {
            if(err !== null) {
                return next(err);
            }
            res.status(200).send(rows);
        });
});

app.get('/entities/:id', function (req, res, next) {
        db.all("SELECT * FROM entities WHERE id = ?", req.params.id, function (err, rows) {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/entities/:id/children', function (req, res, next) {
        db.all("SELECT * FROM entities WHERE childof = ? ORDER BY isinstance ASC, name ASC", req.params.id, function (err, rows) {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/events/:id', function (req, res, next) {
        db.all("SELECT * FROM events WHERE id = ?", req.params.id, function (err, rows) {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/events/:id/children', function (req, res, next) {
        db.all("SELECT * FROM events WHERE childof = ? ORDER BY isinstance ASC, name ASC", req.params.id, function (err, rows) {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/sources/:id', function (req, res, next) {
        db.all("SELECT * FROM sources WHERE id = ?", req.params.id, function (err, rows) {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/sources/:id/children', function (req, res, next) {
        db.all("SELECT * FROM sources WHERE childof = ? ORDER BY isinstance ASC, name ASC", req.params.id, function (err, rows) {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/topics/:id', function (req, res, next) {
        db.all("SELECT * FROM topics WHERE id = ?", req.params.id, function (err, rows) {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/topics/:id/children', function (req, res, next) {
        db.all("SELECT * FROM topics WHERE childof = ? ORDER BY isinstance ASC, name ASC", req.params.id, function (err, rows) {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/search/entities/:text', function (req, res, next) {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM entities WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM entities e, parent_ids p WHERE e.id=p.parentID \n" +
        ") \n" +
        "SELECT myID FROM parent_ids \n" , '%'+req.params.text+'%', function (err, rows) {
        if(err !== null) {
            return next(err);
        } 
        res.status(200).send(rows);
    });
});

app.get('/search/events/:text', function (req, res, next) {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM events WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM events e, parent_ids p WHERE e.id=p.parentID \n" +
        ") \n" +
        "SELECT myID FROM parent_ids \n" , '%'+req.params.text+'%', function (err, rows) {
        if(err !== null) {
            return next(err);
        } 
        res.status(200).send(rows);
    });
});

app.get('/search/sources/:text', function (req, res, next) {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM sources WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM sources e, parent_ids p WHERE e.id=p.parentID \n" +
        ") \n" +
        "SELECT myID FROM parent_ids \n" , '%'+req.params.text+'%', function (err, rows) {
        if(err !== null) {
            return next(err);
        } 
        res.status(200).send(rows);
    });
});

app.get('/search/topics/:text', function (req, res, next) {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM topics WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM topics e, parent_ids p WHERE e.id=p.parentID \n" +
        ") \n" +
        "SELECT myID FROM parent_ids \n" , '%'+req.params.text+'%', function (err, rows) {
        if(err !== null) {
            return next(err);
        } 
        res.status(200).send(rows);
    });
});

app.listen(5000, function(){
    console.log('Example app listening on port 5000!');
});
