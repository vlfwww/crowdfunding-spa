import "./InputField.css";

const InputField = ({
  label,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className="inputWrapper">
      {label && (
        <label className="inputLabelContainer">
          {icon && <img src={icon} alt="" className="inputIcon" />}
          <span>{label}</span>
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="customInput"
      />
    </div>
  );
};

export default InputField;
