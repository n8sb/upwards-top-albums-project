import styles from "./AlbumCard.module.css";
import { Album } from "../../types";
import { useState } from "react";

type AlbumCardProps = {
  album: Album;
  setSelectedAlbum: (album: Album) => void;
};

export const AlbumCard = ({ album, setSelectedAlbum }: AlbumCardProps) => {
  const {
    id,
    link,
    "im:image": image,
    "im:name": name,
    "im:artist": artist,
  } = album;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        onClick={() => setSelectedAlbum(album)}
        key={id.attributes["im:id"]}>
        <img
          className={styles.albumImage}
          src={image[2].label}
          alt={name.label}
          onClick={handleOpenModal}
        />
        <a
          href={link.attributes.href}
          target='_blank'>
          <div>{name.label}</div>
        </a>
        <a
          href={artist?.attributes?.href}
          target='_blank'>
          <div>{artist.label}</div>
        </a>
      </div>
    </>
  );
};
