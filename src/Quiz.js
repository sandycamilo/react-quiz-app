import React, { Component } from 'react'
import { QuizQuestions } from './QuizQuestions'
import './styles.css'


export class Quiz extends Component {

  constructor(props) { //Quiz component where we store the states needed
    super(props)

    this.state = {
      userAnswer: null, //initial state is null 
      currentIndex: 0, //first one is 0
      options: [],  //empty array for options of every question
      quizEnd: false, //quiz is starting 
      score: 0, //beginning 
      disabled: true //cannot click next until user has selected an option
    }
  }

  loadQuiz = () => {
    const {currentIndex} = this.state; //selecting current undex -  first one is 0 
    this.setState(() => {
      return { //return question data
        question: QuizQuestions[currentIndex].question,
        options: QuizQuestions[currentIndex].options,
        answer: QuizQuestions[currentIndex].answer
      }
    })
  }

  nextQuestionHandler = () => {
    const {userAnswer, answer, score} = this.state

    if(userAnswer === answer){
      this.setState ({
        score: score + 1 
      })
    }
    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null
    })
  }

  componentDidMount() {
    this.loadQuiz();
  }

  checkAnswer = answer => {
    this.setState({
      userAnswer: answer,
      disabled: false
    })
  }

  componentDidUpdate(prevProps, prevState){
    const{currentIndex} = this.state;
    if(this.state.currentIndex !== prevState.currentIndex) {
      this.setState(() => {
        return { //return question data
          question: QuizQuestions[currentIndex].question,
          options: QuizQuestions[currentIndex].options,
          answer: QuizQuestions[currentIndex].answer
        }
      });
    }
  }

  finishHandler =() => {
    if(this.state.currentIndex === QuizQuestions.length -1){
      this.setState({
        quizEnd:true
      })
    }
  }

  render() {
    const{question, options, currentIndex, userAnswer, quizEnd} = this.state

    if(quizEnd) {
      return (
        <div>
          <h1>Game Over. Final score is {this.state.score} points</h1>
          <p>The correct answers for the quiz are:</p>
          <ul>
            {QuizQuestions.map((item, index) => (
              <li className= 'options'
                key={index}>
                    {item.answer}
              </li>
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div>
        <div class="container">
          <div class="inner">
            <h2>{question}</h2>
            {
              options.map(option =>
              <p key = {option.id} className={`options ${userAnswer === option? "selected": null}`} 
              onClick = {() => this.checkAnswer(option)}
              >
                {option}
              </p>  
              )
            }

            {currentIndex < QuizQuestions.length - 1 && 
            <button class= "next" disabled = {this.state.disabled} onClick={this.nextQuestionHandler}>
            Next
            </button>}
            {currentIndex === QuizQuestions.length-1 && 
            <button class= "next" disabled= {this.state.disabled} onClick={this.finishHandler}>
              All Done!
            </button>}
          </div>
        </div>
        <span>{`Question ${currentIndex + 1} of ${QuizQuestions.length}`}</span>
      </div>
    )
  }
}

export default Quiz
