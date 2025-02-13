import { useEffect, useState } from "react";
import { AlbumSortBy } from "../../types";
import SearchBar from "../SearchBar/SearchBar";
import { SortDropdown } from "../SortDropdown/SortDropdown";
import styles from "./Header.module.css";

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
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimated((prev) => !prev);
    }, 4000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.headerLeftContainer}>
        <img
          src='/ITunes_logo.png'
          className={styles.headerLogo}
        />
        <h1
          className={`${styles.headerTitle} ${
            isAnimated ? styles.animate : ""
          }`}>
          iTunes Top 100 Albums
        </h1>
      </div>
      <div className={styles.actionContainer}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <SortDropdown
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <button>Filter</button>
      </div>
    </div>
  );
};
