import { useEffect, useState } from 'react';
const API_KEY = '8ddb70a6';

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();

      const fetchMovies = async () => {
        try {
          setIsLoading(true);
          setError('');
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error('Something went wrong with fetching movies');
          }
          const data = await res.json();
          if (data.Response === 'False') throw new Error('Movie not found');

          setMovies(data.Search);
          setError('');
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      };

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      // handleDeselectMovie();
      fetchMovies();

      // Cleanup function, uses browser native controll API
      // this helps sending multiple HTTP request in this case
      // Prevent the race conditions
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
