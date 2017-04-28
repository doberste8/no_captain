// app/models/draft_list.js

var db = require('../../config/db');

function draft_list() {

    //get list of draft data, filtered by event and year if specified.
    this.get = function(event, year, res) {
        db.acquire(function(err, con) {
            if (err) throw err; // You *MUST* handle err and not continue execution if
            // there is an error. this is a standard part of Node.js
            con.query('SELECT * from player_survey_joined where event_id in (SELECT id FROM events WHERE event_name like ? AND year like ?) order by last_name, first_name', [event, year],
                function(err, result) {
                    con.release();
                    if (!err) {
                        res.send(result);
                        //console.log(rows);
                    }
                    else {
                        res.send({
                            status: 1,
                            message: 'Failed to get draft data list.'
                        });
                        console.log('Error while performing Query.');
                    }
                });
        });
    };
}

module.exports = new draft_list();
