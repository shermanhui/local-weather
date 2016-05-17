'use strict';
let demo = document.getElementById('location'),
    weatherData = null,
    endpoint = '';

if ('geolocation' in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(function(position){
      let coordinates = position.coords,
        lat = coordinates.latitude.toFixed(3),
        long = coordinates.longitude.toFixed(3),
        endpoint = 'api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon='+ long;
        // endpoint = '/api.openweathermap.org/data/2.5/weather?lat={1}&lon={2}'.assign(lat, long);

        console.log(endpoint);

     $.getJSON(endpoint).then(function(res){
          console.log(res);
      });
     //
    //   console.log(weatherData);
      demo.innerHTML = 'Your coordinates are,  ' + coordinates.latitude + ', ' + coordinates.longitude;
  });
} else {
  /* geolocation IS NOT available */
  console.log('geolocation not available, please enable!');
}
