import { useEffect, useState } from "react";
import {
  Album,
  AlbumSortBy,
  Decade,
  FilterSelection,
  Genre,
} from "../../common/types";
import { AlbumCard } from "../AlbumCard/AlbumCard";
import styles from "./AlbumList.module.css";
import { getAlbumYear } from "../../common/utils";

type AlbumListProps = {
  searchQuery: string;
  sortBy: AlbumSortBy;
  filters: FilterSelection;
  setSearchQuery: (value: string) => void;
  setSortBy: (value: AlbumSortBy) => void;
  setFilters: (value: FilterSelection) => void;
};

export const AlbumList = ({
  searchQuery,
  sortBy,
  filters,
  setSearchQuery,
  setSortBy,
  setFilters,
}: AlbumListProps) => {
  const ALBUMS_URL = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";
  const [albumData, setAlbumData] = useState<Album[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState<string | unknown>("");

  const getData = async () => {
    try {
      const newData = await fetch(ALBUMS_URL);
      const json = await newData.json();
      setAlbumData(json.feed.entry);
    } catch (error) {
      console.log(error);
      setDataError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClearSearch = () => {
    setSearchQuery("");
    setSortBy(null);
    setFilters({
      genre: [],
      decade: [],
      showFavorites: false,
    });
  };

  //Search, filter, and sort album data
  const searchedAlbumData = albumData?.filter((album) => {
    const lowercaseSearchQuery = searchQuery.trim().toLowerCase();
    return (
      album["im:name"].label.toLowerCase().includes(lowercaseSearchQuery) ||
      album["im:artist"].label.toLowerCase().includes(lowercaseSearchQuery)
    );
  });

  const sortedAlbumData = searchedAlbumData?.sort((a, b) => {
    switch (sortBy) {
      case "album ascending":
        return a["im:name"].label.localeCompare(b["im:name"].label);
      case "album descending":
        return b["im:name"].label.localeCompare(a["im:name"].label);
      case "artist ascending":
        return a["im:artist"].label.localeCompare(b["im:artist"].label);
      case "artist descending":
        return b["im:artist"].label.localeCompare(a["im:artist"].label);
      case "release date ascending":
        return (
          new Date(a["im:releaseDate"].attributes.label).getTime() -
          new Date(b["im:releaseDate"].attributes.label).getTime()
        );
      case "release date descending":
        return (
          new Date(b["im:releaseDate"].attributes.label).getTime() -
          new Date(a["im:releaseDate"].attributes.label).getTime()
        );
      default:
        return 0;
    }
  });

  const getFilteredAlbums = () => {
    let filteredAlbums: Album[] | undefined = sortedAlbumData;

    if (filters.showFavorites) {
      filteredAlbums = filteredAlbums?.filter((album) => {
        return localStorage.getItem(album.id.attributes["im:id"]) === "true";
      });
    }

    if (filters.genre.length !== 0) {
      filteredAlbums = filteredAlbums?.filter((album) => {
        return filters.genre.includes(album.category.attributes.label as Genre);
      });
    }

    if (filters.decade.length !== 0) {
      filteredAlbums = filteredAlbums?.filter((album) => {
        const year = getAlbumYear(album).slice(0, -1) + "0";
        return filters.decade.includes(year as Decade);
      });
    }

    return filteredAlbums || sortedAlbumData;
  };

  const filteredAlbums = getFilteredAlbums();

  return isLoading ? (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingIcon}></div>
      {(dataError as string) && (
        <div className={styles.loadingText}>
          {`Issue Loading Data: ${dataError}`}
        </div>
      )}
    </div>
  ) : filteredAlbums?.length === 0 ? (
    <div className={styles.emptySearchContainer}>
      <div className={styles.emptySearchMessage}>No albums found</div>
      <button
        className={styles.clearSearchButton}
        onClick={handleClearSearch}>
        Clear Search
      </button>
    </div>
  ) : (
    <div className={styles.albumListContainer}>
      {filteredAlbums?.map((album) => (
        <AlbumCard
          key={album.id.attributes["im:id"]}
          album={album}
        />
      ))}
    </div>
  );
};
