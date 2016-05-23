(function() {
  'use strict';

  let demo = document.getElementById('location');

  function weatherAPI($http, $q) {
    return {
      getData: function(url) {
        return $http.jsonp(url);
      }
    };
  }

  weatherAPI.$inject = ['$http', '$q', 'endpoint'];

  function mainCtrl($scope, $q, weatherAPI, endpoint, conditions) {
    let self = $scope.ctrl = this;

    self.data = null;

    self.time = new moment().format("h:mm:ss");

    self.displayWeather = function(type){
        switch(type){
            case 'thunderstorm':
                break;
            case 'drizzle':
                break;
            case 'rain':
                break;
            case 'snow':
                break;
            case 'clear':
                break;
            case 'clouds':
                break;
            case 'atmosphere':
                break;
            case 'extreme':
                break;
            case 'additional':
                break;
            default:

        }
    };

    self.changeUnits = function(){

    };

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

  mainCtrl.$inject = ['$scope', '$q', 'weatherAPI', 'endpoint', 'conditions'];

  angular
    .module('weatherApp', [])
    .constant('endpoint', 'api.openweathermap.org/data/2.5/weather?')
    .constant('conditions', ['thunderstorm', 'drizzle', 'rain', 'snow', 'clear', 'clouds', 'atmosphere', 'extreme', 'additional'])
    .service('weatherAPI', weatherAPI)
    .controller('mainCtrl', mainCtrl);
})();
