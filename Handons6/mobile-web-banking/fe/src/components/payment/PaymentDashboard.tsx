'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  CreditCard, 
  QrCode, 
  Smartphone, 
  LogOut, 
  DollarSign,
  History,
  User
} from 'lucide-react';
import PaymentSimulator from './PaymentSimulator';
import QRScanner from './QRScanner';
import TransactionHistory from './TransactionHistory';

type ActiveTab = 'payment' | 'qr' | 'history';

export default function PaymentDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('payment');
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Digital Banking</h1>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-6">
          <p className="text-blue-100 mb-2">Available Balance</p>
          <p className="text-3xl font-bold">$2,450.00</p>
          <p className="text-blue-100 text-sm mt-2">Demo Account</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('payment')}
              className={cn(
                "flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors",
                activeTab === 'payment'
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay</span>
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={cn(
                "flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors",
                activeTab === 'qr'
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <QrCode className="w-4 h-4" />
              <span>QR</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={cn(
                "flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors",
                activeTab === 'history'
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'payment' && <PaymentSimulator />}
          {activeTab === 'qr' && <QRScanner />}
          {activeTab === 'history' && <TransactionHistory />}
        </div>
      </div>
    </div>
  );
}
