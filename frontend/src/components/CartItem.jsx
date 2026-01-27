export default function CartItem({ item }) {
  return (
    <div className="cart-item">
      <div className="item-header">
        <h4>{item.itemName}</h4>
        <span className="item-price">${item.totalAmount?.toFixed(2) || '0.00'}</span>
      </div>

      {item.description && <p className="item-description">{item.description}</p>}

      <div className="item-details">
        <span>Price: ${item.price?.toFixed(2) || '0.00'}</span>
        <span>Qty: {item.quantity || 1}</span>
        <span>Added by: {item.addedBy?.firstName}</span>
      </div>

      {item.splitAmong && item.splitAmong.length > 0 && (
        <div className="item-split">
          <p className="split-title">Split Among:</p>
          <ul className="split-list">
            {item.splitAmong.map((split, idx) => (
              <li key={idx}>
                {split.userId?.firstName || 'Unknown'}: ${split.amount?.toFixed(2) || '0.00'}
                {split.isPaid && <span className="paid-badge">Paid</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
