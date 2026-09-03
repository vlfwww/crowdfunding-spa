import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCard, removeCard } from "../../store/userWalletSlice";
import { useNotification } from "../../hooks/useNotification";
import "./Wallet.css";

const Wallet = () => {
  const dispatch = useDispatch();
  const notify = useNotification();
  const cards = useSelector((state) => state.userWallet.cards);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const validate = () => {
    const newErrors = {};
    const cleanCard = formData.cardNumber.replace(/\s?/g, "");

    if (!cleanCard || cleanCard.length < 16) {
      newErrors.cardNumber = "Enter a valid 16-digit card number";
    }
    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = "Cardholder name is required";
    }
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Format MM/YY";
    }
    if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = "3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const last4 = formData.cardNumber.slice(-4);
    const maskedNumber = `•••• •••• •••• ${last4}`;

    const cardType = formData.cardNumber.startsWith("5")
      ? "mastercard"
      : "visa";

    const newCard = {
      id: Date.now().toString(),
      cardNumber: maskedNumber,
      cardHolder: formData.cardHolder.toUpperCase(),
      expiryDate: formData.expiryDate,
      cvv: "***",
      cardType,
    };

    dispatch(addCard(newCard));
    setIsModalOpen(false);
    setFormData({ cardNumber: "", cardHolder: "", expiryDate: "", cvv: "" });
    setErrors({});

    notify("Card successfully added!");
  };

  const handleDelete = (id) => {
    dispatch(removeCard(id));
    notify("Card has been removed.");
  };

  return (
    <div className="walletPage">
      <div className="walletHeader">
        <div>
          <h1 className="walletTitle">My Wallet</h1>
          <p className="walletSubtitle">
            Manage your saved payment cards and financial assets.
          </p>
        </div>
        <button className="addCardBtn" onClick={() => setIsModalOpen(true)}>
          + Add New Card
        </button>
      </div>

      <p className="sectionTitle">Saved Cards</p>

      {cards.length === 0 ? (
        <div className="emptyCardsContainer">
          <p className="emptyCardsText">You don't have any saved cards yet.</p>
        </div>
      ) : (
        <div className="cardsGrid">
          {cards.map((card) => (
            <div key={card.id} className={`bankCard ${card.cardType}`}>
              <div className="cardTop">
                <span className="cardBrand">{card.cardType.toUpperCase()}</span>
                <button
                  className="deleteCardBtn"
                  onClick={() => handleDelete(card.id)}
                  title="Remove card"
                >
                  ✕
                </button>
              </div>
              <div className="cardNumberDisplay">{card.cardNumber}</div>
              <div className="cardFooter">
                <div className="cardHolderInfo">
                  <span className="infoSub">Cardholder</span>
                  <span className="infoMain">{card.cardHolder}</span>
                </div>
                <div className="cardExpiryInfo">
                  <span className="infoSub">Expires</span>
                  <span className="infoMain">{card.expiryDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modalOverlay" onClick={() => setIsModalOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <p className="modalContentTitle">Add New Bank Card</p>
            <form
              onSubmit={handleAddCardSubmit}
              className="cardForm"
              noValidate
            >
              <div className="formGroup">
                <label>Card Number</label>
                <input
                  type="text"
                  maxLength="19"
                  placeholder="4242 4242 4242 4242"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, cardHolder: e.target.value })
                  }
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
                      setFormData({ ...formData, expiryDate: e.target.value })
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
                    onChange={(e) =>
                      setFormData({ ...formData, cvv: e.target.value })
                    }
                    className={errors.cvv ? "inputError" : ""}
                  />
                  {errors.cvv && (
                    <span className="errorText">{errors.cvv}</span>
                  )}
                </div>
              </div>

              <div className="modalActions">
                <button
                  type="button"
                  className="cancelBtn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submitBtn">
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
