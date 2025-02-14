import { useEffect, useRef, useState } from "react";
import styles from "./SortPanel.module.css";
import { capitalizeFirstLetter } from "../../common/utils";
import { AlbumSortBy, SortType, SortOption } from "../../common/types";
import { SortOptions } from "../SortOptions/SortOptions";
import sortIcon from "/sort.svg";
import descendingIcon from "/descending.svg";
import ascendingIcon from "/ascending.svg";
import closeIcon from "/clear.svg";
import { sortOptions } from "../../common/dataSources";

type SortDropdownProps = {
  sortBy: AlbumSortBy;
  setSortBy: (sortBy: AlbumSortBy) => void;
};

export const SortDropdown = ({ sortBy, setSortBy }: SortDropdownProps) => {
  const [selectedSort, setSelectedSort] = useState<AlbumSortBy>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !dropdownButtonRef.current?.contains(event.target as Node)
      ) {
        setSelectedSort(sortBy);
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSetSelectedSort = (sortOption: SortOption, type: SortType) => {
    setSelectedSort(() => `${sortOption} ${type}` as AlbumSortBy);
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
        ref={dropdownButtonRef}
        className={styles.dropdownButton}
        onClick={handleShowDropdown}>
        {sortBy
          ? capitalizeFirstLetter(
              sortBy?.replace(/(ascending|descending)/g, "")
            )
          : "Sort"}
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
              <div>{capitalizeFirstLetter(sortOption)}</div>
              <SortOptions
                sortOption={sortOption}
                selectedSort={selectedSort || sortBy}
                handleSetSelectedSort={handleSetSelectedSort}
                sortType='ascending'
              />
              <SortOptions
                sortOption={sortOption}
                selectedSort={selectedSort || sortBy}
                handleSetSelectedSort={handleSetSelectedSort}
                sortType='descending'
              />
            </div>
          );
        })}
        <div className={styles.dropdownActionButtonContainer}>
          {selectedSort && (
            <button
              onClick={clearSort}
              className={"clear"}>
              Clear Sort
            </button>
          )}
          <button onClick={handleTriggerSort}>
            {selectedSort !== null ? "Sort" : "Close"}
          </button>
        </div>
      </div>
    </>
  );
};
