import { useReducer, useContext, useEffect, createContext } from 'react';
const CitiesContext = createContext();
const BASE_URL = 'http://localhost:3333';

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        currentCity: {},
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Unknown action');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (err) {
        dispatch({ type: 'rejected', payload: err });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === Number(currentCity.id)) return;
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
    }
  }

  async function createCity(city) {
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'post',
        body: JSON.stringify(city),
        header: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      dispatch({
        type: 'city/created',
        payload: data,
      });
    } catch (err) {
      dispatch({ type: 'rejected', payload: `Failed to create city: ${err}` });
    }
  }

  async function deleteCity(id) {
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'delete',
      });
      dispatch({
        type: 'city/deleted',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: `Failed to delete city: ${err}`,
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error('CitiesContext is used outside the CitiesProvider!');
  return context;
}

export { CitiesProvider, useCities };
