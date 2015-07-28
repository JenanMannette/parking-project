var Orbit = function () {}

Orbit.prototype.get = function (path, fn) {
  var req = new XMLHttpRequest()
  req.open('GET', path)
  req.send()
  req.addEventListener('load', fn.bind(req))
}

function initialize() {

  var parking = new Orbit();
  parking.get('/parking', function () {
    var parkingInfo = JSON.parse(this.response);
    var array = [];

    for(var i = 0; i < parkingInfo.length; i++) {
      var object = {};
      var latlng = new google.maps.LatLng(parkingInfo[i].lat, parkingInfo[i].lng);

      var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: '/images/parkingicon.png',
      })

      object.name = parkingInfo[i].location_name;
      object.street = parkingInfo[i].address;
      object.city = parkingInfo[i].city;
      object.state = parkingInfo[i].state;
      object.zip = parkingInfo[i].zip;
      object.price = parkingInfo[i].price_formatted;
      object.content =
      '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' + object.name + '</h1>' +
        '<div id="bodyContent">' +
          '<h3>' + object.price + '</h3>' +
          '<br>' + object.street + '</br>' +
          '<br>' + object.city + '</br>' +
          '<br>' + object.state + ', ' + object.zip + '</br>' +
          '<div id="heart"> ♥ </div>' +
        '</div>' +
      '</div>';

      array.push(object);

      (function() {
        var infoWindow =  new google.maps.InfoWindow({
          content: object.content,
          position: latlng
        });
        google.maps.event.addListener(marker, 'click', function () {
        	infoWindow.open(map, this);
        });
        // How to close window
        // google.maps.event.addListener(marker, 'mouseout', function () {
        //   infoWindow.close();
        // });
      })()

    } //end of for loop
  }) // closing ajax

  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(39.745549, -104.991263);
  var mapOptions = {
    scrollwheel: false,
    draggable: true,
    zoom: 15,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  //STYLES
  var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
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
}

function codeAddress() {
  var address = document.getElementById("address").value;
  var modal = document.getElementById("zip");
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}


google.maps.event.addDomListener(window, 'load', initialize);
