import { Album } from "./types";

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getAlbumYear = (album: Album) => {
  return album["im:releaseDate"].attributes.label.split(" ")[2];
};
