import axiosInstance from './axios';

export const cartAPI = {
  createCart: (data) => axiosInstance.post('/carts', data),
  getUserCarts: () => axiosInstance.get('/carts'),
  getCartById: (cartId) => axiosInstance.get(`/carts/${cartId}`),
  updateCart: (cartId, data) => axiosInstance.put(`/carts/${cartId}`, data),
  deleteCart: (cartId) => axiosInstance.delete(`/carts/${cartId}`),
  addMember: (cartId, data) => axiosInstance.post(`/carts/${cartId}/members`, data),
  removeMember: (cartId, memberId) =>
    axiosInstance.delete(`/carts/${cartId}/members/${memberId}`),
};
