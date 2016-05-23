(function() {
  'use strict';

  let demo = document.getElementById('location');

  function weatherAPI($http, $q, endpoint) {
    return {
      getData: function(url) {
        return $http.jsonp(url);
      }
    };
  }

  weatherAPI.$inject = ['$http', '$q', 'endpoint'];

  function mainCtrl($scope, $q, weatherAPI, endpoint) {
    let self = $scope.ctrl = this;

    self.data = null;


    if ('geolocation' in navigator) {
     return navigator.geolocation.getCurrentPosition(function(position) {
        let coordinates = position.coords,
          lat = coordinates.latitude.toFixed(3),
          long = coordinates.longitude.toFixed(3),
          appid = '&APPID=061f24cf3cde2f60644a8240302983f2',
          units = '&units=metric',
          url = 'http://' + endpoint + 'lat=' + lat + '&lon=' + long + units + appid + '&callback=JSON_CALLBACK';

        weatherAPI.getData(url).then(function(res) {
            self.data = res.data;
            console.log(self.data);
            return self.data;
        });
      });
    } else {
      alert('please enable geolocation');
    }

    console.log(weatherAPI.getData());
  }

  mainCtrl.$inject = ['$scope', '$q', 'weatherAPI', 'endpoint'];

  angular
    .module('weatherApp', [])
    .constant('endpoint', 'api.openweathermap.org/data/2.5/weather?')
    .constant('conditions', ['thunderstorm', 'drizzle', 'rain', 'snow', 'clear', 'clouds', 'atmosphere', 'extreme', 'additional'])
    .service('weatherAPI', weatherAPI)
    .controller('mainCtrl', mainCtrl);
})();
