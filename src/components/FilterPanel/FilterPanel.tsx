import { decades, genres } from "../../common/dataSources";
import {
  Decade,
  FilterSelection,
  FilterType,
  FilterValues,
  Genre,
} from "../../common/types";
import styles from "./FIlterPanel.module.css";
import closeIcon from "/clear.svg";

type FilterPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterSelection;
  setFilters: (value: FilterSelection) => void;
  setIsPanelOpen: (value: boolean) => void;
};

export const FilterPanel = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  setIsPanelOpen,
}: FilterPanelProps) => {
  const handleSetFilters = (type: FilterType, filterData: FilterValues) => {
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
    } else {
      const decadeData = filterData as Decade;
      if (newFilters.decade.includes(decadeData)) {
        newFilters.decade = newFilters.decade.filter(
          (filter) => filter !== decadeData
        );
      } else {
        newFilters.decade = [...newFilters.decade, decadeData];
      }
    }
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      genre: [],
      decade: [],
    });
  };

  return (
    <>
      <button
        onClick={() => {
          setIsPanelOpen(true);
        }}>
        Filters
      </button>
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        onClick={onClose}
      />
      <div className={`${styles.slidePanel} ${isOpen ? styles.open : ""}`}>
        <h2>Filters</h2>
        <div className={styles.panelHeader}>
          <img
            src={closeIcon}
            alt='Close'
            style={{ "height": "15px" }}
          />
        </div>
        <div className={styles.slidePanelContent}>
          <div className={styles.filterSection}>
            <div>Genre</div>
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
            <div>Decade</div>
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
          <div className={styles.dropdownActionButtonContainer}>
            <button onClick={handleClearFilters}>Clear Filters</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};
