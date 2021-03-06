var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var config = require('./config.json');
var db = new sqlite3.Database(config.database_location);
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

db.loadExtension(config.extension_location);

console.log('Query-Builder-Server started. logging enabled.');

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

app.get('/light/:id', (req, res, next) => {
        db.all("SELECT * FROM light WHERE id = ?", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/light/:id/children', (req, res, next) => {
        db.all("SELECT * FROM light WHERE childof = ? ORDER BY id", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/dark/:id', (req, res, next) => {
        db.all("SELECT * FROM dark WHERE id = ?", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/dark/:id/children', (req, res, next) => {
        db.all("SELECT * FROM dark WHERE childof = ? ORDER BY id", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/concepts/:id', (req, res, next) => {
        db.all("SELECT * FROM concepts WHERE id = ?", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/concepts/:id/children', (req, res, next) => {
        db.all("SELECT * FROM concepts WHERE childof = ? ORDER BY id", mysql_real_escape_string(req.params.id), (err, rows) => {
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
        db.all("SELECT * FROM events WHERE childof = ? ORDER BY id", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/authors/:id', (req, res, next) => {
        db.all("SELECT * FROM authors WHERE id = ?", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/authors/:id/children', (req, res, next) => {
        db.all("SELECT * FROM authors WHERE childof = ? ORDER BY id", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/cited/:id', (req, res, next) => {
        db.all("SELECT * FROM cited WHERE id = ?", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/cited/:id/children', (req, res, next) => {
        db.all("SELECT * FROM cited WHERE childof = ? ORDER BY id", mysql_real_escape_string(req.params.id), (err, rows) => {
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
        db.all("SELECT * FROM topics WHERE childof = ? ORDER BY id", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/perspectives/:id', (req, res, next) => {
        db.all("SELECT * FROM perspectives WHERE id = ?", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/perspectives/:id/children', (req, res, next) => {
        db.all("SELECT * FROM perspectives WHERE childof = ? ORDER BY id", mysql_real_escape_string(req.params.id), (err, rows) => {
            if(err !== null) {
                return next(err);
            } else if (rows.length === 0) {
                console.log(err);
                return res.status(404).send({ error : "ID doesn't exist" });
            }
            res.status(200).send(rows);
        });
});

app.get('/search/light/:text', (req, res, next) => {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM light WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM light e, parent_ids p WHERE e.id=p.parentID \n" +
        ") \n" +
        "SELECT myID FROM parent_ids \n" , '%'+req.params.text+'%', (err, rows) => {
        if(err !== null) {
            return next(err);
        } 
        res.status(200).send(rows);
    });
});

app.get('/search/dark/:text', (req, res, next) => {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM dark WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM dark e, parent_ids p WHERE e.id=p.parentID \n" +
        ") \n" +
        "SELECT myID FROM parent_ids \n" , '%'+req.params.text+'%', (err, rows) => {
        if(err !== null) {
            return next(err);
        } 
        res.status(200).send(rows);
    });
});

app.get('/search/concepts/:text', (req, res, next) => {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM concepts WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM concepts e, parent_ids p WHERE e.id=p.parentID \n" +
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

app.get('/search/authors/:text', (req, res, next) => {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM authors WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM authors e, parent_ids p WHERE e.id=p.parentID \n" +
        ") \n" +
        "SELECT myID FROM parent_ids \n" , '%'+req.params.text+'%', (err, rows) => {
        if(err !== null) {
            return next(err);
        } 
        res.status(200).send(rows);
    });
});

app.get('/search/cited/:text', (req, res, next) => {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM cited WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM cited e, parent_ids p WHERE e.id=p.parentID \n" +
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

app.get('/search/perspectives/:text', (req, res, next) => {
    db.all(""+
        "WITH RECURSIVE parent_ids(myID, parentID) AS ( \n" +
            "SELECT id, childof FROM perspectives WHERE name LIKE ? \n" +
            "UNION \n" +
            "SELECT id, childof FROM perspectives e, parent_ids p WHERE e.id=p.parentID \n" +
        ") \n" +
        "SELECT myID FROM parent_ids \n" , '%'+req.params.text+'%', (err, rows) => {
        if(err !== null) {
            return next(err);
        } 
        res.status(200).send(rows);
    });
});

app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
});
