import React, { useRef, useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import marker from './../assets/marker.png';

const customMarkerIcon = new L.Icon({
  iconUrl: marker,
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
});

const center = [40.426909, -86.918681];

const markers = [
  { position: [40.425132, -86.928165], description: "McCutcheon" },
  { position: [40.427039, -86.926240], description: "Hillenbrand" },
  { position: [40.425089, -86.926756], description: "Harrison" },
  { position: [40.425824, -86.924838], description: "Earhart" },
  { position: [40.424943, -86.924511], description: "First Street Towers" },
  { position: [40.426828, -86.924989], description: "Shreve" },
  { position: [40.426305, -86.923319], description: "Meredith" },
  { position: [40.425547, -86.923639], description: "Meredith South" },
  { position: [40.426786, -86.919499], description: "Honors College" },
  { position: [40.432151, -86.920707], description: "Owen" },
  { position: [40.430566, -86.920629], description: "Tarkington" },
  { position: [40.422964, -86.911770], description: "Hawkins" },
  { position: [40.428467, -86.919533], description: "Frieda Parker" },
  { position: [40.431920, -86.917980], description: "Cary Quadrangle" },
  { position: [40.426734, -86.921001], description: "Windsor" },
  { position: [40.429501, -86.920690], description: "Wiley" },
  { position: [40.427827, -86.920124], description: "Winifred Parker" }
];



const MapComponent = ({dormName}) => {
  const mapRef = useRef();

  useEffect(() => {
    
    for(let i=0; i<markers.length; i++){
      if(markers[i].description==dormName){
        mapRef.current.setView(markers[i].position, 20); 
      }
    }

  }, [dormName]);

  return (
    <div>
      <MapContainer center={center}
                    zoom={15}
                    style={{ 
                      width: '100%', 
                      height: '60vh', // Fills remaining viewport height below the header
                      borderRadius: '10px',
                      marginBottom: '10px',
                    }}
                    ref={mapRef}>
        <TileLayer
          url="https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=r9VcUJXvffmbBImhSAM4"
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={customMarkerIcon}
            eventHandlers={{
              click: () => {
                mapRef.current.setView(marker.position, 20); 
              },
            }}
          >
            <Popup>{marker.description}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;