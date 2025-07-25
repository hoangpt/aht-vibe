'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  QrCode, 
  Smartphone,
  Calendar,
  Search,
  Filter
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'payment' | 'received';
  method: 'nfc' | 'qr' | 'tap' | 'card';
  amount: number;
  merchant: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'payment' | 'received'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock transaction data
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'payment',
        method: 'nfc',
        amount: 45.99,
        merchant: 'Starbucks Coffee',
        date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        status: 'completed'
      },
      {
        id: '2',
        type: 'received',
        method: 'qr',
        amount: 125.00,
        merchant: 'John Smith',
        date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        status: 'completed'
      },
      {
        id: '3',
        type: 'payment',
        method: 'tap',
        amount: 89.50,
        merchant: 'Amazon Purchase',
        date: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        status: 'completed'
      },
      {
        id: '4',
        type: 'payment',
        method: 'card',
        amount: 12.99,
        merchant: 'Netflix Subscription',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        status: 'completed'
      },
      {
        id: '5',
        type: 'payment',
        method: 'qr',
        amount: 25.00,
        merchant: 'Local Restaurant',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        status: 'completed'
      },
      {
        id: '6',
        type: 'received',
        method: 'nfc',
        amount: 200.00,
        merchant: 'Salary Payment',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        status: 'completed'
      }
    ];
    
    setTransactions(mockTransactions);
  }, []);

  const getMethodIcon = (method: Transaction['method']) => {
    switch (method) {
      case 'nfc':
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
      case 'qr':
        return <QrCode className="w-4 h-4" />;
      case 'tap':
        return <Smartphone className="w-4 h-4" />;
      case 'card':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter;
    const matchesSearch = transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalBalance = transactions.reduce((acc, transaction) => {
    return transaction.type === 'received' 
      ? acc + transaction.amount 
      : acc - transaction.amount;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Summary</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 mb-1">Total Received</p>
            <p className="text-xl font-bold text-green-700">
              ${transactions
                .filter(t => t.type === 'received')
                .reduce((acc, t) => acc + t.amount, 0)
                .toFixed(2)}
            </p>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-red-600 mb-1">Total Spent</p>
            <p className="text-xl font-bold text-red-700">
              ${transactions
                .filter(t => t.type === 'payment')
                .reduce((acc, t) => acc + t.amount, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-colors",
                filter === 'all'
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilter('payment')}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-colors",
                filter === 'payment'
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Payments
            </button>
            <button
              onClick={() => setFilter('received')}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-colors",
                filter === 'received'
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Received
            </button>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* Icon */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  transaction.type === 'payment'
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                )}>
                  {transaction.type === 'payment' ? (
                    <ArrowUpRight className="w-5 h-5" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-gray-900 truncate">
                      {transaction.merchant}
                    </p>
                    <div className="text-gray-400">
                      {getMethodIcon(transaction.method)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatRelativeTime(transaction.date)}
                  </p>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <p className={cn(
                    "font-semibold",
                    transaction.type === 'payment'
                      ? "text-red-600"
                      : "text-green-600"
                  )}>
                    {transaction.type === 'payment' ? '-' : '+'}${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
