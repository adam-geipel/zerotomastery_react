import {useEffect, useState} from 'react';
import CardList  from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import logo from './logo.svg';
import './App.css';

const App = () => {

  const [ searchField, setSearchField ] = useState('');
  const [ monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users))
  }, []);

  useEffect(() => {
    const updatedFiltered = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    setFilteredMonsters(updatedFiltered);
    }, [monsters, searchField]);

  const onSearchChange = (event) =>{
    const newVal = event.target.value.toLocaleLowerCase();
    setSearchField(newVal);
  }

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox className='monster-search-box' onChangeHandler={onSearchChange} placeholder='Search Monsters'/>
      <CardList monsters={filteredMonsters}/>
    </div>
    );
}

export default App;
