import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./LocationsMap.css";

const LocationsMap = ({ fields, defaultCenter }) => {
  return (
    <div className="locationsMapSection">
      <MapContainer
        center={defaultCenter}
        zoom={5}
        scrollWheelZoom={false}
        className="leafletMapContainer"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fields.map((field) => {
          if (!field.lat || !field.lng) return null;

          return (
            <Marker key={field.id} position={[field.lat, field.lng]}>
              <Popup>
                <div className="mapPopupContent">
                  <strong>{field.title}</strong>
                  <p>{field.location}</p>
                  <span>€{field.price}</span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default LocationsMap;
