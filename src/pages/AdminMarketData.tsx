import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { Activity, Edit2, Save, X, RefreshCw } from 'lucide-react';

export function AdminMarketData() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const { data: marketData = [], isLoading } = useQuery({
    queryKey: ['admin-market'],
    queryFn: async () => {
      const res = await apiFetch('/api/market');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiFetch(`/api/market/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to update');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-market'] });
      queryClient.invalidateQueries({ queryKey: ['marketData'] });
      setEditingId(null);
    }
  });

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleSave = () => {
    updateMutation.mutate(editForm);
  };

  return (
    <div className="space-y-6 text-start">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold font-black text-brand-800 uppercase tracking-wide flex items-center gap-2">
            <Activity className="text-brand-800" /> Market Data Control
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage global market indices and commodities.</p>
        </div>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-market'] })}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-bold text-gray-700 uppercase text-start">Symbol</th>
                <th className="px-6 py-3 font-bold text-gray-700 uppercase text-start">Category</th>
                <th className="px-6 py-3 font-bold text-gray-700 uppercase text-start">Price</th>
                <th className="px-6 py-3 font-bold text-gray-700 uppercase text-start">Change</th>
                <th className="px-6 py-3 font-bold text-gray-700 uppercase text-start">Change %</th>
                <th className="px-6 py-3 font-bold text-gray-700 uppercase text-start">Volume</th>
                <th className="px-6 py-3 font-bold text-gray-700 uppercase text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {marketData.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium font-bold text-gray-900 text-start">{item.symbol}</td>
                  <td className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase text-start">{item.category}</td>
                  <td className="px-6 py-4 text-start">
                    {editingId === item.id ? (
                      <input 
                        type="number" 
                        step="0.01"
                        className="w-24 px-2 py-1 border rounded bg-white text-sm"
                        value={editForm.price} 
                        onChange={e => setEditForm({...editForm, price: e.target.value})} 
                      />
                    ) : (
                      <span className="font-bold">{item.price.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-start">
                    {editingId === item.id ? (
                      <input 
                        type="number" 
                        step="0.01"
                        className="w-24 px-2 py-1 border rounded bg-white text-sm"
                        value={editForm.change} 
                        onChange={e => setEditForm({...editForm, change: e.target.value})} 
                      />
                    ) : (
                      <span className={item.change >= 0 ? "text-green-600 font-bold" : "text-brand-600 font-bold"}>
                        {item.change >= 0 ? '+' : ''}{item.change}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-start">
                    {editingId === item.id ? (
                      <input 
                        type="number" 
                        step="0.01"
                        className="w-24 px-2 py-1 border rounded bg-white text-sm"
                        value={editForm.changePercent} 
                        onChange={e => setEditForm({...editForm, changePercent: e.target.value})} 
                      />
                    ) : (
                      <span className={item.changePercent >= 0 ? "text-green-600 font-bold" : "text-brand-600 font-bold"}>
                        {item.changePercent >= 0 ? '+' : ''}{item.changePercent}%
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-start">
                    {editingId === item.id ? (
                      <input 
                        type="text" 
                        className="w-24 px-2 py-1 border rounded bg-white text-sm font-medium"
                        value={editForm.volume} 
                        onChange={e => setEditForm({...editForm, volume: e.target.value})} 
                      />
                    ) : (
                      <span className="font-medium text-gray-600">{item.volume}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-end">
                    {editingId === item.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={handleSave} className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200">
                          <Save size={16} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleEdit(item)} className="p-1.5 text-gray-400 hover:text-brand-800 hover:bg-brand-50 rounded transition-colors">
                        <Edit2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading && (
            <div className="p-8 text-center text-gray-500 font-medium text-sm uppercase animate-pulse">
              Loading market feeds...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
