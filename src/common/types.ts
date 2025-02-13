import { decades, filterOptions, genres, sortOptions } from "./dataSources";

// albumm daya types
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
  label: Label;
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

// sort types
export type SortOption = (typeof sortOptions)[number];
export type SortType = "ascending" | "descending";
export type AlbumSortBy = `${SortOption} ${SortType}` | null;

// filter types
export type FilterType = (typeof filterOptions)[number];
export type Genre = (typeof genres)[number];
export type Decade = (typeof decades)[number];

export type FilterSelection = {
  decade: Decade[];
  genre: Genre[];
};

export type FilterValues = Decade | Genre;
