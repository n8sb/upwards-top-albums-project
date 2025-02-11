import { Suspense, useEffect, useState } from "react";
import style from "./AlbumList.module.css";
import { AlbumCard } from "./AlbumCard";
import { Album, AlbumSortBy } from "../../types";

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

  console.log(isLoading, setSearchQuery, setSortBy);

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
    <Suspense fallback={<div>Loading...</div>}>
      <div className={style.albumListContainer}>
        {albumData &&
          albumData.map((album) => (
            <AlbumCard
              key={album.id.attributes["im:id"]}
              album={album}
            />
          ))}
      </div>
    </Suspense>
  );
};
