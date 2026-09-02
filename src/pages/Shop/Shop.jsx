import { useState, useEffect } from "react";
import FieldCard from "../../components/FieldCard/FieldCard";
import "./Shop.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import dropdownIcon from "../../../public/assets/images/dropdown-arrow.svg";
import filterIcon from "../../../public/assets/images/filter.svg";
import mapIcon from "../../../public/assets/images/map-pin.svg";

const Shop = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockFields = [
      {
        id: 1,
        title: "Vegetable field S - unplanted in Edenbridge, Kent",
        location: "UK",
        size: "20sqm",
        price: "100,0",
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 2,
        title: "Unplanted field L in Trysull, Staffordshire",
        location: "UK",
        size: "40sqm",
        price: "170,0",
        image:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 3,
        title: "Unplanted field L in Waldbergheim",
        location: "Germany",
        size: "40sqm",
        price: "180,0",
        image:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80",
      },
    ];

    setTimeout(() => {
      setFields(mockFields);
      setLoading(false);
    }, 500);
  }, []);

  const handleInvest = (id) => {
    console.log(`Invest in field ID: ${id}`);
  };

  const handleReserve = (id) => {
    console.log(`Reserve field ID: ${id}`);
  };

  return (
    <>
      <Header />
      <div className="shopPage">
        <div className="shopHeader">
          <span className="shopTab">Invest</span>

          <div className="controlsPanel">
            <button className="sortControl">
              Sort by <span className="sortValue">All</span>{" "}
              <img src={dropdownIcon} className="dropdownIcon" alt="Sort" />
            </button>
            <button className="filterBtn">
              Filter
              <img src={filterIcon} className="filterIcon" alt="Filter" />
            </button>
            <button className="mapBtn">
              <img src={mapIcon} className="mapIcon" alt="Map" />
              Map
            </button>
          </div>
        </div>

        {loading ? (
          <p>Загрузка полей...</p>
        ) : (
          <div className="fieldsGrid">
            {fields.map((field) => (
              <FieldCard
                key={field.id}
                field={field}
                onInvest={handleInvest}
                onReserve={handleReserve}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Shop;
