function initialize() {
//Main view of map
  var myLatlng = new google.maps.LatLng(39.74940,-104.98900);
  var mapOptions = {
    zoom: 15,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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

//ICONS
  var poi = new google.maps.LatLng(39.74913670673, -104.99630300059);

  var infoWindow =  new google.maps.InfoWindow({
    content: 'This is a '+ '<b>' + 'parking ' + '</b>' + 'garage' //can be html
  });

  var marker = new google.maps.Marker({
    position: poi,
  	map: map,
    icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
    link: 'http://www.google.com'
  });


  google.maps.event.addListener(marker, 'mouseover', function () {
  	infoWindow.open(map, this);
  });

  google.maps.event.addListener(marker, 'mouseout', function () {
	infoWindow.close();
  });

  //doesn't work
  // google.maps.event.addListener(marker, 'click', function () {
	// infoWindow.open(marker.link);
  // });
}

google.maps.event.addDomListener(window, 'load', initialize);
