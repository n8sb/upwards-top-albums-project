import { AlbumSortBy } from "../../types";
import style from "./Header.module.css";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";

type HeaderProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: AlbumSortBy;
  setSortBy: (value: AlbumSortBy) => void;
};

const Header = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: HeaderProps) => {
  return (
    <div className={style.header}>
      <img
        src='/music.png'
        className={style.header_logo}
      />
      <div className={style.actionContainer}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <SortDropdown
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
    </div>
  );
};

export default Header;
