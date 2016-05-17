
angular.module('client',[])

.controller('displaycontroller', function($scope, getActivities) {
  angular.extend($scope, getActivities);
})

.controller('FormController', function($scope, getActivities) {
  angular.extend($scope, getActivities);
})

.factory('getActivities', function($http) {
  var activities = [];

  var getSearchParams = function(fieldData) {
    console.log(fieldData);
  };

  var postToServer = function(data) {
    $http.post('/findStuff', data)
    .then(function(response) {
      console.log(response)
      response.data.forEach(function(datum) {
        console.log(datum)
        activities.push(datum);
      })}
    , function() {console.log("failure")})
    console.log(activities)
  };

  return {
    postToServer: postToServer,
    getSearchParams: getSearchParams,
    activities:activities
  };


})

