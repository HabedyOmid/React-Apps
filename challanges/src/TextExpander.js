import { useState } from 'react';

const boxStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '7px',
  backgroundColor: '#f7f7f7',
  margin: '0 0 20px 0',
};

const TextExpander = ({
  collapsedNumWords = 10,
  expandButtonText = 'Show more',
  collapseButtonText = 'Show less',
  buttonColor = '#ff6622',
  expanded = true,
  className = '',
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  function splitStringByWords(str, numberOfWords) {
    return str.split(/\s+/).slice(0, numberOfWords).join(' ') + '...';
  }

  const displayText = isExpanded
    ? children
    : splitStringByWords(children, collapsedNumWords);

  return (
    <div style={boxStyle} className={className}>
      {displayText}
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
};

export default TextExpander;
