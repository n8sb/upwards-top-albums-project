import { capitalizeFirstLetter } from "../../common/utils";
import { AlbumSortBy, SortType, SortOption } from "../../common/types";
import styles from "./SortOptions.module.css";

type SortOptionsProps = {
  sortOption: SortOption;
  selectedSort: AlbumSortBy;
  handleSetSelectedSort: (sortOption: SortOption, sortType: SortType) => void;
  sortType: SortType;
};

export const SortOptions = ({
  sortOption,
  selectedSort,
  handleSetSelectedSort,
  sortType,
}: SortOptionsProps) => {
  return (
    <div className={styles.sortOption}>
      <input
        type='radio'
        name={`sort ${sortType}`}
        value={`${sortOption} ${sortType}`}
        checked={selectedSort === `${sortOption} ${sortType}`}
        onChange={() => handleSetSelectedSort(sortOption, sortType)}
      />
      <label htmlFor={sortOption}>{capitalizeFirstLetter(sortType)}</label>
    </div>
  );
};
