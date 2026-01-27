import React, { createContext, useState, useEffect } from 'react';
import { cartAPI } from '../api/cart.api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [currentCart, setCurrentCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserCarts = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getUserCarts();
      setCarts(response.data);
    } catch (error) {
      console.error('Error fetching carts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartById = async (cartId) => {
    try {
      setLoading(true);
      const response = await cartAPI.getCartById(cartId);
      setCurrentCart(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCart = async (cartData) => {
    try {
      setLoading(true);
      const response = await cartAPI.createCart(cartData);
      setCarts([...carts, response.data.cart]);
      return response.data.cart;
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (cartId, cartData) => {
    try {
      setLoading(true);
      const response = await cartAPI.updateCart(cartId, cartData);
      setCarts(carts.map(c => (c._id === cartId ? response.data.cart : c)));
      if (currentCart?._id === cartId) {
        setCurrentCart(response.data.cart);
      }
      return response.data.cart;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteCart = async (cartId) => {
    try {
      setLoading(true);
      await cartAPI.deleteCart(cartId);
      setCarts(carts.filter(c => c._id !== cartId));
      if (currentCart?._id === cartId) {
        setCurrentCart(null);
      }
    } catch (error) {
      console.error('Error deleting cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    carts,
    currentCart,
    loading,
    fetchUserCarts,
    fetchCartById,
    createCart,
    updateCart,
    deleteCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
