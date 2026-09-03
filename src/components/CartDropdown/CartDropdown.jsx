import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetFieldsQuery } from "../../store/api/shopApi";
import { removeReservation } from "../../store/userPlotsSlice";
import "./CartDropdown.css";

const CartDropdown = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: fields = [] } = useGetFieldsQuery();
  const reservedIds = useSelector((state) => state.userPlots.reservedIds);

  const cartItems = fields.filter((field) => reservedIds.includes(field.id));

  const totalPrice = cartItems.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(",", "."));
    return acc + (isNaN(priceNum) ? 0 : priceNum);
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="cartDropdownOverlay" onClick={onClose}>
      <div
        className="cartDropdownContainer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cartDropdownHeader">
          <p>Your Reserved Plots</p>
          <button className="closeCartBtn" onClick={onClose}>
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
                    onClick={() => dispatch(removeReservation(item.id))}
                    title="Remove"
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
