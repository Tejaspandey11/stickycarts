import axiosInstance from './axios';

export const paymentAPI = {
  createPayment: (data) => axiosInstance.post('/payments', data),
  getCartPayments: (cartId, params) =>
    axiosInstance.get(`/payments/cart/${cartId}`, { params }),
  getUserPayments: (params) => axiosInstance.get('/payments/user/all', { params }),
  getPaymentById: (paymentId) => axiosInstance.get(`/payments/${paymentId}`),
  updatePaymentStatus: (paymentId, data) =>
    axiosInstance.put(`/payments/${paymentId}`, data),
  deletePayment: (paymentId) => axiosInstance.delete(`/payments/${paymentId}`),
};
