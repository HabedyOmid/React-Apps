import { useNavigate, useRouteError } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();

  // This component has acccess to error 'useRouteError' from react-router
  // The error object is global app error, 404 page, custom errors set inside
  // components, loader() or any async functions
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
