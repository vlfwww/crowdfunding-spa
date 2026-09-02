import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./FieldDetails.css";
import map from "../../../public/assets/images/map-location.svg";
import { useGetFieldByIdQuery } from "../../store/api/shopApi";

const FieldDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: field,
    isLoading,
    isError,
  } = useGetFieldByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="fieldDetailsPage">
          <p>Loading field details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (isError || !field) {
    return (
      <>
        <Header />
        <div className="fieldDetailsPage">
          <p>Field not found.</p>
          <button className="backButton" onClick={() => navigate(-1)}>
            ← Back
          </button>
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
              <img
                src={map}
                alt="Map location"
                className="fieldDetailsLocationIcon"
              />
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
