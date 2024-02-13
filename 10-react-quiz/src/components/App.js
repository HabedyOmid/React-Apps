import { useEffect, useReducer } from 'react';

import Main from './Main';
import Error from './Error';
import Timer from './Timer';
import Header from './Header';
import Footer from './Footer';
import Loader from './Loader';
import Question from './Question';
import Progress from './Progress';
import StartScreen from './StartScreen';
import NextQuestion from './NextQuestion';
import FinishScreen from './FinishScreen';

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: 'loading', // loading, error, ready, active, finished,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemaining: null,
};

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

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const totalQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen questions={totalQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              answer={answer}
              index={index}
              totalQuestions={totalQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer timeRemaining={timeRemaining} dispatch={dispatch} />
              <NextQuestion
                index={index}
                totalQuestions={totalQuestions}
                dispatch={dispatch}
                answer={answer}
              />
            </Footer>
          </>
        )}

        {status === 'finished' && (
          <FinishScreen
            dispatch={dispatch}
            highscore={highscore}
            points={points}
            maxPosiblePoints={maxPossiblePoints}
          />
        )}
      </Main>
    </div>
  );
}
