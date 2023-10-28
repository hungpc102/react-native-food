import React, { createContext, useContext, ReactNode, useState } from 'react';

type FoodContextType = {
  foodId: string;
  quantity: number;
  setFoodId: (foodId: string) => void;
  setQuantity: (quantity: number) => void;
};

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export function FoodProvider({ children }: { children: ReactNode }) {
  const [foodId, setFoodId] = useState('');
  const [quantity, setQuantity] = useState(1);

  return (
    <FoodContext.Provider value={{ foodId, quantity, setFoodId, setQuantity }}>
      {children}
    </FoodContext.Provider>
  );
}

export function useFood() {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
}
