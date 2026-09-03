import { useParams, useNavigate } from "react-router-dom";
import "./FieldDetails.css";
import map from "../../../public/assets/images/map-location.svg";
import { useGetFieldByIdQuery } from "../../store/api/shopApi";
import { useDispatch } from "react-redux";
import { toggleReserve, investPlot } from "../../store/userPlotsSlice";

const FieldDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleInvest = (id) => {
    dispatch(investPlot(id));
  };

  const handleReserve = (id) => {
    dispatch(toggleReserve(id));
  };

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
        <div className="fieldDetailsPage">
          <p>Loading field details...</p>
        </div>
      </>
    );
  }

  if (isError || !field) {
    return (
      <>
        <div className="fieldDetailsPage">
          <p>Field not found.</p>
          <button className="backButton" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </>
    );
  }

  return (
    <>
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

            <p className="fieldDetailsDescription">{field.description}</p>

            <div className="fieldDetailsActions">
              <button
                className="actionInvestBtn"
                onClick={() => handleInvest(field.id)}
              >
                Invest Now
              </button>
              <button
                className="actionReserveBtn"
                onClick={() => handleReserve(field.id)}
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FieldDetails;
