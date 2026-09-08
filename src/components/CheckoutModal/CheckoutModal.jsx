import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

  const { currentUser: user } = useSelector((state) => state.users) || {};
  const cards = user?.cards || [];

  const [selectedCardId, setSelectedCardId] = useState("new");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setErrors({});

      if (cards.length > 0) {
        const firstCard = cards[0];
        setSelectedCardId(firstCard.id);
        setCardHolder(firstCard.cardHolder || firstCard.holder || "");
        setCardNumber(firstCard.cardNumber || firstCard.number || "");
        setExpiry(firstCard.expiryDate || "");
        setCvv("");
      } else {
        setSelectedCardId("new");
        setCardHolder("");
        setCardNumber("");
        setExpiry("");
        setCvv("");
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCardSelect = (e) => {
    const value = e.target.value;
    setSelectedCardId(value);

    if (value === "new") {
      setCardHolder("");
      setCardNumber("");
      setExpiry("");
      setCvv("");
    } else {
      const foundCard = cards.find((c) => String(c.id) === String(value));
      if (foundCard) {
        setCardHolder(foundCard.cardHolder || foundCard.holder || "");
        setCardNumber(foundCard.cardNumber || foundCard.number || "");
        setExpiry(foundCard.expiryDate || "");
        setCvv("");
      }
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!cardHolder.trim()) {
      newErrors.cardHolder = "Cardholder name is required";
    } else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(cardHolder)) {
      newErrors.cardHolder = "Name should contain only letters";
    }

    const rawCard = cardNumber.replace(/\s+/g, "");
    if (!/^\d{13,19}$/.test(rawCard)) {
      newErrors.cardNumber = "Enter a valid card number (13-19 digits)";
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

  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={() => !isProcessing && onClose()}>
      <div className="checkoutModal" onClick={(e) => e.stopPropagation()}>
        <p>{title}</p>
        <p className="modalSub">{subtitle}</p>

        <form onSubmit={handleSubmit} className="checkoutForm" noValidate>
          {cards.length > 0 && (
            <div className="formGroup">
              <label>Choose Saved Card</label>
              <select
                value={selectedCardId}
                onChange={handleCardSelect}
                className="cardSelect"
              >
                {cards.map((card) => {
                  const num = card.cardNumber || card.number || "";
                  const cleanNum = num.replace(/\s+/g, "");
                  const last4 = cleanNum.slice(-4) || "****";
                  const holder = card.cardHolder || card.holder || "Card";
                  return (
                    <option key={card.id} value={card.id}>
                      •••• {last4} ({holder})
                    </option>
                  );
                })}
                <option value="new">Use a new card</option>
              </select>
            </div>
          )}

          <div className="formGroup">
            <label>Cardholder Name</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Enter your name"
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
              maxLength="19"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="•••• •••• •••• ••••"
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
