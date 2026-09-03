import { useState, useEffect } from "react";
import "./CheckoutModal.css";

const CheckoutModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  subtitle,
  totalAmount,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const [cardHolder, setCardHolder] = useState("Veronika Kontsevaya");
  const [cardNumber, setCardNumber] = useState("4532 5800 1429 8892");
  const [expiry, setExpiry] = useState("08/28");
  const [cvv, setCvv] = useState("382");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setErrors({});
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!cardHolder.trim()) {
      newErrors.cardHolder = "Cardholder name is required";
    } else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(cardHolder)) {
      newErrors.cardHolder = "Name should contain only letters";
    }

    const rawCard = cardNumber.replace(/\s+/g, "");
    if (!/^\d{16}$/.test(rawCard)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Use MM/YY format";
    }

    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 1500);
  };

  return (
    <div className="modalOverlay" onClick={() => !isProcessing && onClose()}>
      <div className="checkoutModal" onClick={(e) => e.stopPropagation()}>
        <p>{title}</p>
        <p className="modalSub">{subtitle}</p>

        <form onSubmit={handleSubmit} className="checkoutForm" noValidate>
          <div className="formGroup">
            <label>Cardholder Name</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className={errors.cardHolder ? "inputError" : ""}
            />
            {errors.cardHolder && (
              <span className="errorText">{errors.cardHolder}</span>
            )}
          </div>

          <div className="formGroup">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4532 5800 1429 8892"
              className={errors.cardNumber ? "inputError" : ""}
            />
            {errors.cardNumber && (
              <span className="errorText">{errors.cardNumber}</span>
            )}
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Expires</label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className={errors.expiry ? "inputError" : ""}
              />
              {errors.expiry && (
                <span className="errorText">{errors.expiry}</span>
              )}
            </div>

            <div className="formGroup">
              <label>CVV</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="•••"
                maxLength={3}
                className={errors.cvv ? "inputError" : ""}
              />
              {errors.cvv && <span className="errorText">{errors.cvv}</span>}
            </div>
          </div>

          <div className="modalActions">
            <button
              type="button"
              className="cancelModalBtn"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="payModalBtn"
              disabled={isProcessing}
            >
              {isProcessing
                ? "Processing..."
                : `Pay €${totalAmount.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
