import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="homePage">
        <div className="heroSection">
          <h1 className="heroTitle">
            Rent your own field, invest in farming, and grow your own vegetables
          </h1>
          <button className="letsStartBtn" onClick={() => navigate("/shop")}>
            Let's start
          </button>
        </div>

        <div className="cardsSection">
          <div className="homeCard">
            <div className="homeCardCaption">
              Rent your own piece of farmland and watch your vegetables grow.
            </div>
          </div>

          <div className="homeCard">
            <div className="homeCardCaption">
              Enjoy, year after year, the wonders of nature with your rented
              vegetable farmland (60 sqm / 30 sqm).
            </div>
          </div>

          <div className="homeCard">
            <div className="homeCardCaption">
              Grow your own piece of land, from planting seeds in the lush soil
              to harvesting your own vegetables.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
