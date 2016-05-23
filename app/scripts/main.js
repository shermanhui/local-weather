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

  function displayWeather(type){

  }

  displayWeather.$inject = [];

  function mainCtrl($scope, $q, weatherAPI, endpoint, conditions) {
    let self = $scope.ctrl = this;

    self.data = null;

    self.time = new moment().format("h:mm:ss");

    self.displayWeather = function(type){
        let id = document.getElementById('icon');
        if (type >= 200 && type <= 232) {
            id.className += " wi-day-thunderstorm"
        } else if (type >= 300 && type <= 321) {

        } else if (type >= 500 && type <= 531) {

        } else if (type >= 600 && type <= 622) {

        } else if (type >= 701 && type <= 781) {

        } else if (type == 800) {

        } else if (type >= 801 && type <= 804){
            id.className += " wi-day-cloudy"
        } else {
            alert ('either something crazy happening or nothing at all');
        }

            // case 'thunderstorm':
            //     break;
            // case 'drizzle':
            //     break;
            // case 'rain':
            //     break;
            // case 'snow':
            //     break;
            // case 'clear':
            //     break;
            // case 'clouds':
            //     alert('clouds!')
            //     break;
            // case 'atmosphere':
            //     break;
            // case 'extreme':
            //     break;
            // case 'additional':
            //     break;
            // default:
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

            self.displayWeather(self.data.weather[0].id);

            console.log(self.data);
            return self.data;
        });
      });
    } else {
      alert('please enable geolocation');
    }
}

  mainCtrl.$inject = ['$scope', '$q', 'weatherAPI', 'endpoint', 'conditions'];

  angular
    .module('weatherApp', [])
    .constant('endpoint', 'api.openweathermap.org/data/2.5/weather?')
    .constant('conditions', ['thunderstorm', 'drizzle', 'rain', 'snow', 'clear', 'clouds', 'atmosphere', 'extreme', 'additional'])
    .service('weatherAPI', weatherAPI)
    .controller('mainCtrl', mainCtrl);
})();
