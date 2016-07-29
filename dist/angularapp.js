
angular.module('client',[])

.controller('DisplayController', function($scope, getActivities) {
  angular.extend($scope, getActivities);
})

.controller('FormController', function($scope, getActivities) {
  angular.extend($scope, getActivities);
})

.factory('getActivities', function($http) {
  var results = [];

  var formatPhone = function(phone) {
      return phone = "("+ phone.slice(0,3) + ") " + phone.slice(3, 6) + "-" + phone.slice(6, 10);
  };

  var postToServer = function(data) {
    console.log("data to server", data);
    results.length = 0;
    data.forEach(function(term){
      if (term) {
        $http.post('/callYelp', [term])
        .then(function(response) {
          response.data.phone = formatPhone(response.data.phone);
          results.push(response.data);
          console.log(results);
        })
      }
    });
  };

  return {
    postToServer: postToServer,
    results: results,
    formatPhone: formatPhone
  };


})
