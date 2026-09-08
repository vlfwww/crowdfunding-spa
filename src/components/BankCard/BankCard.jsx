import React from "react";
import "./BankCard.css";

const BankCard = React.memo(({ card, onDelete }) => {
  const cardType = card.cardType || "visa";
  const rawNumber = (card.cardNumber || card.number || "").replace(/\s+/g, "");
  const last4 = rawNumber.slice(-4) || "2222";
  const maskedNumber = `*********${last4}`;

  return (
    <div className={`bankCard ${cardType}`}>
      <div className="cardTop">
        <span className="cardBrand">{cardType.toUpperCase()}</span>
        <button
          className="deleteCardBtn"
          onClick={() => onDelete(card.id)}
          title="Remove card"
          aria-label="Remove card"
        >
          ✕
        </button>
      </div>
      <div className="cardNumberDisplay">{maskedNumber}</div>
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
  );
});

export default BankCard;
