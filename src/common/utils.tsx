import { Album } from "./types";

// capitalize the first letter of a string
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// get the year of the album
export const getAlbumYear = (album: Album) => {
  return album["im:releaseDate"].attributes.label.split(" ")[2];
};
