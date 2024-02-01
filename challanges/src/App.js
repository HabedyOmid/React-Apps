import Profile from './Profile';
import Counter from './Counter';
import FlashCard from './FlashCard';
import Accordion from './Accordion';
import TipCalculator from './TipCalculator';
import StarRating from './StarRating';
import TextExpander from './TextExpander';
import DateRange from './DateRange';
import CurrencyConverter from './CurrencyConverter';

const App = () => {
  return (
    <>
      <div className="container">
        <p className="title">Challange #1 - User Profile</p>
        <Profile />
      </div>

      <div className="container">
        <p className="title">Challange #2 - Counter</p>
        <Counter />
      </div>

      <div className="container">
        <p className="title">Challange #3 - Flash Card</p>
        <FlashCard />
      </div>

      <div className="container">
        <p className="title">Challange #4 - Accordion</p>
        <Accordion />
      </div>

      <div className="container">
        <p className="title">Challange #5 - Tip Calculator</p>
        <TipCalculator />
      </div>

      <div className="container">
        <p className="title">Challange #6 - Star Rating</p>
        <StarRating />
      </div>

      <div className="container">
        <p className="title">Challange #7 - Text Expander</p>
        <TextExpander>
          Space travel is the ultimate adventure! Imagine soaring past the stars
          and exploring new worlds. It's the stuff of dreams and science
          fiction, but believe it or not, space travel is a real thing. Humans
          and robots are constantly venturing out into the cosmos to uncover its
          secrets and push the boundaries of what's possible.
        </TextExpander>

        <TextExpander
          collapsedNumWords={20}
          expandButtonText="Show text"
          collapseButtonText="Collapse text"
          buttonColor="#ff6622"
        >
          Space travel is the ultimate adventure! Imagine soaring past the stars
          and exploring new worlds. It's the stuff of dreams and science
          fiction, but believe it or not, space travel is a real thing. Humans
          and robots are constantly venturing out into the cosmos to uncover its
          secrets and push the boundaries of what's possible.
        </TextExpander>

        <TextExpander expanded={true} className="box">
          Space travel is the ultimate adventure! Imagine soaring past the stars
          and exploring new worlds. It's the stuff of dreams and science
          fiction, but believe it or not, space travel is a real thing. Humans
          and robots are constantly venturing out into the cosmos to uncover its
          secrets and push the boundaries of what's possible.
        </TextExpander>
      </div>

      <div className="container">
        <p className="title">Challange #8 - Date Range</p>
        <DateRange />
      </div>

      <div className="container">
        <p className="title">Challange #9 - Currency Converter</p>
        <CurrencyConverter />
      </div>
    </>
  );
};

export default App;
