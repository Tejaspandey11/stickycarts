import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function CartDetails() {
  const { cartId } = useParams();
  const { currentCart, fetchCartById, loading } = useContext(CartContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (cartId) {
      fetchCartById(cartId);
    }
  }, [cartId]);

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (!currentCart) {
    return <div className="error">Cart not found</div>;
  }

  return (
    <div className="cart-details-page">
      <div className="cart-details-container">
        <div className="cart-header">
          <h1>{currentCart.name}</h1>
          <p>{currentCart.description}</p>
        </div>

        <div className="cart-info">
          <div className="info-card">
            <h3>Members</h3>
            <p>{currentCart.members?.length || 0}</p>
          </div>
          <div className="info-card">
            <h3>Total Amount</h3>
            <p>${currentCart.totalAmount?.toFixed(2) || '0.00'}</p>
          </div>
          <div className="info-card">
            <h3>Status</h3>
            <p>{currentCart.status}</p>
          </div>
        </div>

        <section className="cart-items-section">
          <h2>Items</h2>
          {items.length === 0 ? (
            <p>No items in this cart yet</p>
          ) : (
            <div className="items-list">
              {items.map(item => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
          )}
        </section>

        <section className="cart-members-section">
          <h2>Members</h2>
          <ul className="members-list">
            {currentCart.members?.map(member => (
              <li key={member._id}>
                {member.firstName} {member.lastName} ({member.email})
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
