'use client';

import { useState } from 'react';
import { useMutation } from '@/hooks/useMutation';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

interface StockRequest extends Record<string, unknown> {
  symbol: string;
}

export default function StockTracker() {
  const [symbol, setSymbol] = useState('');
  
  const { data, error, loading, mutate } = useMutation<StockData, StockRequest>(
    'POST',
    '/api/stocks/lookup',
    {
      onSuccess: (data) => {
        console.log('Stock data fetched:', data);
      },
      onError: (error) => {
        console.error('Failed to fetch stock data:', error);
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { symbol };
    console.log('Submitting payload:', payload);
    mutate(payload);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Stock Tracker</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol"
          className="border p-2 mr-2 rounded"
        />
        <button 
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Look up'}
        </button>
      </form>

      {error && (
        <div className="text-red-500 mb-4">
          Error: {error.message}
        </div>
      )}

      {data && (
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">{data.symbol}</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-gray-600">Price</p>
              <p className="text-lg">${data.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600">Change</p>
              <p className={`text-lg ${data.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {data.change > 0 ? '+' : ''}{data.change.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-600">Volume</p>
              <p className="text-lg">{data.volume.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}