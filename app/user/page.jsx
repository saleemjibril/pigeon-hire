import Categories from "@/app/components/categories";
import ConnectorsAndCommunities from "@/app/components/connectorsAndCommunities";
import Filters from "@/app/components/filters";
import Header from "@/app/components/header";
import HomeInner from "@/app/components/homeInner";
import Search from "@/app/components/search";
import SearchResults from "@/app/components/searchResults";
import Sidebar from "@/app/components/sidebar";


export async function generateMetadata() {
  return {
    title: "Dashboard",
    description:
      "Project Management, Engineering Construction & Design, Supply of Integrated Services, Supervision, Environmental Consultancy",
  };
}


export default function Home() {
  return (
     

     <HomeInner />
  );
}
