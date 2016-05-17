
angular.module('client',[])

.controller('DisplayController', function($scope, getActivities) {
  angular.extend($scope, getActivities);
})

.controller('FormController', function($scope, getActivities) {
  angular.extend($scope, getActivities);
})

.factory('getActivities', function($http) {
  var activities = [];

  var formatPhone = function(phone) {
    if (phone.length === 10) {
      return phone = "("+ phone.slice(0,3) + ")" + phone.slice(3, 10);
    }
  };

  var postToServer = function(data) {
    activities.length = 0;
    console.log(data)
    data.forEach(function(term){
      if (term) {
        $http.post('/findStuff', [term])
        .then(function(response) {
          console.log("response.data: ",response.data)
          response.data.phone = formatPhone(response.data.phone);
          activities.push(response.data);
        }
        ,function() {console.log("failure")})
      }
    });
  };

  return {
    postToServer: postToServer,
    activities:activities,
    formatPhone:formatPhone
  };


})

