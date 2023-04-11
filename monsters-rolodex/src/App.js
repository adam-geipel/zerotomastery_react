import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// users from jsonplaceholder.typicode.com/users

class App extends Component {
  constructor() {
    super();
    this.state = [];
  }

  componentDidMount() {
    this.state.monsters = fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json());
  }

  render() {
    return (
      <div>
        { this.state.monsters.map((monster) => {
          return <h1 key={`monster_${monster.id}`}>{monster.name}</h1>;
        })}
      </div>
      );
  }
}


export default App;
