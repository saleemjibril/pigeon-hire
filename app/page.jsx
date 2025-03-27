import Categories from "./components/categories";
import ConnectorsAndCommunities from "./components/connectorsAndCommunities";
import Filters from "./components/filters";
import Header from "./components/header";
import Search from "./components/search";
import Sidebar from "./components/sidebar";


export async function generateMetadata() {
  return {
    title: "Home",
    description:
      "Project Management, Engineering Construction & Design, Supply of Integrated Services, Supervision, Environmental Consultancy",
  };
}


export default function Home() {
  return (
    <div className="home">
      <Sidebar />

      <div className="home__inner">
      <Header />
      <div className="home__inner__inner">

      <Search />
      <br />
      <Filters />
      <Categories />
      <ConnectorsAndCommunities />
      </div>
      </div>
    </div>
  );
}
