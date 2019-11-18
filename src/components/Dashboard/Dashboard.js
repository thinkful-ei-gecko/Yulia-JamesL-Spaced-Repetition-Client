import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  state = {
    language: '',
    words: [],
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
    ? res.json().then(e => Promise.reject(e))
    : res.json()
    )
    .then(res => {
      console.log(res)
      this.setState({
        language: res.language,
        words: res.words
      });
    })
    .catch(error => {
      console.error({error})
    });
  }

  render() {
    console.log(this.state.language)
    return (
      <section>
        <h2>{this.state.language.name}</h2>
        <section>Total correct answers: {this.state.language.total_score}</section>
        <h3>Words to practice</h3>
        <ul>
        {this.state.words.map((word, index) => {
          return(
           <li key={index}>
             <h4>{word.original}</h4>
             <span>correct answer count: {word.correct_count}</span>
             <span>incorrect answer count: {word.incorrect_count}</span></li>
          )}
        )}
        </ul>
        <Link to='/learn'>Start practicing</Link>
      </section>
    )
  }
}

export default Dashboard;