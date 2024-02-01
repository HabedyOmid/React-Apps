import { useState } from 'react';
import { useGeoLocation } from './useGeoLocation';

export default function GeoLocation() {
  const [countClicks, setCountClicks] = useState(0);

  const {
    isLoading,
    position: { lat, lng },
    error,
    getPosition,
  } = useGeoLocation();

  function handleClick() {
    setCountClicks((count) => count + 1);
    getPosition();
  }

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.google.com/maps/@${lat},${lng},15z?entry=ttu`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}
      <p>You requested position {countClicks} times</p>
    </div>
  );
}
