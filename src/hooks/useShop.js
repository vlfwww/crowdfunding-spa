import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetFieldsQuery } from "../store/api/shopApi";
import {
  toggleReserve,
  investPlot,
  makeSelectUserPlots,
} from "../store/usersSlice";
import { useNotification } from "./useNotification";

export const useShop = () => {
  const { data: fields = [], isLoading, isError } = useGetFieldsQuery();

  const dispatch = useDispatch();
  const notify = useNotification();

  const { currentUser: user } = useSelector((state) => state.users) || {};
  const userId = user?.id;

  const selectUserPlots = useMemo(() => makeSelectUserPlots(userId), [userId]);
  const userPlots = useSelector(selectUserPlots);
  const { reservedIds } = userPlots;

  const [sortBy, setSortBy] = useState("all");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(300);
  const [appliedMinSize, setAppliedMinSize] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedFieldForCheckout, setSelectedFieldForCheckout] =
    useState(null);

  const filteredAndSortedFields = useMemo(() => {
    const filtered = fields.filter((field) => {
      const priceNum = parseFloat(field.price.replace(",", "."));
      const sizeNum = parseInt(field.size);

      return priceNum <= appliedMaxPrice && sizeNum >= appliedMinSize;
    });

    const fieldsCopy = [...filtered];

    if (sortBy === "price-asc") {
      return fieldsCopy.sort(
        (a, b) =>
          parseFloat(a.price.replace(",", ".")) -
          parseFloat(b.price.replace(",", ".")),
      );
    }
    if (sortBy === "price-desc") {
      return fieldsCopy.sort(
        (a, b) =>
          parseFloat(b.price.replace(",", ".")) -
          parseFloat(a.price.replace(",", ".")),
      );
    }
    if (sortBy === "title") {
      return fieldsCopy.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "size") {
      return fieldsCopy.sort((a, b) => parseInt(b.size) - parseInt(a.size));
    }

    return fieldsCopy;
  }, [fields, sortBy, appliedMaxPrice, appliedMinSize]);

  const handleInvest = (id) => {
    const targetField = fields.find((f) => f.id === id);
    if (targetField) {
      setSelectedFieldForCheckout(targetField);
    }
  };

  const handleReserve = (id) => {
    if (userId) {
      const isCurrentlyReserved = reservedIds.includes(id);
      dispatch(toggleReserve({ userId, fieldId: id }));
      if (!isCurrentlyReserved) {
        notify("Plot reserved successfully!");
      } else {
        notify("Plot reservation canceled.");
      }
    } else {
      notify("Please log in to reserve plots.");
    }
  };

  const handleConfirmSinglePayment = () => {
    if (!selectedFieldForCheckout || !userId) return;
    dispatch(investPlot({ userId, fieldId: selectedFieldForCheckout.id }));
    setSelectedFieldForCheckout(null);
    notify("Investment successfully completed!");
  };

  const singlePriceNum = selectedFieldForCheckout
    ? parseFloat(selectedFieldForCheckout.price.replace(",", ".")) || 0
    : 0;

  return {
    isLoading,
    isError,
    sortBy,
    setSortBy,
    appliedMaxPrice,
    appliedMinSize,
    setAppliedMaxPrice,
    setAppliedMinSize,
    isFilterOpen,
    setIsFilterOpen,
    isMapOpen,
    setIsMapOpen,
    selectedFieldForCheckout,
    setSelectedFieldForCheckout,
    filteredAndSortedFields,
    handleInvest,
    handleReserve,
    handleConfirmSinglePayment,
    singlePriceNum,
  };
};
