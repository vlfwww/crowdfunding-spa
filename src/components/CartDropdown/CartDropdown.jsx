import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetFieldsQuery } from "../../store/api/shopApi";
import { removeReservation, makeSelectUserPlots } from "../../store/usersSlice";
import { useMemo, useCallback, useEffect } from "react";
import "./CartDropdown.css";

const CartDropdown = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser: user } = useSelector((state) => state.users) || {};
  const userId = user?.id;

  const { data: fields = [] } = useGetFieldsQuery();

  const selectUserPlots = useMemo(() => makeSelectUserPlots(userId), [userId]);
  const userPlots = useSelector(selectUserPlots);
  const { reservedIds = [] } = userPlots;

  const cartItems = useMemo(() => {
    return fields.filter((field) => reservedIds.includes(field.id));
  }, [fields, reservedIds]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const priceNum = parseFloat(item.price.replace(",", "."));
      return acc + (isNaN(priceNum) ? 0 : priceNum);
    }, 0);
  }, [cartItems]);

  const handleRemoveItem = useCallback(
    (fieldId) => {
      if (userId) {
        dispatch(removeReservation({ userId, fieldId }));
      }
    },
    [dispatch, userId],
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cartDropdownOverlay" onClick={onClose}>
      <div
        className="cartDropdownContainer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cartDropdownHeader">
          <p>Your Reserved Plots</p>
          <button
            className="closeCartBtn"
            onClick={onClose}
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        <div className="cartDropdownBody">
          {cartItems.length === 0 ? (
            <p className="emptyCartText">Your cart is empty.</p>
          ) : (
            <div className="cartItemsList">
              {cartItems.map((item) => (
                <div key={item.id} className="cartDropdownItem">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cartItemImg"
                  />
                  <div className="cartItemInfo">
                    <p>{item.title}</p>
                    <span>€{item.price}</span>
                  </div>
                  <button
                    className="cartItemRemove"
                    onClick={() => handleRemoveItem(item.id)}
                    title="Remove"
                    aria-label={`Remove ${item.title}`}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cartDropdownFooter">
            <div className="cartTotalRow">
              <span>Total:</span>
              <strong>€{totalPrice.toFixed(2)}</strong>
            </div>
            <button
              className="goToCartBtn"
              onClick={() => {
                onClose();
                navigate("/my-plots");
              }}
            >
              Go to payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
