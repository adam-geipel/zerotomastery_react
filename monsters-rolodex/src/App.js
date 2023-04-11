import { Component } from 'react';
import { CardList } from './components/card-list/card-list';
import { SearchBox } from './components/search-box/search-box';
import logo from './logo.svg';
import './App.css';
import SearchBox from "./components/search-box/search-box";

class App extends Component {
  constructor() {
    super();
    this.state = { monsters: [],
                    searchField: '' };
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {return { searchField }});
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState(() => { return {monsters: users} }));
  }

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
        return monster.name.toLowerCase().includes(searchField);
      });

    return (
      <div className='App'>
        <SearchBox />

        <CardList />
      </div>
      );
  }
}

export default App;
