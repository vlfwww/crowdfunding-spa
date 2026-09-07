import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetFieldsQuery } from "../store/api/shopApi";
import {
  removeReservation,
  investPlot,
  checkoutCart,
  makeSelectUserPlots,
} from "../store/userPlotsSlice";
import { useNotification } from "./useNotification";

export const useMyPlots = () => {
  const [activeTab, setActiveTab] = useState("reserved");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const dispatch = useDispatch();
  const notify = useNotification();
  const { data: fields = [], isLoading } = useGetFieldsQuery();

  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const selectUserPlots = useMemo(() => makeSelectUserPlots(userId), [userId]);
  const userPlots = useSelector(selectUserPlots);
  const { reservedIds, investedIds } = userPlots;

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
      const priceNum = parseFloat(item.price.replace(",", "."));
      return acc + (isNaN(priceNum) ? 0 : priceNum);
    }, 0);
  }, [reservedPlots]);

  const handleInvestPlot = (plotId) => {
    if (userId) {
      dispatch(investPlot({ userId, fieldId: plotId }));
      notify("Investment successfully completed!");
    }
  };

  const handleRemoveReservation = (plotId) => {
    if (userId) {
      dispatch(removeReservation({ userId, fieldId: plotId }));
      notify("Plot reservation canceled.");
    }
  };

  const handleConfirmCartCheckout = () => {
    if (userId) {
      setIsCheckoutModalOpen(false);
      dispatch(checkoutCart(userId));
      setActiveTab("invested");
      notify("Investment successfully completed!");
    }
  };

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
