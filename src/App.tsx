import { useState } from "react";
import "./App.css";
import { AlbumList } from "./components/AlbumList/AlbumList";
import { AlbumSortBy } from "./types";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<AlbumSortBy>(null);

  return (
    <>
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
