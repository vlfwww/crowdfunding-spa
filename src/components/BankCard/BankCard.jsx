import "./BankCard.css";

const BankCard = ({ card, onDelete }) => {
  const cardType = card.cardType || "visa";

  return (
    <div className={`bankCard ${cardType}`}>
      <div className="cardTop">
        <span className="cardBrand">{cardType.toUpperCase()}</span>
        <button
          className="deleteCardBtn"
          onClick={() => onDelete(card.id)}
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
  );
};

export default BankCard;
