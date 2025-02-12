import { AlbumSortBy } from "../../types";
import styles from "./Header.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { SortDropdown } from "../SortDropdown/SortDropdown";

type HeaderProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: AlbumSortBy;
  setSortBy: (value: AlbumSortBy) => void;
};

export const Header = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: HeaderProps) => {
  return (
    <div className={styles.header}>
      <img
        src='/music.png'
        className={styles.header_logo}
      />
      <div className={styles.actionContainer}>
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
