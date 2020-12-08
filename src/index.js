import React from 'react';
import ReactDOM from 'react-dom';
import { QuizQuestions } from './QuizQuestions';
import Quiz from './Quiz';

function App() {
  return (
    <div>
      <Quiz />
    </div>
  )
}

export default App

const rootElement = document.getElementById('root')
ReactDOM.render(<App></App>, rootElement)