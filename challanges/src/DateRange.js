import { useState } from 'react';

const DateRangePicker = ({ onValueChange, predefinedRanges }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handlePrevYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)
    );
  };

  const handleNextYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1)
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // handle selecting the range
  const handleDayClick = (day) => {
    if (startDate && !endDate && day > startDate) {
      setEndDate(day);
      onValueChange(
        [formatDate(startDate), formatDate(day)],
        [getWeekendDates(startDate, day)]
      );
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  };

  // format date to YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // resets the dates (selected range, set to current date)
  const reset = () => {
    setStartDate(null);
    setEndDate(null);
    setCurrentDate(new Date());
  };

  // get array of weekend dates between two dates
  const getWeekendDates = (start, end) => {
    let dates = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        dates.push(formatDate(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  // handle predefined date ranges
  const handlePredefinedRange = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setStartDate(start);
    setEndDate(end);
    onValueChange(
      [formatDate(start), formatDate(end)],
      getWeekendDates(start, end)
    );
  };

  const getDaysInMonth = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get the first and last day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();

    // Add the last few days of the previous month to start the calendar
    let daysArray = [];
    for (let i = firstDayOfMonth; i > 0; i--) {
      daysArray.push(new Date(year, month - 1, lastDayOfPrevMonth - i + 1));
    }

    // Add the days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(new Date(year, month, i));
    }

    // Add the first few days of the next month to complete the calendar
    const daysToAddForNextMonth = 7 - (daysArray.length % 7);
    if (daysToAddForNextMonth < 7) {
      for (let i = 1; i <= daysToAddForNextMonth; i++) {
        daysArray.push(new Date(year, month + 1, i));
      }
    }

    return daysArray;
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar">
      <div className="calendar__nav">
        <div className="calendar__btn-group">
          <button className="calendar__nav-btn" onClick={handlePrevYear}>
            &lt;&lt;
          </button>
          <button className="calendar__nav-btn" onClick={handlePrevMonth}>
            &lt;
          </button>
        </div>

        <span>
          {`${
            monthNames[currentDate.getMonth()]
          }, ${currentDate.getFullYear()}`}
        </span>

        <div className="calendar__btn-group">
          <button className="calendar__nav-btn" onClick={handleNextMonth}>
            &gt;
          </button>
          <button className="calendar__nav-btn" onClick={handleNextYear}>
            &gt;&gt;
          </button>
        </div>
      </div>

      <div className="calendar">
        <div className="calendar__grid">
          {dayNames.map((name, index) => (
            <div key={index} className="calendar__day-label">
              {name}
            </div>
          ))}

          {days.map((day, index) => {
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const isToday = day.toDateString() === today.toDateString();
            const isSelected =
              startDate && day >= startDate && (!endDate || day <= endDate);
            const isWeekend = day.getDay() === 0 || day.getDay() === 6;
            return (
              <div
                key={index}
                className={`calendar__day ${isCurrentMonth ? '' : 'inactive'} ${
                  isToday ? 'today' : ''
                } ${isSelected && !isWeekend ? 'selected' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                {day.getDate()}
              </div>
            );
          })}
        </div>
        <div className="calendar__footer">
          {predefinedRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => handlePredefinedRange(range.days)}
            >
              {range.label}
            </button>
          ))}
          <button className="reset" onClick={reset}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  // Not needed the states here, unless need to update
  // UI or send/pass the Dates to any backend/api
  const [ranges, setRanges] = useState([]);
  const [weekends, setWeekends] = useState([]);

  // Retrieve dates from DateRangePicker when selected/availble
  const handleDateRangeChange = (selectedRange, weekendDates) => {
    setRanges(selectedRange);
    setWeekends(weekendDates);
    console.log('Selected range:', selectedRange);
    console.log('Weekend dates:', weekendDates);
  };

  const predefinedRanges = [
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 30 Days', days: 30 },
  ];

  return (
    <>
      <DateRangePicker
        onValueChange={handleDateRangeChange}
        predefinedRanges={predefinedRanges}
      />

      <div className="output">
        <div>
          <strong>Selected Range: </strong>
          {ranges[0] && ranges[1] ? `[${ranges[0]}, ${ranges[1]}]` : 'None'}
        </div>

        <div>
          <strong>Weekend Dates: </strong>
          {weekends.length > 0
            ? `[${weekends.map((date) => date).join(', ')}]`
            : 'None'}
        </div>
      </div>
    </>
  );
};

export default App;
