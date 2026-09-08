import "./Button.css";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`customBtn ${className}`.trim()}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
