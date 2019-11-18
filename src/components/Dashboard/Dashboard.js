import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';

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
    console.log(this.state.words)
    return (
      <section>
        <ul>
        {this.state.words.map((word, index) => {
          return(
           <li key={index}>{word.original}</li>
          )}
        )}
        </ul>
      </section>
    )
  }
}

export default Dashboard;