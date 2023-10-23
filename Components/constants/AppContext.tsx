import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCartItems, addToCart as addToCartApi, removeFromCart as removeFromCartApi } from './api'; // Import các hàm để tương tác với cơ sở dữ liệu

// Tạo một context mới
const CartContext = createContext<{
  cart: { FOOD_ID: number; quantity: number }[];
  addToCart: (foodId: number, quantity: number) => void;
  removeFromCart: (foodId: number) => void;
} | null>(null);

// Tạo một custom hook để sử dụng context
export const useCart = () => {
  return useContext(CartContext);
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<{ FOOD_ID: number; quantity: number }[]>([]);

  useEffect(() => {
    // Khi component được tạo, nạp dữ liệu giỏ hàng từ cơ sở dữ liệu
    getCartItems()
      .then((data) => {
        // data là dữ liệu giỏ hàng từ cơ sở dữ liệu
        setCart(data);
      })
      .catch((error) => {
        console.error('Lỗi khi tải dữ liệu giỏ hàng:', error);
      });
  }, []); // Chỉ gọi một lần khi component được tạo

  const addToCart = (foodId: number, quantity: number) => {
    // Kiểm tra xem foodId đã tồn tại trong giỏ hàng hay chưa
    const existingItemIndex = cart.findIndex((item) => item.FOOD_ID === foodId);

    if (existingItemIndex !== -1) {
      // Nếu foodId đã tồn tại, cập nhật số lượng trong giỏ hàng và cơ sở dữ liệu
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart); // Cập nhật trạng thái giỏ hàng ngay lập tức

      // Cập nhật cơ sở dữ liệu thông qua API
      addToCartApi(foodId, updatedCart[existingItemIndex].quantity)
        .catch((error) => {
          console.error('Lỗi khi cập nhật giỏ hàng trong cơ sở dữ liệu:', error);
        });
    } else {
      // Nếu foodId chưa tồn tại, thêm vào giỏ hàng và cơ sở dữ liệu
      const newCartItem = { FOOD_ID: foodId, quantity };
      const updatedCart = [...cart, newCartItem];
      setCart(updatedCart); // Cập nhật trạng thái giỏ hàng ngay lập tức

      // Thêm vào cơ sở dữ liệu thông qua API
      addToCartApi(foodId, quantity)
        .catch((error) => {
          console.error('Lỗi khi thêm món ăn vào giỏ hàng trong cơ sở dữ liệu:', error);
        });
    }
  }

  const removeFromCart = (foodId: number) => {
    // Xóa món ăn khỏi giỏ hàng và cơ sở dữ liệu
    const updatedCart = cart.filter((item) => item.FOOD_ID !== foodId);
    setCart(updatedCart); // Cập nhật trạng thái giỏ hàng ngay lập tức

    // Xóa khỏi cơ sở dữ liệu thông qua API
    removeFromCartApi(foodId)
      .catch((error) => {
        console.error('Lỗi khi xóa món ăn khỏi giỏ hàng trong cơ sở dữ liệu:', error);
      });
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
