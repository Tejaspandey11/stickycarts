import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { carts, fetchUserCarts } = useContext(CartContext);

  useEffect(() => {
    fetchUserCarts();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>Welcome, {user?.firstName}!</h1>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Carts</h3>
            <p className="stat-value">{carts.length}</p>
          </div>

          <div className="stat-card">
            <h3>Active Carts</h3>
            <p className="stat-value">{carts.filter(c => c.status === 'active').length}</p>
          </div>

          <div className="stat-card">
            <h3>Total Amount</h3>
            <p className="stat-value">
              $
              {carts
                .reduce((sum, cart) => sum + (cart.totalAmount || 0), 0)
                .toFixed(2)}
            </p>
          </div>
        </div>

        <section className="recent-carts">
          <h2>Your Recent Carts</h2>
          {carts.length === 0 ? (
            <p>No carts yet. Create one to get started!</p>
          ) : (
            <div className="carts-grid">
              {carts.slice(0, 6).map(cart => (
                <div key={cart._id} className="cart-preview">
                  <h3>{cart.name}</h3>
                  <p>{cart.description}</p>
                  <div className="cart-meta">
                    <span>Members: {cart.members.length}</span>
                    <span>Total: ${cart.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
