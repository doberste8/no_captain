// app/models/draft_matches.js

var db = require('../../config/db');

function draftMatches() {

    //get list of matches, filtered by user if specified.
    this.get = function(user, res) {
        if (!user)
            user = '%';

        db.acquire(function(err, con) {
            if (err) throw err; // You *MUST* handle err and not continue execution if
            // there is an error. this is a standard part of Node.js
            con.query('select * from draft_matches where username like ?', [user],
                function(err, result) {
                    con.release();
                    if (!err) {
                        res.send(result);
                    }
                    else {
                        res.send({
                            status: 1,
                            message: 'Failed to get matches list.'
                        });
                    }
                });
        });
    };

    //create new match with provided data.
    this.create = function(data, res) {
        db.acquire(function(err, con) {
            if (err) throw err; // You *MUST* handle err and not continue execution if
            // there is an error. this is a standard part of Node.js
            con.query('INSERT INTO draft_matches set ?', data,
                function(err, result) {
                    con.release();
                    if (err)
                        res.send({
                            status: 1,
                            message: 'Match creation failed'
                        });
                    else
                        res.send({
                            status: 0,
                            message: 'Match created successfully'
                        });
                });
        });
    };

    //get specified user's most recent match?

    //delete specified user's most recent match.
    this.delete = function(user, res) {
        if (!user)
            res.send({
                status: 1,
                message: 'Failed to delete match.'
            });
        else {
            console.log(user);
            db.acquire(function(err, con) {
                if (err) throw err; // You *MUST* handle err and not continue execution if
                // there is an error. this is a standard part of Node.js
                con.query('DELETE from draft_matches where username = ? order by time desc limit 1', [user],
                    function(err, result) {
                        con.release();
                        if (err)
                            res.send({
                                status: 1,
                                message: 'Failed to delete match.'
                            });
                        else
                            res.send({
                                status: 0,
                                message: 'Match deleted successfully.'
                            });
                    });
            });
        }
    };

}

module.exports = new draftMatches();
