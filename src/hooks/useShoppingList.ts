import { useState, useEffect } from 'react';
import type { GroceryItem } from '../types/grocery';

const STORAGE_KEYS = {
  BASKET_ITEMS: 'vault-grocery-items',
  MAX_BUDGET: 'vault-grocery-limit',
} as const;

export function useShoppingList() {
  const [items, setItems] = useState<GroceryItem[]>(() => {
    const rawData = localStorage.getItem(STORAGE_KEYS.BASKET_ITEMS);
    return rawData ? JSON.parse(rawData) : [];
  });

  const [spendingLimit, setSpendingLimit] = useState<number>(() => {
    const rawBudget = localStorage.getItem(STORAGE_KEYS.MAX_BUDGET);
    return rawBudget ? Number(rawBudget) : 0;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BASKET_ITEMS, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MAX_BUDGET, spendingLimit.toString());
  }, [spendingLimit]);

  const addItem = (title: string, costAmount: number) => {
    const newItem: GroceryItem = {
      id: crypto.randomUUID(),
      title,
      cost: costAmount,
      isChecked: false,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const toggleItemStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const absoluteTotal = items.reduce((acc, item) => acc + (item.cost ?? 0), 0);
  const budgetBreached = spendingLimit > 0 && absoluteTotal > spendingLimit;

  return {
    items,
    spendingLimit,
    setSpendingLimit,
    addItem,
    toggleItemStatus,
    deleteItem,
    absoluteTotal,
    budgetBreached,
  };
}