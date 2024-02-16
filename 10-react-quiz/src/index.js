import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { QuizProvider } from './contexts/QuizContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QuizProvider>
    <App />
  </QuizProvider>
);
