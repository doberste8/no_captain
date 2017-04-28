// public/js/core.js
var nclbi = angular.module('nclbi', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.aName = "Name";
    $scope.aNickname = "\"Nickname\"";
    $scope.aAge = "Age";
    $scope.aPS = "PS";
    $scope.aHeight = "Height";
    $scope.bName = "Name";
    var draftData = {};

    //get random from item from list and show it
    $scope.showNewItem = function() {
        $http.get('/api/draft_list')
            .success(function(data) {
                    shuffle(data);
                    draftData = data;
                    $scope.aName = data[0].first_name + " " + data[0].last_name;
                    $scope.bName = data[1].first_name + " " + data[1].last_name;
                })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.createItem = function() {
        $http.post('/api/list/', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.item = data.descr;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    //add match to database when user clicks the winner
        $scope.addMatch = function(a,b) {
            var match = {event_id: draftData[a].event_id, username: "Steve", player_w_id: draftData[a].id, player_l_id: draftData[b].id, confidence: 4};
            console.log(match);
        $http.post('/api/draft_matches/', match)
            .success(function(data) {
                $scope.formData = {};
                $scope.item = "posted";
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}

function shuffle(array) {
    var m = array.length,
        t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}