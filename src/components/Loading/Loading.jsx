import "./Loading.css";

const Loading = ({ children = "Loading..." }) => (
  <div className="loading" role="status" aria-live="polite">
    <span className="loadingSpinner" aria-hidden="true" />
    <span>{children}</span>
  </div>
);

export default Loading;
