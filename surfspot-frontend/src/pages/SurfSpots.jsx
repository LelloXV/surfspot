// src/pages/SurfSpots.jsx
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/App.css';
import { addSurfspot } from '../api/surfspots';
import PopupModal from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function SurfSpots() {
  const [spots, setSpots] = useState([]);
  const [newSpot, setNewSpot] = useState(null); // {lat, lng}
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isOpen, setIsOpen] = useState(false);

  // Carica gli spot
  useEffect(() => {
    fetch("http://localhost:3000/surfspots")
      .then(res => res.json())
      .then(data => setSpots(Array.isArray(data) ? data : []));
  }, []);

  // Gestione click sulla mappa
  function MapEvents() {
    useMapEvents({
      click(e) {
        setNewSpot({ lat: e.latlng.lat, lng: e.latlng.lng });
        setFormData({ name: "", description: "" });
        setIsOpen(true); // apri il modal
      },
    });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newSpot) return;

    try {
      const token = localStorage.getItem("jwtToken");
      const saved = await addSurfspot(
        {
          name: formData.name,
          description: formData.description,
          latitude: newSpot.lat,
          longitude: newSpot.lng,
        },
        token
      );

      if (saved && typeof saved.latitude === 'number' && typeof saved.longitude === 'number') {
        setSpots(prev => [...prev, saved]);
      }
      setIsOpen(false); // chiudi modal
      setNewSpot(null);
    } catch (err) {
      alert("Errore: " + err.message);
    }
  };

  return (
    <>
      <MapContainer
        center={[42, 12]}
        zoom={5}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />

        {/* Marker esistenti */}
        {spots.map((spot) => (
          <Marker
            key={spot.id ?? `${spot.latitude}-${spot.longitude}-${spot.name}`}
            position={[spot.latitude, spot.longitude]}
          >
            <Popup>
              <strong>{spot.name}</strong><br />
              {spot.description || "Nessuna descrizione"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Popup modale separato */}
      <PopupModal open={isOpen} onClose={() => setIsOpen(false)} modal nested>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Aggiungi un nuovo Spot</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Nome spot"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border p-1"
              required
            />
            <textarea
              placeholder="Descrizione"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border p-1"
              rows={3}
            />
            <button type="submit" className="bg-blue-500 text-black px-2 py-1 rounded">
              Salva
            </button>
          </form>
        </div>
      </PopupModal>
    </>
  );
}
