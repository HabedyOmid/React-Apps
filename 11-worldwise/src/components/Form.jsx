import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Form.module.css';
import { useUrlPosition } from '../hooks/useUrlPosition';
import Message from './Message';
import Button from './Button';
import Spinner from './Spinner';
import BackButton from './BackButton';
import { useCities } from '../contexts/CitiesContext';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [emoji, setEmoji] = useState('');
  const { createCity, isLoading } = useCities();
  const [error, setError] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeoCoding] = useState(false);
  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();

  const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

  useEffect(
    function () {
      if (!lat || !lng) return;

      async function fetchCityData() {
        try {
          setError('');
          setIsLoadingGeoCoding(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              'That doest seem to be a city, click somewhere else that is part of city.'
            );

          setCityName(data.city || data.locality || '');
          setCountry(data.countryName || '');
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          setError(error.message);
          throw new Error(error);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate('/app');
  }

  if (error) return <Message message={error} />;
  if (isLoadingGeocoding) return <Spinner />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          dateFormat="dd/MM/yyyy"
          onChange={() => (date) => setDate(date)}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <BackButton />
        <Button type="primary">Add</Button>
      </div>
    </form>
  );
}

export default Form;
