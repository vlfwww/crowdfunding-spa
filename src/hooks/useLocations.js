import { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetFieldsQuery } from "../store/api/shopApi";
import {
  toggleReserve,
  investPlot,
  makeSelectUserPlots,
} from "../store/usersSlice";
import { useNotification } from "../hooks/useNotification";

export const useLocations = () => {
  const dispatch = useDispatch();
  const notify = useNotification();
  const { data: fields = [], isLoading, isError } = useGetFieldsQuery();

  const { currentUser: user } = useSelector((state) => state.users) || {};
  const userId = user?.id;

  const selectUserPlots = useMemo(() => makeSelectUserPlots(userId), [userId]);
  const userPlots = useSelector(selectUserPlots) || {};
  const { reservedIds = [], investedIds = [] } = userPlots;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(300);
  const [appliedMinSize, setAppliedMinSize] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedFieldForCheckout, setSelectedFieldForCheckout] =
    useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const defaultCenter = useMemo(() => [51.1657, 10.4515], []);

  const handleInvestClick = useCallback(
    (field) => {
      if (!userId) {
        notify("Please log in to invest.");
        return;
      }
      if (field && !investedIds.includes(field.id)) {
        setSelectedFieldForCheckout(field);
        setIsCheckoutModalOpen(true);
      }
    },
    [userId, investedIds, notify],
  );

  const handleConfirmPayment = useCallback(() => {
    if (selectedFieldForCheckout && userId) {
      dispatch(investPlot({ userId, fieldId: selectedFieldForCheckout.id }));
      setIsCheckoutModalOpen(false);
      setSelectedFieldForCheckout(null);
      notify("Investment successfully completed!");
    }
  }, [selectedFieldForCheckout, userId, dispatch, notify]);

  const handleReserveClick = useCallback(
    (fieldId) => {
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
    },
    [userId, reservedIds, dispatch, notify],
  );

  const filteredAndSortedFields = useMemo(() => {
    const filtered = fields.filter((field) => {
      const rawPrice =
        field.price != null ? String(field.price).replace(",", ".") : "0";
      const priceNum = parseFloat(rawPrice) || 0;
      const sizeNum = parseInt(field.size, 10) || 0;

      const matchesPrice = priceNum <= appliedMaxPrice;
      const matchesSize = sizeNum >= appliedMinSize;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        field.title?.toLowerCase().includes(query) ||
        field.location?.toLowerCase().includes(query);

      return matchesPrice && matchesSize && matchesSearch;
    });

    const fieldsCopy = [...filtered];

    if (sortBy === "price-asc") {
      return fieldsCopy.sort((a, b) => {
        const priceA =
          parseFloat(String(a.price ?? "0").replace(",", ".")) || 0;
        const priceB =
          parseFloat(String(b.price ?? "0").replace(",", ".")) || 0;
        return priceA - priceB;
      });
    }
    if (sortBy === "price-desc") {
      return fieldsCopy.sort((a, b) => {
        const priceA =
          parseFloat(String(a.price ?? "0").replace(",", ".")) || 0;
        const priceB =
          parseFloat(String(b.price ?? "0").replace(",", ".")) || 0;
        return priceB - priceA;
      });
    }
    if (sortBy === "title") {
      return fieldsCopy.sort((a, b) =>
        (a.title || "").localeCompare(b.title || ""),
      );
    }
    if (sortBy === "size") {
      return fieldsCopy.sort((a, b) => {
        const sizeA = parseInt(a.size, 10) || 0;
        const sizeB = parseInt(b.size, 10) || 0;
        return sizeB - sizeA;
      });
    }

    return fieldsCopy;
  }, [fields, sortBy, appliedMaxPrice, appliedMinSize, searchQuery]);

  const checkoutPriceNum = useMemo(() => {
    if (!selectedFieldForCheckout || selectedFieldForCheckout.price == null)
      return 0;
    const cleanPrice = String(selectedFieldForCheckout.price).replace(",", ".");
    return parseFloat(cleanPrice) || 0;
  }, [selectedFieldForCheckout]);

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
