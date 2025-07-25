'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  CreditCard, 
  Smartphone, 
  Wifi, 
  DollarSign,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

type PaymentMethod = 'nfc' | 'tap' | 'card';

export default function PaymentSimulator() {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('nfc');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const paymentMethods = [
    {
      id: 'nfc' as PaymentMethod,
      name: 'NFC Payment',
      icon: Wifi,
      description: 'Tap your card or phone'
    },
    {
      id: 'tap' as PaymentMethod,
      name: 'Tap to Pay',
      icon: Smartphone,
      description: 'Mobile contactless payment'
    },
    {
      id: 'card' as PaymentMethod,
      name: 'Card Payment',
      icon: CreditCard,
      description: 'Insert or swipe card'
    }
  ];

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsProcessing(true);
    setIsSuccess(false);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsSuccess(true);

    // Reset after success
    setTimeout(() => {
      setIsSuccess(false);
      setAmount('');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-4">Your payment of ${amount} has been processed</p>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Transaction ID</p>
          <p className="font-mono text-sm">{Date.now().toString(36).toUpperCase()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Amount Input */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Amount</h3>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full pl-10 pr-4 py-4 text-2xl font-semibold border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            step="0.01"
            min="0"
          />
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={cn(
                  "w-full flex items-center space-x-4 p-4 rounded-xl border-2 transition-colors",
                  selectedMethod === method.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  selectedMethod === method.id
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600"
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulate Payment */}
      {isProcessing ? (
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Smartphone className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment...</h3>
          <p className="text-gray-600">Please wait while we process your ${amount} payment</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulation Area</h3>
          
          {selectedMethod === 'nfc' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-gray-600 mb-6">Tap your NFC-enabled card or device here</p>
              <div className="relative">
                <div className="w-32 h-20 bg-gray-100 rounded-lg mx-auto border-2 border-dashed border-gray-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'tap' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-12 h-12 text-green-600" />
              </div>
              <p className="text-gray-600 mb-6">Tap your phone to pay</p>
              <div className="relative">
                <div className="w-32 h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg mx-auto border-2 border-dashed border-green-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'card' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-12 h-12 text-purple-600" />
              </div>
              <p className="text-gray-600 mb-6">Insert or swipe your card</p>
              <div className="relative">
                <div className="w-40 h-6 bg-gray-800 rounded-sm mx-auto border"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-4 bg-yellow-400 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={!amount || parseFloat(amount) <= 0}
            className={cn(
              "w-full mt-6 py-4 px-6 rounded-xl font-semibold text-white transition-colors",
              !amount || parseFloat(amount) <= 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            )}
          >
            Process Payment ${amount || '0.00'}
          </button>
        </div>
      )}
    </div>
  );
}
