import styles from "./AlbumCard.module.css";
import { Album } from "../../common/types";

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

  //get alternative sized album images
  const largerImage = image[2].label.replace("170x170", "600x600");

  return (
    <>
      <div
        onClick={() => setSelectedAlbum(album)}
        key={id.attributes["im:id"]}
        className={styles.albumCard}>
        <img
          className={styles.albumImage}
          src={largerImage}
          alt={name.label}
        />
        <div className={styles.albumText}>
          <a
            className={styles.albumName}
            href={link.attributes.href}
            target='_blank'>
            <div>{name.label}</div>
          </a>
          <a
            className={styles.albumArtist}
            href={artist?.attributes?.href}
            target='_blank'>
            <div>{artist.label}</div>
          </a>
        </div>
      </div>
    </>
  );
};
