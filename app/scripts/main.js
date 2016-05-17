// 'use strict';
// let demo = document.getElementById('location'),
//     weatherData = null,
//     endpoint = '';
//
// if ('geolocation' in navigator) {
//   /* geolocation is available */
//   navigator.geolocation.getCurrentPosition(function(position){
//       let coordinates = position.coords,
//         lat = coordinates.latitude.toFixed(3),
//         long = coordinates.longitude.toFixed(3),
//         endpoint = 'api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon='+ long;
//         // endpoint = '/api.openweathermap.org/data/2.5/weather?lat={1}&lon={2}'.assign(lat, long);
//
//         console.log(endpoint);
//
//      $.getJSON(endpoint).then(function(res){
//           console.log(res);
//       });
//      //
//     //   console.log(weatherData);
//       demo.innerHTML = 'Your coordinates are,  ' + coordinates.latitude + ', ' + coordinates.longitude;
//   });
// } else {
//   /* geolocation IS NOT available */
//   console.log('geolocation not available, please enable!');
// }

(function() {
  'use strict';

  let demo = document.getElementById('location');

  function weatherAPI($http, $q, endpoint) {
    return {
      getData: function() {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(function(position) {
            let coordinates = position.coords,
              lat = coordinates.latitude.toFixed(3),
              long = coordinates.longitude.toFixed(3),
              appid = '&APPID=061f24cf3cde2f60644a8240302983f2',
              ep = 'http://' + endpoint + 'lat=' + lat + '&lon=' + long + appid + '&callback=JSON_CALLBACK',
              data = null;

              return $http.jsonp(ep);

            // demo.innerHTML = 'Your coordinates are, ' + lat  + ', ' + long;
          });
        } else {
          console.log('geolocation not available, please enable');
        }
      }
    };
  }

  weatherAPI.$inject = ['$http', '$q', 'endpoint'];

  function mainCtrl($scope, $q, weatherAPI, endpoint) {
    let self = $scope.ctrl = this;

    console.log(weatherAPI.getData());

    // weatherAPI.getData().then(function(response){
    //     data = response.data;
    //     //console.log(data);
    //
    //     return data;
    // });
  }

  mainCtrl.$inject = ['$scope', '$q', 'weatherAPI', 'endpoint'];

  angular
    .module('weatherApp', [])
    .constant('endpoint', 'api.openweathermap.org/data/2.5/weather?')
    .service('weatherAPI', weatherAPI)
    .controller('mainCtrl', mainCtrl);
})();
