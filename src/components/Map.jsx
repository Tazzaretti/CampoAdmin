import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ onMapClick }) => {
  const [mapPosition, setMapPosition] = useState([0, 0]);
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    // Inicializar el mapa
    const map = L.map('map').setView(mapPosition, mapZoom);

    // Agregar una capa de mapa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Agregar un evento de clic al mapa para obtener las coordenadas
    map.on('click', function(e) {
      const latlng = e.latlng;
      const lat = latlng.lat;
      const lng = latlng.lng;
      console.log('Coordenadas seleccionadas:', lat, lng);
      // Llamar a la función proporcionada por la prop onMapClick
      onMapClick(lat, lng);
    });

    // Actualizar el estado de la posición y el zoom del mapa cuando cambien
    map.on('moveend', function() {
      setMapPosition(map.getCenter());
      setMapZoom(map.getZoom());
    });

    // Limpieza al desmontar el componente
    return () => {
      map.remove();
    };
  }, [mapPosition, mapZoom, onMapClick]); // Ejecutar solo una vez al montar el componente

  return <div id="map" style={{ height: '400px' }} />;
};

export default Map;
