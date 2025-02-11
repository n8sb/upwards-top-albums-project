import style from "./Header.module.css";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  const handleAlbumSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={style.searchBarContainer}>
      <input
        className={style.searchBar}
        onChange={handleAlbumSearch}
        value={searchQuery}
        placeholder='Search for an album...'
      />
    </div>
  );
};

export default SearchBar;
