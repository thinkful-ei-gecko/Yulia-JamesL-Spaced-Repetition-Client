import React, { Component } from 'react';
import config from '../../config';
import './LearningRoute.css';
import { Input } from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import TokenService from '../../services/token-service';

class LearningRoute extends Component {

  state = {
    head: '',
    total: '',
    wordCorrectCount: '',
    wordIncorrectCount: '',
    guess: '',
    answer: '',
    isCorrect: null
  };

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok) ? res.json().then(e => Promise.reject(e)) 
      : res.json())
      .then(data => {
        this.setState({
          head: data.nextWord,
          total: data.totalScore,
          wordCorrectCount: data.wordCorrectCount,
          wordIncorrectCount: data.wordIncorrectCount

        });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({guess: this.state.guess})
    })
    .then(res => 
      (!res.ok) ? res.json().then(e => Promise.reject(e)) 
      : res.json())
    .then(data => {
      this.setState({
        answer: data.answer,
        isCorrect: data.isCorrect,
        head: data.nextWord,
        total: data.totalScore,
        wordCorrectCount: data.wordCorrectCount,
        wordIncorrectCount: data.wordIncorrectCount
      });
    });
  };

  handleNext = () => {
    this.setState({
      answer: '',
      guess: ''
    })
  }

  handleInput = (e) => {
    const guess = e.target.value;
    this.setState({
      guess: guess
    });
  };

  render() {
    let result;
    if(this.state.isCorrect === true) {
      result = <h2 className="correct-prompt">You are correct!</h2>
    };
    if(this.state.isCorrect === false) {
      result = (
        <>
          <h2 className="incorrect-prompt">You are incorrect!</h2>
          <p className="correct-answer-prompt">
            The correct answer is "{this.state.answer}"
          </p>
        </>
      );
    };
    return (
      <section className="learn-section">
        <h4 className="total">{`Total score: ${this.state.total}`}</h4>
        <div className="check-input">
          {!this.state.answer ? (
            <h2 className="translate">Translate:</h2>)
            : (
            <div className="feedback">
              {this.state.isCorrect ? result: result}
            </div>
          )}
        </div>
        {!this.state.answer ? (
          <div className="word-display">
            <span>{this.state.head}</span>
          </div>
          ) : (<div> {" "}
        </div>)}

      {!this.state.answer ? (
        <form className="word-guess-form" onSubmit={e => this.handleSubmit(e)}>

              <Input 
                id="translate-input"
                type="text"
                value={this.state.guess}
                onChange={e => this.handleInput(e)}
                name="question"
                required
              />
              <Button className="submit-btn" type="submit">Submit</Button>
            
        </form>
        
        ) : (
          <Button className="next-btn" onClick={this.handleNext}>Next Word</Button>
        )}
        {!this.state.answer ? (
          <>
            <p className="word-stats">
              Answered Correctly: {this.state.wordCorrectCount} times
            </p>
            <p className="word-stats">
              Answered Incorrectly: {this.state.wordIncorrectCount} times
            </p>
          </>
        ) : (
          <p className="message">Keep practicing! You're doing fantastico!</p>
        )}
      </section>
    );
  };
};

export default LearningRoute;
