import { useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { makeSelectUserPlots } from "../../store/usersSlice";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapModal.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapInvalidator = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

const MapModal = ({ isOpen, onClose, fields, onInvest }) => {
  const defaultCenter = [51.1657, 10.4515];

  const { currentUser: user } = useSelector((state) => state.users) || {};
  const userId = user?.id;

  const selectUserPlots = useMemo(() => makeSelectUserPlots(userId), [userId]);
  const userPlots = useSelector(selectUserPlots);
  const { reservedIds = [], investedIds = [] } = userPlots;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleInvestClick = useCallback(
    (fieldId) => {
      onClose();
      onInvest(fieldId);
    },
    [onClose, onInvest],
  );

  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="mapModalContent" onClick={(e) => e.stopPropagation()}>
        <div className="mapModalHeader">
          <p className="mapModalTitle">Locations Map</p>
          <button
            className="closeModalBtn"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="mapModalBody">
          <MapContainer
            center={defaultCenter}
            zoom={5}
            scrollWheelZoom={true}
            className="leafletModalMapContainer"
          >
            <MapInvalidator />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {fields.map((field) => {
              if (!field.lat || !field.lng) return null;

              const isInvested = investedIds.includes(field.id);
              const isReserved = reservedIds.includes(field.id);

              return (
                <Marker key={field.id} position={[field.lat, field.lng]}>
                  <Popup>
                    <div className="mapPopupContent">
                      <div className="mapPopupHeaderRow">
                        <strong>{field.title}</strong>
                        {isInvested && (
                          <span className="miniBadge invested">Invested</span>
                        )}
                        {!isInvested && isReserved && (
                          <span className="miniBadge reserved">Reserved</span>
                        )}
                      </div>

                      <p>{field.location}</p>

                      <div className="mapPopupFooter">
                        <span className="mapPopupPrice">€{field.price}</span>
                        {!isInvested && (
                          <button
                            className="mapPopupInvestBtn"
                            onClick={() => handleInvestClick(field.id)}
                          >
                            Invest
                          </button>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
