import { AlbumSortBy, SortType, SortValue } from "../../types";
import style from "./Header.module.css";

type SortOptionsProps = {
  sortOption: SortValue;
  selectedSort: AlbumSortBy;
  handleSetSelectedSort: (sortOption: SortValue, sortType: SortType) => void;
  sortType: SortType;
};

export const SortOptions = ({
  sortOption,
  selectedSort,
  handleSetSelectedSort,
  sortType,
}: SortOptionsProps) => {
  return (
    <div className={style.sortOption}>
      <input
        type='radio'
        name={`sort ${sortType}`}
        value={`${sortOption} ${sortType}`}
        checked={selectedSort === `${sortOption} ${sortType}`}
        onChange={() => handleSetSelectedSort(sortOption, sortType)}
      />
      <label htmlFor={sortOption}>Descending</label>
    </div>
  );
};
