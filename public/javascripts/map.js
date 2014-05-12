var map;
function initialize() {
  // Create a simple map.
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 13,
    center: {lng: -64.210715, lat: -31.406495}
  });

  map.data.loadGeoJson('/locations');
  // Set mouseover event for each feature.
  map.data.addListener('mouseover', function(event) {
    document.getElementById('info-box').textContent =
        event.feature.getProperty('time');
  });
}

google.maps.event.addDomListener(window, 'load', initialize);