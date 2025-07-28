'use client';

import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import QRCode from 'react-qr-code';
import Webcam from 'react-webcam';
import { 
  QrCode, 
  Camera, 
  Download, 
  Share,
  RefreshCw,
  CheckCircle,
  X
} from 'lucide-react';

type QRMode = 'generate' | 'scan';

export default function QRScanner() {
  const [mode, setMode] = useState<QRMode>('generate');
  const [amount, setAmount] = useState('25.00');
  const [recipient, setRecipient] = useState('Demo Merchant');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  
  const webcamRef = useRef<Webcam>(null);

  // Generate QR code data
  const qrData = JSON.stringify({
    type: 'payment',
    amount: parseFloat(amount),
    recipient,
    timestamp: Date.now()
  });

  const handleStartScanning = () => {
    setIsScanning(true);
    setScannedData(null);
    setScanError(null);
  };

  const handleStopScanning = () => {
    setIsScanning(false);
  };

  // Simulate QR code scanning (in real app, you'd use a proper QR scanner)
  const simulateQRScan = () => {
    const mockQRData = {
      type: 'payment',
      amount: 15.99,
      recipient: 'Coffee Shop',
      timestamp: Date.now()
    };
    setScannedData(JSON.stringify(mockQRData));
    setIsScanning(false);
  };

  const handleDownloadQR = () => {
    // In a real app, you'd implement QR code download functionality
    alert('QR code download functionality would be implemented here');
  };

  const handleShareQR = () => {
    // In a real app, you'd implement sharing functionality
    if (navigator.share) {
      navigator.share({
        title: 'Payment QR Code',
        text: `Payment request for $${amount}`,
        url: window.location.href
      });
    } else {
      alert('Sharing functionality would be implemented here');
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setMode('generate')}
            className={cn(
              "flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors",
              mode === 'generate'
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            <QrCode className="w-4 h-4" />
            <span>Generate QR</span>
          </button>
          <button
            onClick={() => setMode('scan')}
            className={cn(
              "flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors",
              mode === 'scan'
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            <Camera className="w-4 h-4" />
            <span>Scan QR</span>
          </button>
        </div>
      </div>

      {mode === 'generate' && (
        <div className="space-y-6">
          {/* Payment Details */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount ($)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  step="0.01"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter recipient name"
                />
              </div>
            </div>
          </div>

          {/* Generated QR Code */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment QR Code</h3>
            
            <div className="text-center">
              <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-xl">
                <QRCode
                  value={qrData}
                  size={200}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
              
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  Scan this QR code to pay ${amount} to {recipient}
                </p>
                
                <div className="flex space-x-3 justify-center">
                  <button
                    onClick={handleDownloadQR}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  
                  <button
                    onClick={handleShareQR}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                  >
                    <Share className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === 'scan' && (
        <div className="space-y-6">
          {/* Scanner */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code Scanner</h3>
            
            {!isScanning && !scannedData && (
              <div className="text-center py-8">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-12 h-12 text-blue-600" />
                </div>
                <p className="text-gray-600 mb-6">Point your camera at a QR code to scan</p>
                <button
                  onClick={handleStartScanning}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Start Scanning
                </button>
              </div>
            )}

            {isScanning && (
              <div className="space-y-4">
                <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    className="w-full h-full object-cover"
                    screenshotFormat="image/jpeg"
                  />
                  
                  {/* Scanning overlay */}
                  <div className="absolute inset-0 border-2 border-white/50 rounded-lg">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-blue-500 rounded-lg"></div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={simulateQRScan}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Simulate Scan
                  </button>
                  <button
                    onClick={handleStopScanning}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {scannedData && (
              <div className="space-y-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                <h4 className="text-center text-lg font-semibold text-gray-900">QR Code Scanned!</h4>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Payment Details:</h5>
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                    {JSON.stringify(JSON.parse(scannedData), null, 2)}
                  </pre>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setScannedData(null)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Process Payment
                  </button>
                  <button
                    onClick={() => {
                      setScannedData(null);
                      setIsScanning(false);
                    }}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
