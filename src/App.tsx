import { useShoppingList } from "./hooks/useShoppingList";
import { ItemForm } from "./components/ItemForm";
export default function App() {
  const {
    items,
    spendingLimit,
    setSpendingLimit,
    addItem,
    toggleItemStatus,
    deleteItem,
    moveItem,
    absoluteTotal,
    budgetBreached,
  } = useShoppingList();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-800 selection:bg-emerald-100">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-100/80">

        {/* Title Heading */}
        <header className="mb-6">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <span>🛒</span> Smart Basket
          </h1>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Manage your nutritional shopping limits efficiently.
          </p>
        </header>

        {/* Financial Tracker Panel */}
        <div className="mb-6 rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-center justify-between gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ceiling Limit</label>
            <input
              type="number"
              value={spendingLimit || ''}
              onChange={(e) => setSpendingLimit(Number(e.target.value))}
              placeholder="Set max budget"
              className="mt-1 w-28 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm font-medium focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div className="text-right">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Running Total</span>
            <span className={`text-xl font-extrabold tracking-tight transition-colors ${budgetBreached ? 'text-red-600' : 'text-slate-900'}`}>
              £{absoluteTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Alert Banner */}
        {budgetBreached && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-100 p-3 text-xs font-semibold text-red-700 flex items-center gap-2 animate-pulse">
            🚨 Budget threshold exceeded! Review your basket item costs.
          </div>
        )}

        {/* Input Form Component */}
        <ItemForm onAdd={addItem} />

        {/* Items Container */}
        {items.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl">
            <p className="text-xs font-medium text-slate-400">Your shopping list is currently empty.</p>
          </div>
        ) : (
          <ul className="space-y-2.5">
            {items.map((item, index) => (
              <li
                key={item.id}
                className={`flex items-center justify-between rounded-xl p-3 border transition-all duration-200 ${
                  item.isChecked
                    ? 'bg-slate-50 border-slate-200 opacity-50 line-through'
                    : 'bg-white border-slate-100 shadow-sm hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => toggleItemStatus(item.id)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                  />
                  <span
                    onClick={() => toggleItemStatus(item.id)}
                    className="text-sm font-semibold text-slate-700 cursor-pointer truncate select-none"
                  >
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 ml-2">
                  <div className="flex flex-col">
                    <button
                      onClick={() => moveItem(item.id, 'up')}
                      disabled={index === 0}
                      className="text-slate-400 hover:text-emerald-600 disabled:opacity-20 disabled:hover:text-slate-400 leading-none"
                      aria-label={`Move ${item.title} up`}
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveItem(item.id, 'down')}
                      disabled={index === items.length - 1}
                      className="text-slate-400 hover:text-emerald-600 disabled:opacity-20 disabled:hover:text-slate-400 leading-none"
                      aria-label={`Move ${item.title} down`}
                    >
                      ▼
                    </button>
                  </div>
                  {/* Add data-testid here */}
                  <span
                    data-testid="item-cost"
                    className="text-xs font-bold text-slate-500"
                  >
                    £{(item.cost ?? 0).toFixed(2)}
                  </span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600 transition"
                    aria-label={`Remove ${item.title}`}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}