export default function CartCard({ cart, onViewClick }) {
  return (
    <div className="cart-card">
      <div className="card-header">
        <h3>{cart.name}</h3>
        <span className={`status-badge status-${cart.status}`}>{cart.status}</span>
      </div>

      <p className="card-description">{cart.description}</p>

      <div className="card-meta">
        <div className="meta-item">
          <span className="meta-label">Members:</span>
          <span className="meta-value">{cart.members?.length || 0}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Total:</span>
          <span className="meta-value">${cart.totalAmount?.toFixed(2) || '0.00'}</span>
        </div>
      </div>

      {cart.category && <p className="card-category">Category: {cart.category}</p>}

      <button onClick={onViewClick} className="btn-view">
        View Details
      </button>
    </div>
  );
}
