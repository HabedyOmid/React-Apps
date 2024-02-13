function StartScreen({ questions, dispatch }) {
  return (
    <div className="start-screen">
      <h2>Welcome to the react quiz!</h2>
      <h3>{questions} Questions to test your react knowledge.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
