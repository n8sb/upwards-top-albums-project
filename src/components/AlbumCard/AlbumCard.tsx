import { memo, useEffect, useState } from "react";
import { Album } from "../../common/types";
import styles from "./AlbumCard.module.css";
import favoriteIcon from "/favorite.svg";
import notFavoriteIcon from "/not-favorite.svg";

type AlbumCardProps = {
  album: Album;
  setSelectedAlbum?: (album: Album) => void;
};

export const AlbumCard = memo(function AlbumCard({ album }: AlbumCardProps) {
  const {
    id,
    link,
    "im:image": image,
    "im:name": name,
    "im:artist": artist,
  } = album;

  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem(id.attributes["im:id"]) === "true"
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  //get alternative sized album images from formatted url
  const largerImage = image[2].label.replace("170x170", "340x340");

  const handleMakeFavorite = () => {
    if (isFavorite) {
      localStorage.removeItem(id.attributes["im:id"]);
      setIsFavorite(false);
    } else {
      localStorage.setItem(id.attributes["im:id"], "true");
      setIsFavorite(true);
      // Only trigger animation when favoriting
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnimating) {
      timer = setTimeout(() => {
        setIsAnimating(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isAnimating]);

  return (
    <div
      key={id.attributes["im:id"]}
      className={`${styles.albumCard} ${
        isAnimating ? styles.animatedBorder : ""
      }`}>
      {!imageLoaded && (
        <div className={styles.imagePlaceholder}>
          <div className={styles.shimmer}></div>
        </div>
      )}
      <img
        className={`${styles.albumImage} ${imageLoaded ? styles.loaded : ""}`}
        src={largerImage}
        alt={name.label}
        onLoad={handleImageLoad}
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
      <div className={styles.favoriteContainer}>
        {isFavorite ? (
          <img
            onClick={handleMakeFavorite}
            className={`${styles.favoriteIcon} ${
              isAnimating ? styles.rotate : ""
            }`}
            src={favoriteIcon}
            alt='not favorite'
          />
        ) : (
          <img
            onClick={handleMakeFavorite}
            className={styles.favoriteIcon}
            src={notFavoriteIcon}
            alt='favorite'
          />
        )}
      </div>
    </div>
  );
});
