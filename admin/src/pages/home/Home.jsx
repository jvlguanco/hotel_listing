import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          <h1>Welcome to Admin Page</h1>
          <div className="hList">
            <Link to="/users" style={{ textDecoration: "none" }}>
                <span>Users</span>
            </Link>
            <Link to="/hotels" style={{ textDecoration: "none" }}>
                <span>Hotels</span>
            </Link>
            <Link to="/rooms" style={{ textDecoration: "none" }}>
                <span>Rooms</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
