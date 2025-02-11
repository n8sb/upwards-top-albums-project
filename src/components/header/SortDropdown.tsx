import { useState } from "react";
import { CapitalizeFirstLetter } from "../../common/utils";
import {
  AlbumSortBy,
  sortDropdownOptions,
  SortType,
  SortValue,
} from "../../types";
import style from "./Header.module.css";

type SortDropdownProps = {
  sortBy: string;
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
          console.log(sortOption);
          return (
            <div
              key={index}
              className={style.sortOptionGroup}>
              <div>{CapitalizeFirstLetter(sortOption)}</div>
              <div className={style.sortOption}>
                <input
                  type='radio'
                  name='sort ascending'
                  value={`${sortOption} ascending`}
                  checked={selectedSort === `${sortOption} ascending`}
                  onChange={() =>
                    handleSetSelectedSort(sortOption, "ascending")
                  }
                />
                <label htmlFor={sortOption}>Ascending</label>
              </div>
              <div className={style.sortOption}>
                <input
                  type='radio'
                  name='sort descending'
                  value={`${sortOption} descending`}
                  checked={selectedSort === `${sortOption} descending`}
                  onChange={() =>
                    handleSetSelectedSort(sortOption, "descending")
                  }
                />
                <label htmlFor={sortOption}>Descending</label>
              </div>
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
