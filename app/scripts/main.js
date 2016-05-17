'use strict';
let demo = document.getElementById('location');
if ('geolocation' in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(function(position){
      console.log(position.coords);
      let coordinates = position.coords;
      demo.innerHTML = 'Your coordinates are, ' + coordinates.latitude + ', ' + coordinates.longitude;
  });
} else {
  /* geolocation IS NOT available */
  console.log('geolocation not available, please enable!');
}
