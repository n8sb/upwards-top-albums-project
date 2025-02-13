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

type AlbumListProps = {
  searchQuery: string;
  sortBy: AlbumSortBy;
  filters: FilterSelection;
};

export const AlbumList = ({ searchQuery, sortBy, filters }: AlbumListProps) => {
  const ALBUMS_URL = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";
  const [albumData, setAlbumData] = useState<Album[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  console.log(isLoading, selectedAlbum, setSelectedAlbum);

  const getData = async () => {
    try {
      const newData = await fetch(ALBUMS_URL);
      const json = await newData.json();
      setAlbumData(json.feed.entry);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

    //compare genres
    if (filters.genre.length !== 0) {
      filteredAlbums = filteredAlbums?.filter((album) => {
        return filters.genre.includes(album.category.attributes.label as Genre);
      });
    }

    //compare decades
    if (filters.decade.length !== 0) {
      filteredAlbums = filteredAlbums?.filter((album) => {
        const yearEnd =
          album["im:releaseDate"].attributes.label.split(" ")[2].slice(0, -1) +
          "0";
        return filters.decade.includes(yearEnd as Decade);
      });
    }

    return filteredAlbums || sortedAlbumData;
  };

  return (
    <div className={styles.albumListContainer}>
      {getFilteredAlbums()?.map((album) => {
        return (
          <AlbumCard
            setSelectedAlbum={setSelectedAlbum}
            key={album.id.attributes["im:id"]}
            album={album}
          />
        );
      })}
    </div>
  );
};

{
  /* <AlbumModal
        selectedAlbum={selectedAlbum}
        setSelectedAlbum={setSelectedAlbum}
      /> */
}
