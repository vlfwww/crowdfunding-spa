import "./AddCardModal.css";

const AddCardModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleFieldChange,
  errors,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <p className="modalContentTitle">Add New Bank Card</p>
        <form onSubmit={onSubmit} className="cardForm" noValidate>
          <div className="formGroup">
            <label>Card Number</label>
            <input
              type="text"
              maxLength="19"
              placeholder="4242 4242 4242 4242"
              value={formData.cardNumber}
              onChange={(e) => handleFieldChange("cardNumber", e.target.value)}
              className={errors.cardNumber ? "inputError" : ""}
            />
            {errors.cardNumber && (
              <span className="errorText">{errors.cardNumber}</span>
            )}
          </div>

          <div className="formGroup">
            <label>Cardholder Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.cardHolder}
              onChange={(e) => handleFieldChange("cardHolder", e.target.value)}
              className={errors.cardHolder ? "inputError" : ""}
            />
            {errors.cardHolder && (
              <span className="errorText">{errors.cardHolder}</span>
            )}
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Expiry Date</label>
              <input
                type="text"
                maxLength="5"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={(e) =>
                  handleFieldChange("expiryDate", e.target.value)
                }
                className={errors.expiryDate ? "inputError" : ""}
              />
              {errors.expiryDate && (
                <span className="errorText">{errors.expiryDate}</span>
              )}
            </div>

            <div className="formGroup">
              <label>CVV / CVC</label>
              <input
                type="password"
                maxLength="3"
                placeholder="•••"
                value={formData.cvv}
                onChange={(e) => handleFieldChange("cvv", e.target.value)}
                className={errors.cvv ? "inputError" : ""}
              />
              {errors.cvv && <span className="errorText">{errors.cvv}</span>}
            </div>
          </div>

          <div className="modalActions">
            <button type="button" className="cancelBtn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submitBtn">
              Save Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;
