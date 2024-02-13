function FinishScreen({ points, maxPosiblePoints, highscore, dispatch }) {
  let emoji;
  const precentage = (points / maxPosiblePoints) * 100;

  if (precentage === 100) emoji = '🥇';
  if (precentage >= 800 && precentage < 100) emoji = '🎉';
  if (precentage >= 50 && precentage < 80) emoji = '😊';
  if (precentage >= 0 && precentage < 50) emoji = '🤔';
  if (precentage === 0) emoji = '🙈';

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong> {points} </strong>
        <span>
          out of {maxPosiblePoints} ({Math.ceil(precentage)}%)
        </span>
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
