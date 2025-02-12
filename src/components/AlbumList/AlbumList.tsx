import { useEffect, useState } from "react";
import { Album, AlbumSortBy } from "../../types";
import { AlbumCard } from "../AlbumCard/AlbumCard";
import styles from "./AlbumList.module.css";
import AlbumModal from "../AlbumModal/AlbumModal";

type AlbumListProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: AlbumSortBy;
  setSortBy: (value: AlbumSortBy) => void;
};

export const AlbumList = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: AlbumListProps) => {
  const ALBUM_URL = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";
  const [albumData, setAlbumData] = useState<Album[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  console.log(
    isLoading,
    setSearchQuery,
    setSortBy,
    selectedAlbum,
    setSelectedAlbum
  );

  const getData = async () => {
    try {
      const newData = await fetch(ALBUM_URL);
      const json = await newData.json();
      console.log(json);
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

  console.log(searchQuery, sortBy);

  // const filteredAlbumData = albumData?.filter((album) => {
  //   return album["im:name"].label.includes(searchQuery);
  // });

  // const getSortedALbumData = () => {
  //   const sortedAlbumData = albumData?.sort((a, b) => {
  //     return a["im:name"].label.localeCompare(b["im:name"].label);
  //   });
  //   setAlbumData(sortedAlbumData);
  // };

  // const sortedAlbumData = filteredAlbumData?.sort((a, b) => {
  //   return a["im:name"].label.localeCompare(b["im:name"].label);
  // });

  return (
    <div className={styles.albumListContainer}>
      {albumData &&
        albumData.map((album) => (
          <AlbumCard
            setSelectedAlbum={setSelectedAlbum}
            key={album.id.attributes["im:id"]}
            album={album}
          />
        ))}
      <AlbumModal
        selectedAlbum={selectedAlbum}
        setSelectedAlbum={setSelectedAlbum}
      />
    </div>
  );
};
