"use client";

import { useState } from "react";
import Categories from "./categories";
import ConnectorsAndCommunities from "./connectorsAndCommunities";
import Filters from "./filters";
import Search from "./search";
import SearchResults from "./searchResults";

export default function HomeInner() {
    const [text, setText] = useState("")
  return (
    <>
    
     <Search text={text} setText={setText} />
      <br />
      <Filters />
      
      {text?.length > 0 ? 
      <SearchResults /> : <>
      <Categories />
      <ConnectorsAndCommunities />
      </>}
    </>
  );
}
