import axiosInstance from './axios';

export const cartItemAPI = {
  addCartItem: (cartId, data) => axiosInstance.post(`/cart-items/${cartId}/items`, data),
  getCartItems: (cartId) => axiosInstance.get(`/cart-items/${cartId}/items`),
  getCartItemById: (itemId) => axiosInstance.get(`/cart-items/items/${itemId}`),
  updateCartItem: (itemId, data) => axiosInstance.put(`/cart-items/items/${itemId}`, data),
  deleteCartItem: (itemId) => axiosInstance.delete(`/cart-items/items/${itemId}`),
};
