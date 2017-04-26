// app/routes/api.js

var api = require('express').Router();
var players = require('../models/players');
var draftMatches = require('../models/draft_matches');
var draftList = require('../models/draft_list');

// middleware for all api requests
api.use(function(req, res, next) {
    console.log('API');
    next();
});

api.route('/players')

    .get(function(req, res) {
        var gender = '%';
        if (req.query.gender) gender = req.query.gender;
        players.get(gender, res);
    })
  
    .post(function(req, res) {
        players.create(req.body, res);
    })
  
    .put(function(req, res) {
        players.update(req.body, res);
    });
  
api.route('/players/:id')
  
    .get(function(req, res) {
        players.getById(req.params.id, res);
    })
  
    .delete(function(req, res) {
        players.delete(req.params.id, res);
    });

api.route('/draft_matches')

    .get(function(req, res) {
        draftMatches.get(req.query.user, res);
    })
  
    .post(function(req, res) {
        draftMatches.create(req.body, res);
    })

    .delete(function(req, res) {
        draftMatches.delete(req.query.user, res);
    });
    
api.route('/draft_list')

    .get(function(req, res) {
        var event = '%';
        var year = '%';
        if (req.query.event) event = req.query.event;
        if (req.query.year) year = req.query.year;
        draftList.get(event, year, res);
    })

module.exports = api;