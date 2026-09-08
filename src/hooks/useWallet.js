import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCard, removeCard } from "../store/usersSlice";
import { useNotification } from "./useNotification";

export const useWallet = () => {
  const dispatch = useDispatch();
  const notify = useNotification();

  const { currentUser: user } = useSelector((state) => state.users) || {};
  const userId = user?.id || user?._id || user?.sub;

  const cards = useSelector((state) => {
    if (!userId || !state.users?.users?.[userId]) {
      return [];
    }
    return state.users.users[userId].cards || [];
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
      setFormData({ cardNumber: "", cardHolder: "", expiryDate: "", cvv: "" });
      setErrors({});
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleFieldChange = useCallback((field, value) => {
    setFormData((prev) => {
      let updatedValue = value;

      if (field === "expiryDate") {
        const currentVal = prev.expiryDate;
        if (value.length < currentVal.length && currentVal.endsWith("/")) {
          updatedValue = currentVal.slice(0, -2);
        } else {
          const digits = value.replace(/\D/g, "").slice(0, 4);
          if (digits.length >= 2) {
            updatedValue = `${digits.slice(0, 2)}/${digits.slice(2)}`;
          } else {
            updatedValue = digits;
          }
        }
      }

      return { ...prev, [field]: updatedValue };
    });

    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    const cleanCard = formData.cardNumber.replace(/\s+/g, "");

    if (!cleanCard || !/^\d{13,19}$/.test(cleanCard)) {
      newErrors.cardNumber = "Enter a valid card number (13-19 digits)";
    }
    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = "Cardholder name is required";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Format MM/YY";
    } else {
      const [m, y] = formData.expiryDate.split("/");
      const month = parseInt(m, 10);
      const year = parseInt("20" + y, 10);

      const now = new Date();
      const currYear = now.getFullYear();
      const currMonth = now.getMonth() + 1;

      if (year < currYear || (year === currYear && month < currMonth)) {
        newErrors.expiryDate = "Card has expired";
      }
    }

    if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = "3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleAddCardSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validate() || !userId) return;

      const cleanCard = formData.cardNumber.replace(/\s+/g, "");
      const cardType = cleanCard.startsWith("5") ? "mastercard" : "visa";

      const newCard = {
        id: Date.now().toString(),
        cardNumber: cleanCard,
        cardHolder: formData.cardHolder.toUpperCase(),
        expiryDate: formData.expiryDate,
        cardType,
      };

      dispatch(addCard({ userId, card: newCard }));
      setIsModalOpen(false);
      notify("Card successfully added!");
    },
    [validate, userId, formData, dispatch, notify],
  );

  const handleDelete = useCallback(
    (cardId) => {
      if (!userId) return;
      dispatch(removeCard({ userId, cardId }));
      notify("Card has been removed.");
    },
    [userId, dispatch, notify],
  );

  return {
    cards,
    isModalOpen,
    setIsModalOpen,
    formData,
    handleFieldChange,
    errors,
    handleAddCardSubmit,
    handleDelete,
  };
};
