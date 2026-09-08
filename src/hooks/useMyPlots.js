import { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetFieldsQuery } from "../store/api/shopApi";
import {
  removeReservation,
  investPlot,
  checkoutCart,
  makeSelectUserPlots,
} from "../store/usersSlice";
import { useNotification } from "./useNotification";

export const useMyPlots = () => {
  const [activeTab, setActiveTab] = useState("reserved");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const dispatch = useDispatch();
  const notify = useNotification();
  const { data: fields = [], isLoading } = useGetFieldsQuery();

  const { currentUser: user } = useSelector((state) => state.users) || {};
  const userId = user?.id;

  const selectUserPlots = useMemo(() => makeSelectUserPlots(userId), [userId]);
  const userPlots = useSelector(selectUserPlots) || {};
  const { reservedIds = [], investedIds = [] } = userPlots;

  const reservedPlots = useMemo(
    () => fields.filter((field) => reservedIds.includes(field.id)),
    [fields, reservedIds],
  );

  const investedPlots = useMemo(
    () => fields.filter((field) => investedIds.includes(field.id)),
    [fields, investedIds],
  );

  const totalPrice = useMemo(() => {
    return reservedPlots.reduce((acc, item) => {
      if (item.price == null) return acc;
      const cleanPrice = String(item.price).replace(",", ".");
      const priceNum = parseFloat(cleanPrice);
      return acc + (isNaN(priceNum) ? 0 : priceNum);
    }, 0);
  }, [reservedPlots]);

  const handleInvestPlot = useCallback(
    (plotId) => {
      if (userId) {
        dispatch(investPlot({ userId, fieldId: plotId }));
        notify("Investment successfully completed!");
      }
    },
    [userId, dispatch, notify],
  );

  const handleRemoveReservation = useCallback(
    (plotId) => {
      if (userId) {
        dispatch(removeReservation({ userId, fieldId: plotId }));
        notify("Plot reservation canceled.");
      }
    },
    [userId, dispatch, notify],
  );

  const handleConfirmCartCheckout = useCallback(() => {
    if (userId) {
      setIsCheckoutModalOpen(false);
      dispatch(checkoutCart(userId));
      setActiveTab("invested");
      notify("Investment successfully completed!");
    }
  }, [userId, dispatch, notify]);

  return {
    activeTab,
    setActiveTab,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    isLoading,
    reservedPlots,
    investedPlots,
    totalPrice,
    handleInvestPlot,
    handleRemoveReservation,
    handleConfirmCartCheckout,
  };
};
