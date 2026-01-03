'use client';

import { useState, FormEvent, ReactNode } from 'react';
import { content } from '@/data/content';

interface PinGateProps {
  children: ReactNode;
}

export default function PinGate({ children }: PinGateProps) {
  const { security } = content;
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!security.enabled);
  const [error, setError] = useState('');

  // セキュリティが無効な場合は直接子コンポーネントを表示
  if (!security.enabled) {
    return <>{children}</>;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (pin === security.pinCode) {
      setIsAuthenticated(true);
      setPin('');
    } else {
      setError('PINコードが正しくありません');
      setPin('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 tracking-tight">
              Welcome
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {security.message}
            </p>
          </div>

          {/* PIN Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                PIN Code
              </label>
              <input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                className="w-full px-4 py-3 text-center text-2xl tracking-widest font-mono rounded-lg border-2 border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                autoFocus
                maxLength={10}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

