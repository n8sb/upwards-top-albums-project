import { useState } from "react";
import { AlbumSortBy, FilterSelection } from "../../common/types";
import { FilterPanel } from "../FilterPanel/FilterPanel";
import SearchBar from "../SearchBar/SearchBar";
import { SortDropdown } from "../SortPanel/SortPanel";
import styles from "./Header.module.css";

type HeaderProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: AlbumSortBy;
  setSortBy: (value: AlbumSortBy) => void;
  filters: FilterSelection;
  setFilters: (value: FilterSelection) => void;
};

export const Header = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filters,
  setFilters,
}: HeaderProps) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.headerLeftContainer}>
        <img
          src='/music-logo.svg'
          className={styles.headerLogo}
        />
        <h1 className={styles.headerTitle}>iTunes Top Albums</h1>
      </div>
      <div className={styles.actionContainer}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className={styles.sortFilterContainer}>
          <SortDropdown
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            isPanelOpen={isPanelOpen}
            setIsPanelOpen={setIsPanelOpen}
            onClose={() => setIsPanelOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};
