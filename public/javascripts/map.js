var Orbit = function () {};

Orbit.prototype.get = function (path, fn) {
  var req = new XMLHttpRequest();
  req.open('GET', path);
  req.send();
  req.addEventListener('load', fn.bind(req))
};


////ADD MARKER
function placeMarker(location) {
  var marker = new google.maps.Marker({
      icon: '/images/parkingicon.png',
      position: location,
      map: map,
  });
}


//MAP GUTS
function initialize(num) {
  if (isNaN(num)) {
    num = 50; //default
  } else {
    num = num;
  }

  var parking = new Orbit();
  parking.get('/parking', function () {
    var parkingInfo = JSON.parse(this.response);

    var results = [];
    for (var i = 0; i < parkingInfo.length; i++) {
      if (parkingInfo[i].price <= num ) {
        results.push(parkingInfo[i])
      }
    }

    for(var i = 0; i < results.length; i++) {
      var data = {};
      var latlng = new google.maps.LatLng(results[i].lat, results[i].lng);

      var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: '/images/parkingicon.png'
      });

      data.name = results[i].location_name;
      data.street = results[i].address;
      data.city = results[i].city;
      data.state = results[i].state;
      data.zip = results[i].zip;
      data.price = results[i].price_formatted;
      data.likes = results[i].recommendations;
      data.content =
      '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' + data.name + '</h1>' +
        '<div id="bodyContent">' +
          '<h3>' + data.price + '</h3>' +
          '<br>' + data.street + '</br>' +
          '<br>' + data.city + '</br>' +
          '<br>' + data.state + ', ' + data.zip + '</br>' +
          '<hr><div id="heart"> ♥ ' + data.likes + ' likes</div>' +
        '</div>' +
      '</div>';

      (function() {
        var infoWindow =  new google.maps.InfoWindow({
          content: data.content,
          position: latlng
        });
        google.maps.event.addListener(marker, 'click', function () {
        	infoWindow.open(map, this);
        });
        // How to close window
        // google.maps.event.addListener(marker, 'mouseout', function () {
        //   infoWindow.close();
        // });
      })();

//ADD LOCATION
      google.maps.event.addListener(map, 'rightclick', function(event) {
         placeMarker(event.latLng);
         newPark();
      });

    } //end of for loop
  }) // closing ajax

  // DEFAULT MAP INFO
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(39.748356, -104.995477);
  var mapOptions = {
    scrollwheel: false,
    draggable: true,
    zoom: 14,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  //STYLES
  var styles = [
    {
      stylers: [
        { saturation: -10 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  map.setOptions({styles: styles});

} //closes initialize function

//SEARCH
function codeAddress () {
  var address = document.getElementById("address");
  var modal = document.getElementById("zip");
  geocoder.geocode( { 'address': address.value}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
      address.value = '';
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

//FILTER
var submit = document.getElementById('submitPrice');

submit.addEventListener('click', function () {
  var input = document.getElementById('price');
  var inputNum = input.value;
  initialize(inputNum);
  input.value = '';
});



google.maps.event.addDomListener(window, 'load', initialize);
