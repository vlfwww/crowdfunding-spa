import "./Button.css";

const Button = ({ children, onClick, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="customBtn"
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
