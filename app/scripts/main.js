(function() {
  'use strict';

  function weatherAPI($http) {
    return {
      getData: function(url) {
        return $http.jsonp(url);
      }
    };
  }

  weatherAPI.$inject = ['$http'];

  function displayCurrentTime($interval){
      function link(scope, element, attrs) {
        let format,
          timeoutId;

        function updateTime() {
          element.text(new moment().format('h:mm a'));
        }

        scope.$watch(attrs.myCurrentTime, function(value) {
          format = value;
          updateTime();
        });

        element.on('$destroy', function() {
          $interval.cancel(timeoutId);
        });

        timeoutId = $interval(function() {
          updateTime();
        }, 1000);
      }

      return {
          link: link
      };

  }

  displayCurrentTime.$inject = ['$interval', 'dateFilter'];

  // function backgroundImg(){
  //     return function(scope, element, attrs){
  //         let url = attrs.backgroundImg;
  //         element.css({
  //             'background-image': 'url(' + url + ')',
  //             'background-size': 'cover',
  //             'background-repeat': 'no-repeat',
  //             'background-position': 'center center'
  //         });
  //     };
  // }
  //
  // backgroundImg.$inject = [];

  function mainCtrl($scope, $q, weatherAPI, endpoint, conditions) {
    let self = $scope.ctrl = this;

    self.data = null;

    //setting background image happens too early; async problem
    self.displayWeather = function(type){
        let id = document.getElementById('icon');
        if (type >= 200 && type <= 232) {
            id.className += ' wi-day-thunderstorm';
            document.getElementById('background').style.backgroundImage = "url('images/thunder.jpeg')";
        } else if (type >= 300 && type <= 321) {
            id.className += ' wi-day-sprinkle';
            document.getElementById('background').style.backgroundImage = "url('images/sprinkle.jpeg')";
        } else if (type >= 500 && type <= 531) {
            id.className += ' wi-day-rain';
            document.getElementById('background').style.backgroundImage = "url('images/rain.jpeg')";
        } else if (type >= 600 && type <= 622) {
            id.className += ' wi-day-snow-wind';
            document.getElementById('background').style.backgroundImage = "url('images/snow.jpeg')";
        } else if (type >= 701 && type <= 781) {
            id.className += ' wi-day-cloudy-windy';
            document.getElementById('background').style.backgroundImage = "url('images/cloud.jpeg')";
        } else if (type === 800) {
            id.className += ' wi-day-sunny';
            document.getElementById('background').style.backgroundImage = "url('images/sun.jpeg')";
        } else if (type >= 801 && type <= 804){
            id.className += ' wi-day-cloudy';
            document.getElementById('background').style.backgroundImage = "url('images/cloud.jpeg')";
        } else {
            alert ('either something crazy happening or nothing at all');
        }
    };

    self.changeUnits = function(){
        if (self.data.tempInfo.isCelsius){

            self.data.tempInfo.unit = 'F';
            self.data.tempInfo.isCelsius = false;
            self.data.tempInfo.temp = Math.round((self.data.tempInfo.temp * 9) / 5 + 32).toFixed(2);

            return self.data.tempInfo;
        } else {
            self.data.tempInfo.unit = 'C';
            self.data.tempInfo.isCelsius = true;
            self.data.tempInfo.temp = ((self.data.tempInfo.temp - 32) * 5 / 9).toFixed(2);

            return self.data.tempInfo;
        }
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
            self.data.area = res.data.name + ', ' + res.data.sys.country;
            self.data.tempInfo = {
                unit: 'C',
                isCelsius: true,
                temp: res.data.main.temp
            };

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
    .directive('displayCurrentTime', displayCurrentTime)
    .service('weatherAPI', weatherAPI)
    .controller('mainCtrl', mainCtrl);
})();
