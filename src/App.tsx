import { useState } from "react";
import "./App.css";
import { AlbumList } from "./components/album/AlbumList";
import Header from "./components/header/Header";
import { AlbumSortBy } from "./types";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<AlbumSortBy>("");

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <AlbumList
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </>
  );
}

export default App;
