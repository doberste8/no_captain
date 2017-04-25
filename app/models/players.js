// app/models/players.js

var db = require('../../config/db');

function players() {

    //get list of players, filtered by gender if specified.
    this.get = function(gender, res) {
        db.acquire(function(err, con) {
            if (err) throw err; // You *MUST* handle err and not continue execution if
            // there is an error. this is a standard part of Node.js
            con.query('SELECT * from players where gender like ? order by last_name, first_name', [gender],
                function(err, result) {
                    con.release();
                    if (!err) {
                        res.send(result);
                        //console.log(rows);
                    }
                    else {
                        res.send({
                            status: 1,
                            message: 'Failed to get player list.'
                        });
                        console.log('Error while performing Query.');
                    }
                });
        });
    };

    //update player info for specified player id.
    this.update = function(data, res) {
        db.acquire(function(err, con) {
            if (err) throw err; // You *MUST* handle err and not continue execution if
            // there is an error. this is a standard part of Node.js
            con.query('UPDATE players set ? where id = ?', [data, data.id],
                function(err, result) {
                    con.release();
                    if (err)
                        res.send({
                            status: 1,
                            message: 'Player update failed'
                        });
                    else
                        res.send({
                            status: 0,
                            message: 'Player updated successfully'
                        });
                });
        });
    };

    //get player by specified player id.
    this.getById = function(id, res) {
        db.acquire(function(err, con) {
            if (err) throw err; // You *MUST* handle err and not continue execution if
            // there is an error. this is a standard part of Node.js
            con.query('SELECT * from players where id = ?', [id],
                function(err, result) {
                    con.release();
                    if (!err) {
                        res.send(result);
                        //console.log(rows);
                    }
                    else {
                        res.send({
                            status: 1,
                            message: 'Failed to get player.'
                        });
                        console.log('Error while performing Query.');
                    }
                });
        });
    };

    //delete player by specified player id.
    this.delete = function(id, res) {
        db.acquire(function(err, con) {
            if (err) throw err; // You *MUST* handle err and not continue execution if
            // there is an error. this is a standard part of Node.js
            con.query('DELETE from players where id = ?', [id],
                function(err, result) {
                    con.release();
                    if (err)
                        res.send({
                            status: 1,
                            message: 'Failed to delete player.'
                        });
                    else
                        res.send({
                            status: 0,
                            message: 'Player deleted successfully.'
                        });
                });
        });
    };

}

module.exports = new players();
