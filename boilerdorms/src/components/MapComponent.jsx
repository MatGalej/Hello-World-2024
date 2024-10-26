import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    let map;
    let autocomplete;

    const initMap = () => {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.427340, lng: -86.918586 },
        zoom: 13,
      });

      const input = document.getElementById('pac-input');
      autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          console.log("No details available for the input: '" + place.name + "'");
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(40);
        }

        new google.maps.Marker({
          position: place.geometry.location,
          map: map,
        });
      });
    };

    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = "https://maps.gomaps.pro/maps/api/js?key=AlzaSy9KIx6JJDZ-3j6c5lQ5IFxNRWOheQu6Oxr&libraries=geometry,places&callback=initMap";
      script.async = true;
      script.defer = true;
      window.initMap = initMap; 
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();

    return () => {
      const script = document.querySelector(`script[src="${script.src}"]`);
      if (script) {
        document.body.removeChild(script);
      }
      delete window.initMap; 
    };
  }, []);

  return (
    <div>
      <input id="pac-input" type="text" placeholder="Search for a place" />
      <div id="map" style={{ height: '400px', width: '50%' }}></div>
    </div>
  );
};

export default MapComponent;
