function initialize() {
  var myLatlng = new google.maps.LatLng(39.74940,-104.98900);
  var mapOptions = {
    zoom: 14,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  });
}

google.maps.event.addDomListener(window, 'load', initialize);



// function initialize() {
//
// var styleArray = [
//   {
//   featureType: 'poi.parking',
//   elementType: 'geometry',
//   stylers: [
//     { visibility: 'on' }
//   ]
//   }
// ];
//
// var styledMap = new google.maps.StyledMapType(styleArray,
//     {name: "Styled Map"});
//
// var mapOptions = {
//   center: { lat: 40.017772, lng: -105.282961},
//   zoom: 14,
//   style: styleArray,
// };
// var map = new google.maps.Map(document.getElementById('map-canvas'),
//   mapOptions);
//   map.mapTypes.set('map_style', styledMap);
//   map.setMapTypeId('map_style');
// }
//
// // ---------------------------- //
//
// var input = (document.getElementById('pac-input'));
//  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//
//  var searchBox = new google.maps.places.SearchBox((input));
//
//  // Listen for the event fired when the user selects an item from the
//  // pick list. Retrieve the matching places for that item.
//  google.maps.event.addListener(searchBox, 'places_changed', function() {
//    var places = searchBox.getPlaces();
//
//    if (places.length == 0) {
//      return;
//    }
//    for (var i = 0, marker; marker = markers[i]; i++) {
//      marker.setMap(null);
//    }
//
//    // For each place, get the icon, place name, and location.
//    markers = [];
//    var bounds = new google.maps.LatLngBounds();
//    for (var i = 0, place; place = places[i]; i++) {
//      var image = {
//        url: place.icon,
//        size: new google.maps.Size(71, 71),
//        origin: new google.maps.Point(0, 0),
//        anchor: new google.maps.Point(17, 34),
//        scaledSize: new google.maps.Size(25, 25)
//      };
//
//      // Create a marker for each place.
//      var marker = new google.maps.Marker({
//        map: map,
//        icon: image,
//        title: place.name,
//        position: place.geometry.location
//      });
//
//      markers.push(marker);
//
//      bounds.extend(place.geometry.location);
//    }
//
//    map.fitBounds(bounds);
//  });
//
//  // Bias the SearchBox results towards places that are within the bounds of the
//  // current map's viewport.
//  google.maps.event.addListener(map, 'bounds_changed', function() {
//    var bounds = map.getBounds();
//    searchBox.setBounds(bounds);
//  });
// }
//
// google.maps.event.addDomListener(window, 'load', initialize);
