import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: 'loading', // loading, error, ready, active, finished,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemaining: null,
};

const SECONDS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return {
        ...state,
        status: 'active',
        timeRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'timesUp':
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? 'finished' : state.status,
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };
    default:
      throw new Error('unknown action');
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        timeRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('UseQuiz is accessed outside QuizProvider');

  return context;
}

export { QuizProvider, useQuiz };
