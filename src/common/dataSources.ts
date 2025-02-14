// update types are updated as sort options are added
export const sortOptions = ["artist", "album", "release date"] as const;

export const filterOptions = ["genre", "decade", "showFavorites"] as const;

export const genres = [
  "Alternative",
  "Christian",
  "Classical",
  "Country",
  "Metal",
  "Musicals",
  "Pop",
  "R&B/Soul",
  "Reggae",
  "Rock",
  "Singer/Songwriter",
  "Soundtrack",
] as const;

export const decades = [
  "1960",
  "1970",
  "1980",
  "1990",
  "2000",
  "2010",
  "2020",
] as const;
