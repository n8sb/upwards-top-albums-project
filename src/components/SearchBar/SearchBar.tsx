import styles from "./SearchBar.module.css";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  const handleAlbumSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        className={styles.searchBar}
        onChange={handleAlbumSearch}
        value={searchQuery}
        placeholder='Search by album or artist...'
      />
    </div>
  );
};

export default SearchBar;
