import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./FieldDetails.css";
import map from "../../../public/assets/images/map-location.svg";

const FieldDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockFields = [
      {
        id: "1",
        title: "Vegetable field S - unplanted in Edenbridge, Kent",
        location: "UK",
        size: "20sqm",
        price: "100,0",
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        description:
          "An ideal unplanted plot ready for your custom vegetable cultivation. Located in a fertile and easily accessible area of Edenbridge, Kent.",
      },
      {
        id: "2",
        title: "Unplanted field L in Trysull, Staffordshire",
        location: "UK",
        size: "40sqm",
        price: "170,0",
        image:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
        description:
          "Spacious large plot in Staffordshire, perfect for larger scale planting projects.",
      },
      {
        id: "3",
        title: "Unplanted field L in Waldbergheim",
        location: "Germany",
        size: "40sqm",
        price: "180,0",
        image:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
        description:
          "Beautiful plot in Waldbergheim with great climate conditions.",
      },
    ];

    setTimeout(() => {
      const found = mockFields.find((f) => f.id === id) || mockFields[0];
      setField(found);
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="fieldDetailsPage">
          <p>Загрузка информации о поле...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="fieldDetailsPage">
        <button className="backButton" onClick={() => navigate(-1)}>
          ← Back to Shop
        </button>

        <div className="fieldDetailsContainer">
          <div className="fieldDetailsImageWrapper">
            <img
              src={field.image}
              alt={field.title}
              className="fieldDetailsImage"
            />
          </div>

          <div className="fieldDetailsContent">
            <h1 className="fieldDetailsTitle">{field.title}</h1>
            <div className="fieldDetailsLocation">
              <img src={map} alt="Map location" className="fieldDetailsLocationIcon" />
              {field.location}
            </div>

            <div className="fieldDetailsMeta">
              <div className="metaRow">
                <span>Plot Size:</span>
                <strong>{field.size}</strong>
              </div>
              <div className="metaRow">
                <span>Guide Price:</span>
                <span className="metaPrice">€{field.price}</span>
              </div>
            </div>

            <p
              style={{ color: "#555", lineHeight: "1.6", marginBottom: "2rem" }}
            >
              {field.description}
            </p>

            <div className="fieldDetailsActions">
              <button
                className="actionInvestBtn"
                onClick={() => alert(`Invest in field ${field.id}`)}
              >
                Invest Now
              </button>
              <button
                className="actionReserveBtn"
                onClick={() => alert(`Reserve field ${field.id}`)}
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FieldDetails;
