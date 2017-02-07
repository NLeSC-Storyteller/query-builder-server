var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var btoa = require('btoa');

var db = new sqlite3.Database('./data/storyteller6.db');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

db.loadExtension('sqlite/funcs/libxenonfunctions');

function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

app.get('/list', (req, res, next) => {
        db.all("SELECT name FROM sqlite_master WHERE type = 'table';", (err, rows) => {
            if(err !== null) {
                return next(err);
            }
            res.status(200).send(rows);
        });
});

app.get('/entities/:id', (req, res, next) => {
        db.all("SELECT * FROM entities WHERE id = ?", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/entities/:id/children', (req, res, next) => {
        db.all("SELECT * FROM entities WHERE childof = ? ORDER BY isinstance ASC, name ASC", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/events/:id', (req, res, next) => {
        db.all("SELECT * FROM events WHERE id = ?", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/events/:id/children', (req, res, next) => {
        db.all("SELECT * FROM events WHERE childof = ? ORDER BY isinstance ASC, name ASC", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/sources/:id', (req, res, next) => {
        db.all("SELECT * FROM sources WHERE id = ?", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/sources/:id/children', (req, res, next) => {
        db.all("SELECT * FROM sources WHERE childof = ? ORDER BY isinstance ASC, name ASC", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/topics/:id', (req, res, next) => {
        db.all("SELECT * FROM topics WHERE id = ?", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/topics/:id/children', (req, res, next) => {
        db.all("SELECT * FROM topics WHERE childof = ? ORDER BY isinstance ASC, name ASC", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/search/entities/:text', (req, res, next) => {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM entities WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM entities e, parent_ids p WHERE e.id=p.parentID \n" +
        ") \n" +
        "SELECT myID FROM parent_ids \n" , '%'+req.params.text+'%', (err, rows) => {
        if(err !== null) {
            return next(err);
        } 
        res.status(200).send(rows);
    });
});

app.get('/search/events/:text', (req, res, next) => {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM events WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM events e, parent_ids p WHERE e.id=p.parentID \n" +
        ") \n" +
        "SELECT myID FROM parent_ids \n" , '%'+req.params.text+'%', (err, rows) => {
        if(err !== null) {
            return next(err);
        } 
        res.status(200).send(rows);
    });
});

app.get('/search/sources/:text', (req, res, next) => {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM sources WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM sources e, parent_ids p WHERE e.id=p.parentID \n" +
        ") \n" +
        "SELECT myID FROM parent_ids \n" , '%'+req.params.text+'%', (err, rows) => {
        if(err !== null) {
            return next(err);
        } 
        res.status(200).send(rows);
    });
});

app.get('/search/topics/:text', (req, res, next) => {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM topics WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM topics e, parent_ids p WHERE e.id=p.parentID \n" +
        ") \n" +
        "SELECT myID FROM parent_ids \n" , '%'+req.params.text+'%', (err, rows) => {
        if(err !== null) {
            return next(err);
        } 
        res.status(200).send(rows);
    });
});

app.post('/addquery', (req, res, next) => {
    console.log(Object.keys(req.body));
    var username = mysql_real_escape_string(req.body.username);
    var query = mysql_real_escape_string(req.body.query);

    sqlRequest = "INSERT INTO queries (username, query) " +
                 "VALUES('" + username + "','" + query + "')";
    console.log(sqlRequest);

    db.run(sqlRequest, (err) => {
        if(err !== null) {
            next(err);
        }
        else {
            res.redirect('back');
        }
    });
});

app.get('/queries', (req, res, next) => {
    db.all("SELECT id, username, query, status FROM queries;", (err, rows) => {
        if(err !== null) {
            return next(err);
        } 
        res.status(200).send(rows);
    });
});

app.get('/query/:id', (req, res, next) => {
    db.all("SELECT result FROM queries WHERE id = ?;", mysql_real_escape_string(req.params.id), (err, rows) => {
        if(err !== null) {
            return next(err);
        } else if (rows.length === 0) {
            console.log(err);
            return res.status(404).send({ error : "ID doesn't exist" });
        }
        res.status(200).send(rows);
    });
});

app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
});
