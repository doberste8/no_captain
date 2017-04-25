// public/js/core.js
var shenanigan = angular.module('shenanigan', []);

function mainController($scope, $http) {
    $scope.formData = {};

    //get random from item from list and show it
    $scope.showNewItem = function() {
        $http.get('/api/list')
            .success(function(data) {
                if (!data[0]) {
                    $http.put('/api/list/all', {
                        "count": 1
                    });
                    $scope.showNewItem();
                }
                else {
                    shuffle(data);
                    $http.put('/api/list', {
                        "id": data[0].id,
                        "count": 0
                    });
                    $scope.item = data[0].descr;
                }
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