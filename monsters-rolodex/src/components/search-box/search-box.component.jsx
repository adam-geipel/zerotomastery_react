import './search-box.styles.css';


const SearchBox = (props) => {

    const { className, placeholder, onChangeHandler } = props;

    return (
        <input
          className={`search-box ${className}`}
          type='search'
          placeholder={placeholder ?? 'Search'}
          onChange={onChangeHandler} />);
}

export default SearchBox;