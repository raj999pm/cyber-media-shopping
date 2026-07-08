import React, { useState } from 'react';

interface ItemFormProps {
  onAdd: (title: string, cost: number) => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ onAdd }) => {
  const [itemTitle, setItemTitle] = useState('');
  const [itemCost, setItemCost] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim()) return;

    const parsedCost = itemCost ? Math.max(0, parseFloat(itemCost)) : 0;
    onAdd(itemTitle.trim(), parsedCost);

    setItemTitle('');
    setItemCost('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <input
        type="text"
        value={itemTitle}
        onChange={(e) => setItemTitle(e.target.value)}
        placeholder="e.g. Fresh Spinach..."
        className="flex-3 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
      />
      <input
        type="number"
        step="0.01"
        value={itemCost}
        onChange={(e) => setItemCost(e.target.value)}
        placeholder="£ Price"
        className="flex-1 w-24 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-95"
      >
        Add
      </button>
    </form>
  );
};