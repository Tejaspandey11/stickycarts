import axiosInstance from './axios';

export const cartMessageAPI = {
  sendMessage: (cartId, data) => axiosInstance.post(`/messages/${cartId}/messages`, data),
  getCartMessages: (cartId, params) =>
    axiosInstance.get(`/messages/${cartId}/messages`, { params }),
  editMessage: (messageId, data) => axiosInstance.put(`/messages/${messageId}`, data),
  deleteMessage: (messageId) => axiosInstance.delete(`/messages/${messageId}`),
};
