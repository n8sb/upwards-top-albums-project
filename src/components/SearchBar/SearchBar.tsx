import styles from "./SearchBar.module.css";
import clearIcon from "/clear.svg";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className={styles.searchBarContainer}>
      <input
        type='text'
        className={styles.searchBar}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search albums...'
      />
      {searchQuery !== "" && (
        <img
          src={clearIcon}
          alt='Clear search'
          className={styles.clearSearchIcon}
          onClick={() => setSearchQuery("")}
        />
      )}
    </div>
  );
};

export default SearchBar;
