import { useState } from 'react';

const quetions = require('./questions.json');

const FlashCard = () => {
  return (
    <div className="flashcards">
      {quetions.map((question) => (
        <Card question={question} key={question.id} />
      ))}
    </div>
  );
};

const Card = (props) => {
  const { question, answer } = props.question;
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={selected ? 'selected' : ''}
      onClick={() => setSelected((f) => !f)}
    >
      {`${selected ? answer : question}`}
    </div>
  );
};
export default FlashCard;
