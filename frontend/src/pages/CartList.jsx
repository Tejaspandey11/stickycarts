import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartCard from '../components/CartCard';

export default function CartList() {
  const { carts, fetchUserCarts, loading } = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserCarts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateCart = async (e) => {
    e.preventDefault();
    try {
      const newCart = await CartContext.createCart?.(formData);
      setFormData({ name: '', description: '', category: '' });
      setShowForm(false);
      fetchUserCarts();
      navigate(`/carts/${newCart._id}`);
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  };

  return (
    <div className="cart-list-page">
      <div className="cart-list-container">
        <div className="header">
          <h1>My Carts</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancel' : 'Create New Cart'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreateCart} className="create-cart-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Cart name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn-primary">
              Create Cart
            </button>
          </form>
        )}

        {loading ? (
          <p>Loading carts...</p>
        ) : carts.length === 0 ? (
          <p>No carts found. Create one to get started!</p>
        ) : (
          <div className="carts-grid">
            {carts.map(cart => (
              <CartCard
                key={cart._id}
                cart={cart}
                onViewClick={() => navigate(`/carts/${cart._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
