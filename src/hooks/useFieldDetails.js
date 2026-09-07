import { useState, useMemo } from "react";
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
  const userPlots = useSelector(selectUserPlots);
  const { reservedIds, investedIds } = userPlots;

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

  const handleInvestClick = () => {
    if (!userId) {
      notify("Please log in to invest.");
      return;
    }
    if (field && !isInvested) {
      setIsCheckoutModalOpen(true);
    }
  };

  const handleConfirmPayment = () => {
    if (field && userId) {
      dispatch(investPlot({ userId, fieldId: field.id }));
      setIsCheckoutModalOpen(false);
      notify("Investment successfully completed!");
    }
  };

  const handleReserveClick = () => {
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
  };

  const priceNum = field ? parseFloat(field.price.replace(",", ".")) || 0 : 0;

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
