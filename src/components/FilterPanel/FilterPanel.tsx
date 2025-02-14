import { decades, genres } from "../../common/dataSources";
import {
  Decade,
  FilterSelection,
  FilterType,
  FilterValues,
  Genre,
} from "../../common/types";
import { Panel } from "../Panel/Panel";
import styles from "./FilterPanel.module.css";

type FilterPanelProps = {
  isPanelOpen: boolean;
  onClose: () => void;
  filters: FilterSelection;
  setFilters: (value: FilterSelection) => void;
  setIsPanelOpen: (value: boolean) => void;
};

export const FilterPanel = ({
  isPanelOpen,
  onClose,
  filters,
  setFilters,
  setIsPanelOpen,
}: FilterPanelProps) => {
  const handleSetFilters = (type: FilterType, filterData?: FilterValues) => {
    const newFilters = { ...filters };
    if (type === "genre") {
      const genreData = filterData as Genre;
      if (newFilters.genre.includes(genreData)) {
        newFilters.genre = newFilters.genre.filter(
          (filter) => filter !== genreData
        );
      } else {
        newFilters.genre = [...newFilters.genre, genreData];
      }
    } else if (type === "decade") {
      const decadeData = filterData as Decade;
      if (newFilters.decade.includes(decadeData)) {
        newFilters.decade = newFilters.decade.filter(
          (filter) => filter !== decadeData
        );
      } else {
        newFilters.decade = [...newFilters.decade, decadeData];
      }
    } else {
      newFilters.showFavorites = !newFilters.showFavorites;
    }
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      genre: [],
      decade: [],
      showFavorites: false,
    });
  };

  return (
    <Panel
      openButtonText='Filters'
      clearButtonText='Clear Filters'
      isPanelOpen={isPanelOpen}
      onClose={onClose}
      setIsPanelOpen={setIsPanelOpen}
      onClick={handleClearFilters}>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionHeader}>Genre</div>
        <div className={styles.filterOptions}>
          {genres.map((genre, index) => (
            <div
              key={index}
              className={styles.filterCheckbox}>
              <input
                type='checkbox'
                id={genre}
                name={genre}
                checked={filters.genre.includes(genre)}
                onChange={() => handleSetFilters("genre", genre)}
              />
              <label htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionHeader}>Decade</div>
        <div className={styles.filterOptions}>
          {decades.map((decade, index) => (
            <div
              key={index}
              className={styles.filterCheckbox}>
              <input
                type='checkbox'
                id={decade.toString()}
                name={decade.toString()}
                checked={filters.decade.includes(decade)}
                onChange={() => handleSetFilters("decade", decade)}
              />
              <label htmlFor={decade.toString()}>{decade}s</label>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
};
