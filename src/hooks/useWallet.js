import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCard, removeCard } from "../store/userWalletSlice";
import { useNotification } from "./useNotification";

export const useWallet = () => {
  const dispatch = useDispatch();
  const notify = useNotification();

  const { user } = useSelector((state) => state.auth);
  const userId = user?.id || user?._id || user?.sub;

  const cards = useSelector((state) => {
    if (!userId || !state.userWallet?.walletDataByUser?.[userId]) {
      return [];
    }
    return state.userWallet.walletDataByUser[userId].cards || [];
  });

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
    const cleanCard = formData.cardNumber.replace(/\s+/g, "");

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
    if (!validate() || !userId) return;

    const last4 = formData.cardNumber.replace(/\s+/g, "").slice(-4);
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

    dispatch(addCard({ userId, card: newCard }));
    setIsModalOpen(false);
    setFormData({ cardNumber: "", cardHolder: "", expiryDate: "", cvv: "" });
    setErrors({});

    notify("Card successfully added!");
  };

  const handleDelete = (cardId) => {
    if (!userId) return;
    dispatch(removeCard({ userId, cardId }));
    notify("Card has been removed.");
  };

  return {
    cards,
    isModalOpen,
    setIsModalOpen,
    formData,
    setFormData,
    errors,
    handleAddCardSubmit,
    handleDelete,
  };
};
