import { Album } from "../../types";
import styles from "./AlbumModal.module.css";

type AlbumModalProps = {
  setSelectedAlbum: (album: Album | null) => void;
  selectedAlbum: Album | null;
};

const AlbumModal = ({ setSelectedAlbum, selectedAlbum }: AlbumModalProps) => {
  return (
    <>
      {selectedAlbum && (
        <div className={`${styles.modal} ${styles.modalOpen}`}>
          <div className={styles.modalContent}>
            <span
              className={styles.close}
              onClick={() => setSelectedAlbum(null)}>
              &times;
            </span>
            <img
              src={selectedAlbum["im:image"][2].label}
              alt={selectedAlbum["im:name"].label}
            />
            <h1>{selectedAlbum["im:name"].label}</h1>
            <h2>{selectedAlbum["im:artist"].label}</h2>
            <a
              href={selectedAlbum.link.attributes.href}
              target='_blank'>
              View on iTunes
            </a>
          </div>
        </div>
      )}
      {selectedAlbum && (
        <div className={`${styles.overlay} ${styles.overlayVisible}`} />
      )}
    </>
  );
};

export default AlbumModal;
