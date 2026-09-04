import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { makeSelectUserPlots } from "../../store/userPlotsSlice";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

const MapModal = ({ isOpen, onClose, fields, onInvest }) => {
  const defaultCenter = [51.1657, 10.4515];

  const { user } = useSelector((state) => state.auth);
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

  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="mapModalContent" onClick={(e) => e.stopPropagation()}>
        <div className="mapModalHeader">
          <p className="mapModalTitle">Locations Map</p>
          <button className="closeModalBtn" onClick={onClose}>
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
                            onClick={() => {
                              onClose();
                              onInvest(field.id);
                            }}
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
