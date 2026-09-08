import React, { useId } from "react";
import "./InputField.css";

const InputField = React.memo(
  ({
    label,
    icon,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    error,
    id: customId,
    ...props
  }) => {
    const generatedId = useId();
    const inputId = customId || generatedId;

    return (
      <div className="inputWrapper">
        {label && (
          <label htmlFor={inputId} className="inputLabelContainer">
            {icon && <img src={icon} alt="" className="inputIcon" />}
            <span>{label}</span>
          </label>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`customInput ${error ? "inputError" : ""}`}
          {...props}
        />
        {error && <span className="errorText">{error}</span>}
      </div>
    );
  },
);

export default InputField;
