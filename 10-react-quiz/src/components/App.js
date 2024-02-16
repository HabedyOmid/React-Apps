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
import { useQuiz } from '../contexts/QuizContext';

export default function App() {
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    timeRemaining,
    dispatch,
  } = useQuiz();

  const totalQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

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
