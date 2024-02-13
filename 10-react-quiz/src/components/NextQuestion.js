function NextQuestion({ dispatch, answer, index, totalQuestions }) {
  if (answer === null) return null;

  console.log(index);

  if (index < totalQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );

  if (index === totalQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finished' })}
      >
        Finish
      </button>
    );
}

export default NextQuestion;
