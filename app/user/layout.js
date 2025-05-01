import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function UserLayout({ children }) {
  return (
    <div className="home">
      <Sidebar />

      <div className="home__inner">
        <Header />
        <div className="home__inner__inner">{children}</div>
      </div>

      <div className="home__mobile">
        View on desktop for better experience
      </div>
    </div>
  );
}
