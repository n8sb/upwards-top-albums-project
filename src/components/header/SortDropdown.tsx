import { useState } from "react";
import { CapitalizeFirstLetter } from "../../common/utils";
import {
  AlbumSortBy,
  sortDropdownOptions,
  SortType,
  SortValue,
} from "../../types";
import style from "./Header.module.css";
import { SortOptions } from "./SortOptions";

type SortDropdownProps = {
  sortBy: AlbumSortBy;
  setSortBy: (sortBy: AlbumSortBy) => void;
};

const SortDropdown = ({ sortBy, setSortBy }: SortDropdownProps) => {
  const [selectedSort, setSelectedSort] = useState<AlbumSortBy>(null);

  const handleSetSelectedSort = (sortOption: SortValue, type: SortType) => {
    setSelectedSort(() => `${sortOption} ${type}` as AlbumSortBy);
    console.log(selectedSort);
  };

  const handleTriggerSort = () => {
    setSortBy(selectedSort);
  };

  const clearSort = () => {
    setSelectedSort(null);
    setSortBy(null);
  };

  return (
    <>
      <button className={style.dropdownButton}>
        {sortBy ?? "Sort Albums"}
      </button>
      <div className={style.dropdownContent}>
        <div>Sort By</div>
        {sortDropdownOptions.map((sortOption, index) => {
          return (
            <div
              key={index}
              className={style.sortOptionGroup}>
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
        <div className={style.dropdownButtonContainer}>
          <button onClick={clearSort}>Clear</button>
          <button onClick={handleTriggerSort}>Sort</button>
        </div>
      </div>
    </>
  );
};

export default SortDropdown;
