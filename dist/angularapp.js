
angular.module('client',[])

.controller('DisplayController', function($scope, getActivities) {

  $scope.results = getActivities.results;

})

.controller('FormController',function($scope, getActivities) {

  angular.extend($scope, getActivities);

  $scope.find = function(data) {
    getActivities.postToServer(data);
    $scope.field1 = "";
    $scope.field2 = "";
    $scope.field3 = "";
    $scope.field4 = "";
    $scope.field5 = "";
  }

})

.factory('getActivities', function($http) {

  var results = [];

  var formatPhone = function(phone) {
      return phone = "("+ phone.slice(0,3) + ") " + phone.slice(3, 6) + "-" + phone.slice(6, 10);
  };

  var postToServer = function(data) {
    results.length = 0;
    data.forEach(function(term){
      if (term) {
        $http.post('/callYelp', [term])
        .then(function(response) {
          response.data.forEach(function(listing){
            if (listing.phone) {
              listing.phone = formatPhone(listing.phone);
            }
            results.push(listing);
            console.log(results);
        })
        })
      }
    });
  };

  return {
    postToServer: postToServer,
    results: results,
    formatPhone: formatPhone
  };


});
