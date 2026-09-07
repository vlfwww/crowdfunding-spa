import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetFieldsQuery } from "../store/api/shopApi";
import {
  toggleReserve,
  investPlot,
  makeSelectUserPlots,
} from "../store/userPlotsSlice";
import { useNotification } from "../hooks/useNotification";

export const useLocations = () => {
  const dispatch = useDispatch();
  const notify = useNotification();
  const { data: fields = [], isLoading, isError } = useGetFieldsQuery();

  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const selectUserPlots = useMemo(() => makeSelectUserPlots(userId), [userId]);
  const userPlots = useSelector(selectUserPlots);
  const { reservedIds, investedIds } = userPlots;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(300);
  const [appliedMinSize, setAppliedMinSize] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedFieldForCheckout, setSelectedFieldForCheckout] =
    useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const defaultCenter = [51.1657, 10.4515];

  const handleInvestClick = (field) => {
    if (!userId) {
      notify("Please log in to invest.");
      return;
    }
    if (!investedIds.includes(field.id)) {
      setSelectedFieldForCheckout(field);
      setIsCheckoutModalOpen(true);
    }
  };

  const handleConfirmPayment = () => {
    if (selectedFieldForCheckout && userId) {
      dispatch(investPlot({ userId, fieldId: selectedFieldForCheckout.id }));
      setIsCheckoutModalOpen(false);
      setSelectedFieldForCheckout(null);
      notify("Investment successfully completed!");
    }
  };

  const handleReserveClick = (fieldId) => {
    if (!userId) {
      notify("Please log in to reserve plots.");
      return;
    }
    const isCurrentlyReserved = reservedIds.includes(fieldId);
    dispatch(toggleReserve({ userId, fieldId }));
    if (!isCurrentlyReserved) {
      notify("Plot reserved successfully!");
    } else {
      notify("Plot reservation canceled.");
    }
  };

  const filteredAndSortedFields = useMemo(() => {
    const filtered = fields.filter((field) => {
      const priceNum = parseFloat(field.price.replace(",", "."));
      const sizeNum = parseInt(field.size);

      const matchesPrice = priceNum <= appliedMaxPrice;
      const matchesSize = sizeNum >= appliedMinSize;
      const matchesSearch =
        field.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        field.location?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesPrice && matchesSize && matchesSearch;
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
  }, [fields, sortBy, appliedMaxPrice, appliedMinSize, searchQuery]);

  const checkoutPriceNum = selectedFieldForCheckout
    ? parseFloat(selectedFieldForCheckout.price.replace(",", ".")) || 0
    : 0;

  return {
    fields,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    appliedMaxPrice,
    appliedMinSize,
    setAppliedMaxPrice,
    setAppliedMinSize,
    isFilterOpen,
    setIsFilterOpen,
    selectedFieldForCheckout,
    setIsCheckoutModalOpen,
    isCheckoutModalOpen,
    defaultCenter,
    filteredAndSortedFields,
    checkoutPriceNum,
    handleInvestClick,
    handleConfirmPayment,
    handleReserveClick,
  };
};
