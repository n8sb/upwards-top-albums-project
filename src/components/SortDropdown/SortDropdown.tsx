import { useEffect, useRef, useState } from "react";
import styles from "./SortDropdown.module.css";
import { CapitalizeFirstLetter } from "../../common/utils";
import { AlbumSortBy, sortOptions, SortType, SortValue } from "../../types";
import { SortOptions } from "../SortOptions/SortOptions";
import sortIcon from "/sort.svg";
import descendingIcon from "/descending.svg";
import ascendingIcon from "/ascending.svg";
import closeIcon from "/clear.svg";

type SortDropdownProps = {
  sortBy: AlbumSortBy;
  setSortBy: (sortBy: AlbumSortBy) => void;
};

export const SortDropdown = ({ sortBy, setSortBy }: SortDropdownProps) => {
  const [selectedSort, setSelectedSort] = useState<AlbumSortBy>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSetSelectedSort = (sortOption: SortValue, type: SortType) => {
    setSelectedSort(() => `${sortOption} ${type}` as AlbumSortBy);
    console.log(selectedSort);
  };

  const handleTriggerSort = () => {
    setSortBy(selectedSort);
    setShowDropdown(() => !showDropdown);
  };

  const clearSort = () => {
    setSelectedSort(null);
    setSortBy(null);
  };

  const handleShowDropdown = () => {
    setShowDropdown(() => !showDropdown);
  };

  const getSortIcon = (sortBy: AlbumSortBy): string => {
    if (sortBy?.includes("ascending")) {
      return ascendingIcon;
    } else if (sortBy?.includes("descending")) {
      return descendingIcon;
    }

    return sortIcon;
  };

  return (
    <>
      <button
        className={styles.dropdownButton}
        onClick={handleShowDropdown}>
        {sortBy ? CapitalizeFirstLetter(sortBy.split(" ")[0]) : "Sort Albums"}
        <img
          src={getSortIcon(sortBy)}
          alt='Close'
          style={{ "height": "15px" }}
        />
      </button>
      <div
        ref={dropdownRef}
        className={`${styles.dropdownContent} ${showDropdown && styles.show}`}>
        <div className={styles.dropdownHeader}>
          <div>Sort By</div>
          <img
            src={closeIcon}
            alt='Close'
            style={{ "height": "15px" }}
            onClick={handleShowDropdown}
          />
        </div>
        {sortOptions.map((sortOption, index) => {
          return (
            <div
              key={index}
              className={styles.sortOptionGroup}>
              <div>{CapitalizeFirstLetter(sortOption)}</div>
              <SortOptions
                sortOption={sortOption}
                selectedSort={selectedSort}
                handleSetSelectedSort={handleSetSelectedSort}
                sortType='ascending'
              />
              <SortOptions
                sortOption={sortOption}
                selectedSort={selectedSort}
                handleSetSelectedSort={handleSetSelectedSort}
                sortType='descending'
              />
            </div>
          );
        })}
        <div className={styles.dropdownActionButtonContainer}>
          {sortBy && <button onClick={clearSort}>Clear</button>}
          <button onClick={handleTriggerSort}>
            {selectedSort !== null ? "Sort" : "Close"}
          </button>
        </div>
      </div>
    </>
  );
};
