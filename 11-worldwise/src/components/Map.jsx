import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';

import styles from './Map.module.css';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeoLocation';
import { useUrlPosition } from '../hooks/useUrlPosition';
import Button from './Button';

function Map() {
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPostion,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPosition();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geoLocationPostion)
        setMapPosition([geoLocationPostion.lat, geoLocationPostion.lng]);
    },
    [geoLocationPostion]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPostion && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChanageCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChanageCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
