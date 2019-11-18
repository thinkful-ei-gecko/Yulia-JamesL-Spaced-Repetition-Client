import React, { Component } from 'react';
import config from '../../config';
import { Input, Required, Label} from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import TokenService from '../../services/token-service';

class LearningRoute extends Component {

  state = {
    head: '',
    total: '',
    wordCorrectCount: '',
    wordIncorrectCount: ''
  }

  componentDidMount() {
  // getHeadWord(() => {
    fetch(`${config.API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok) ? res.json().then(e => Promise.reject(e)) 
      : res.json())
      .then(data => {
        console.log(data)
        this.setState({
          head: data.nextWord,
          total: data.totalScore,
          wordCorrectCount: data.wordCorrectCount,
          wordIncorrectCount: data.wordIncorrectCount

        })
        console.log(this.state)
      })
  
}

  render() {
    return (
      <section>
        <header>
          <h2>Translate:</h2>
          <span>{this.state.head}</span>
        </header>

        <form>
          <p>{`Total score: ${this.state.total}`}</p>
          <Input 
            id="translate-input"
            name="question"
            required
          />
          <Button type="submit">Submit</Button>
        </form>
        <p className="word-stats">
          Answered Correctly: {this.state.wordCorrectCount} times
        </p>
        <p className="word-stats">
          Answered Incorrectly: {this.state.wordIncorrectCount} times
        </p>
      </section>
    );
  }
}

export default LearningRoute
