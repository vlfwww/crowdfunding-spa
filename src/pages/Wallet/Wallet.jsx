import { useWallet } from "../../hooks/useWallet";
import BankCard from "../../components/BankCard/BankCard";
import AddCardModal from "../../components/AddCardModal/AddCardModal";
import "./Wallet.css";

const Wallet = () => {
  const {
    cards,
    isModalOpen,
    setIsModalOpen,
    formData,
    setFormData,
    errors,
    handleAddCardSubmit,
    handleDelete,
  } = useWallet();

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
            <BankCard key={card.id} card={card} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <AddCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCardSubmit}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
    </div>
  );
};

export default Wallet;
