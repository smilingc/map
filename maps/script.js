<script src="<?php echo get_template_directory_uri(); ?>/js/script.js" defer></script>
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#map').length > 0)
  {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'en';

    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&signed_in=true&key=AIzaSyANGAQenSvvkaFhDy-_pdwN0oiBt58EV6I&language=' + lang;
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }
});

var map;

function initMap()
{
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

   fetch('../markers.json')
    .then(function(response){return response.json()})
    .then(plotMarkers);

}

var markers;
var marker;
var bounds;

function plotMarkers(m)
{
  markers = [];
  bounds = new google.maps.LatLngBounds();

  m.forEach(function (marker) {
    var position = new google.maps.LatLng(marker.lat, marker.lng);
    var infowindow = new google.maps.InfoWindow({
          content: marker.description
    }); 

    
    marker =  new google.maps.Marker({
              position: position,
              map: map,
              animation: google.maps.Animation.DROP
              })
    marker.addListener('click', function() {
    infowindow.open(map, marker);
    });
  
    
    bounds.extend(position);
  });
  map.fitBounds(bounds);
}