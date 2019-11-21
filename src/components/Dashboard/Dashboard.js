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
      <section className="dashboard">
        <h2>{this.state.language.name}</h2>
        <section className="total-score">Total correct answers: {this.state.language.total_score}</section>
        <h3 className="words-heading">Words to practice</h3>
        <article className="word-list">
        {this.state.words.map((word, index) => {
          return(
           <section key={index} className="word-card">
             <h4 className="word-title">{word.original}</h4>
             <span className="correct-score">correct answer count: {word.correct_count}</span>
             <span className="incorrect-score">incorrect answer count: {word.incorrect_count}</span></section>
          )}
        )}
        </article>
        <Link to='/learn' className="start-practicing">Start practicing</Link>
      </section>
    )
  }
}

export default Dashboard;