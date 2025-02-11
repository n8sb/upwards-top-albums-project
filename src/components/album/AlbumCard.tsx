import { Album } from "../../types";

export const AlbumCard = ({ album }: { album: Album }) => {
  const {
    id,
    link,
    "im:image": image,
    "im:name": name,
    "im:artist": artist,
  } = album;

  return (
    <div key={id.attributes["im:id"]}>
      <a
        href={link.attributes.href}
        target='_blank'>
        <img
          src={image[0].label}
          alt={name.label}
        />
      </a>
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
  );
};
