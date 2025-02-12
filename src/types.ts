type Label = string;

interface AlbumCategory {
  attributes: {
    "im:id": string;
    label: Label;
    scheme: string;
    term: string;
  };
}

interface AlbumID {
  attributes: {
    "im:id": string;
  };
}

interface AlbumArtist {
  attributes: {
    href: string;
  };
  label: Label;
}

interface AlbumContent {
  attributes: {
    term: string;
    label: Label;
  };
  "im:contentType": Omit<AlbumContent, "im:contentType">;
}

interface AlbumImage {
  attributes: {
    height: string;
  };
  label: Label;
}

interface AlbumItemCount {
  label: Label;
}

interface AlbumName {
  label: Label;
}

interface AlbumPrice {
  attributes: {
    amount: string;
    currency: string;
  };
}

interface AlbumReleaseDate {
  attributes: {
    label: Label;
  };
}

interface AlbumLink {
  attributes: {
    href: string;
    rel: string;
    type: string;
  };
}

interface AlbumRights {
  label: Label;
}

interface AlbumTitle {
  label: Label;
}

export interface Album {
  category: AlbumCategory;
  id: AlbumID;
  "im:artist": AlbumArtist;
  "im:contentType": AlbumContent;
  "im:image": AlbumImage[];
  "im:itemCount": AlbumItemCount;
  "im:name": AlbumName;
  "im:price": AlbumPrice;
  "im:releaseDate": AlbumReleaseDate;
  link: AlbumLink;
  rights: AlbumRights;
  title: AlbumTitle;
}

// update types as sort uptions are added
export const sortOptions = ["artist", "album", "release date"] as const;
export type SortValue = (typeof sortOptions)[number];

export type SortType = "ascending" | "descending";
export type AlbumSortBy = `${SortValue} ${SortType}` | null;

export const filterOptions = ["year", "genre"] as const;
export type FilterValue = (typeof filterOptions)[number];
