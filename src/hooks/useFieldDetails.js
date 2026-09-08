import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetFieldByIdQuery } from "../store/api/shopApi";
import {
  toggleReserve,
  investPlot,
  makeSelectUserPlots,
} from "../store/usersSlice";
import { useNotification } from "../hooks/useNotification";

export const useFieldDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useNotification();

  const { currentUser: user } = useSelector((state) => state.users) || {};
  const userId = user?.id;

  const selectUserPlots = useMemo(() => makeSelectUserPlots(userId), [userId]);
  const userPlots = useSelector(selectUserPlots) || {};
  const { reservedIds = [], investedIds = [] } = userPlots;

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const {
    data: field,
    isLoading,
    isError,
  } = useGetFieldByIdQuery(id, {
    skip: !id,
  });

  const isReserved = field ? reservedIds.includes(field.id) : false;
  const isInvested = field ? investedIds.includes(field.id) : false;

  const handleInvestClick = useCallback(() => {
    if (!userId) {
      notify("Please log in to invest.");
      return;
    }
    if (field && !isInvested) {
      setIsCheckoutModalOpen(true);
    }
  }, [userId, field, isInvested, notify]);

  const handleConfirmPayment = useCallback(() => {
    if (field && userId) {
      dispatch(investPlot({ userId, fieldId: field.id }));
      setIsCheckoutModalOpen(false);
      notify("Investment successfully completed!");
    }
  }, [field, userId, dispatch, notify]);

  const handleReserveClick = useCallback(() => {
    if (!userId) {
      notify("Please log in to reserve plots.");
      return;
    }
    if (field) {
      const willBeReserved = !isReserved;
      dispatch(toggleReserve({ userId, fieldId: field.id }));
      if (willBeReserved) {
        notify("Plot reserved successfully!");
      } else {
        notify("Plot reservation canceled.");
      }
    }
  }, [userId, field, isReserved, dispatch, notify]);

  const priceNum = useMemo(() => {
    if (!field || field.price == null) return 0;
    const stringPrice = String(field.price).replace(",", ".");
    return parseFloat(stringPrice) || 0;
  }, [field]);

  return {
    field,
    isLoading,
    isError,
    isReserved,
    isInvested,
    priceNum,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    navigate,
    handleInvestClick,
    handleConfirmPayment,
    handleReserveClick,
  };
};
