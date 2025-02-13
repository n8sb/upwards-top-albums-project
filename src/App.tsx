import { useState } from "react";
import "./App.css";
import { AlbumList } from "./components/AlbumList/AlbumList";
import { AlbumSortBy, FilterSelection } from "./common/types";
import { Header } from "./components/Header/Header";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<AlbumSortBy>(null);
  const [filters, setFilters] = useState<FilterSelection>({
    genre: [],
    decade: [],
  });

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filters={filters}
        setFilters={setFilters}
      />
      <AlbumList
        searchQuery={searchQuery}
        sortBy={sortBy}
        filters={filters}
      />
    </>
  );
}

export default App;
