import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/App.css';

export default function SurfSpots() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/surfspots")
      .then(res => res.json())
      .then(data => setSpots(data));
  }, []);

  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        console.log("Clicked at", e.latlng);
      },
    });
    return null;
  };

  return (
    <MapContainer center={[42, 12]} zoom={5}>
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <TileLayer 
	    attribution= 'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
      url='https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'
      />
      <TileLayer 
      url="http://localhost:3000/weather?z={z}&x={x}&y={y}"
	    attribution= 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
      />
      <ClickHandler />
        {Array.isArray(spots) && spots.map(spot => (
          <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
            <Popup>
              <strong>{spot.name}</strong><br />
              {spot.description || "Nessuna descrizione"}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
