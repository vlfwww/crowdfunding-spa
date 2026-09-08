import { useState, useMemo, useCallback } from "react";
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
  const userPlots = useSelector(selectUserPlots) || {};
  const { reservedIds = [] } = userPlots;

  const [sortBy, setSortBy] = useState("all");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(300);
  const [appliedMinSize, setAppliedMinSize] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedFieldForCheckout, setSelectedFieldForCheckout] =
    useState(null);

  const filteredAndSortedFields = useMemo(() => {
    const filtered = fields.filter((field) => {
      const rawPrice =
        field.price != null ? String(field.price).replace(",", ".") : "0";
      const priceNum = parseFloat(rawPrice) || 0;
      const sizeNum = parseInt(field.size, 10) || 0;

      return priceNum <= appliedMaxPrice && sizeNum >= appliedMinSize;
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
  }, [fields, sortBy, appliedMaxPrice, appliedMinSize]);

  const handleInvest = useCallback(
    (id) => {
      const targetField = fields.find((f) => f.id === id);
      if (targetField) {
        setSelectedFieldForCheckout(targetField);
      }
    },
    [fields],
  );

  const handleReserve = useCallback(
    (id) => {
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
    },
    [userId, reservedIds, dispatch, notify],
  );

  const handleConfirmSinglePayment = useCallback(() => {
    if (!selectedFieldForCheckout || !userId) return;
    dispatch(investPlot({ userId, fieldId: selectedFieldForCheckout.id }));
    setSelectedFieldForCheckout(null);
    notify("Investment successfully completed!");
  }, [selectedFieldForCheckout, userId, dispatch, notify]);

  const singlePriceNum = useMemo(() => {
    if (!selectedFieldForCheckout || selectedFieldForCheckout.price == null)
      return 0;
    const cleanPrice = String(selectedFieldForCheckout.price).replace(",", ".");
    return parseFloat(cleanPrice) || 0;
  }, [selectedFieldForCheckout]);

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
