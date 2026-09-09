import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Button from "../../components/Button/Button";

const Home = React.memo(() => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/shop");
  };

  return (
    <main className="homePage">
      <div className="heroSection">
        <h1 className="heroTitle">
          Rent your own field, invest in farming, and grow your own vegetables
        </h1>
        <div className="letsStartBtnWrapper">
          <Button onClick={handleStartClick}>Let&apos;s start</Button>
        </div>
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
            Grow your own piece of land, from planting seeds in the lush soil to
            harvesting your own vegetables.
          </div>
        </div>
      </div>
    </main>
  );
});

export default Home;
