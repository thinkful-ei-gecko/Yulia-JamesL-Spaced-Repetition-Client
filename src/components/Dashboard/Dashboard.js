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
    return (
      <section className="dashboard">
        <h2>{this.state.language.name}</h2>
        <section className="total-score">Total correct answers: {this.state.language.total_score}</section>
        <Link to='/learn' className="start-practicing">Start practicing</Link>
        <h3 className="words-heading">Words to practice</h3>
         <ul className="word-list">
          {this.state.words.map((word, index) => {
            return(
             
            <li key={index} className="word-card">
              <h4 className="word-title">{word.original}</h4>
              <span className="correct-score">correct answer count: {word.correct_count}</span>
              <span className="incorrect-score">incorrect answer count: {word.incorrect_count}</span></li>
            )}
          )}
        </ul>
        
      </section>
    )
  }
}

export default Dashboard;